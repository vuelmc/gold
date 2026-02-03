import type { GoldQuotationItem, SpotQuotationRow } from '../types/gold'

// 开发环境走 Vite 代理 /api/sge -> https://ak.zhaoyeqing.cn，避免跨域
const GOLD_API =
  import.meta.env.DEV
    ? '/api/sge/api/public/spot_quotations_sge?symbol=Au99.99'
    : 'https://ak.zhaoyeqing.cn/api/public/spot_quotations_sge?symbol=Au99.99'

function normalizeToChartData(rows: SpotQuotationRow[]): GoldQuotationItem[] {
  return rows
    .map((row) => {
      const time =
        row['时间'] ??
        row.time ??
        row.date ??
        (row.timestamp ? new Date(row.timestamp).toISOString().slice(0, 19) : '')
      const price = Number(
        row['现价'] ?? row.price ?? row.close ?? row.last ?? 0
      )
      if (!time || Number.isNaN(price)) return null
      return { time: String(time).slice(0, 19), price }
    })
    .filter((x): x is GoldQuotationItem => x !== null)
    .sort((a, b) => a.time.localeCompare(b.time))
    // 过滤9点之前的数据
    .filter((x) => x.time >= '09:00:00')
}

function mockGoldData(): GoldQuotationItem[] {
  const base = 580
  const now = Date.now()
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(now - (23 - i) * 3600000).toISOString().slice(0, 19).replace('T', ' '),
    price: base + Math.sin(i * 0.3) * 5 + Math.random() * 2,
  }))
}

export async function fetchGoldQuotations(): Promise<GoldQuotationItem[]> {
  try {
    const res = await fetch(GOLD_API, { signal: AbortSignal.timeout(10000) })
    const list = await res.json() as SpotQuotationRow[]
    return normalizeToChartData(list)
  } catch (error) {
    console.error(error)
    return mockGoldData()
  }
}
