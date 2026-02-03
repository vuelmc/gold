import type { FundData } from '../types/fund'

const API_BASE = 'https://zhaoyeqing.cn'

function mockData(): FundData {
  return {
    summary: {
      totalValue: 9999.99,
      todayEstPnl: -72.17,
      historicalPnl: 200.99,
    },
    positions: [
      {
        id: '1',
        fundCode: '161226',
        fundName: '国投瑞银白银期货(LOF)',
        holdingAmount: 9999.99,
        netValueEst: 3.2838,
        changePercent: -0.72,
        todayPnl: -72.17,
        holdingPnl: 200.99,
        updateTime: '26-01-30',
        valueSource: 'official',
      },
    ],
  }
}

export async function fetchFundData(): Promise<FundData> {
  try {
    const res = await fetch(API_BASE, { signal: AbortSignal.timeout(8000) })
    const text = await res.text()
    // 若接口返回 JSON 则解析
    const trimmed = text.trim()
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      const json = JSON.parse(text) as FundData | unknown
      if (json && typeof json === 'object' && 'summary' in json && 'positions' in json) {
        return json as FundData
      }
    }
  } catch {
    // 网络或非 JSON 时使用本地数据
  }
  return mockData()
}
