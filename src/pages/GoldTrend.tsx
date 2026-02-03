import { useState, useEffect, useCallback } from 'react'
import { Line } from '@ant-design/charts'
import { fetchGoldQuotations } from '../api/goldApi'
import type { GoldQuotationItem } from '../types/gold'

export function GoldTrend() {
  const [data, setData] = useState<GoldQuotationItem[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const list = await fetchGoldQuotations()
      setData(list)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // 每10秒刷新一次
  // useEffect(() => {
  //   const interval = setInterval(load, 10000)
  //   return () => clearInterval(interval)
  // }, [load])

  const theme =
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'

  const config = {
    data,
    xField: 'time',
    yField: 'price',
    height: 400,
    loading,
    smooth: true,
    axis: {
      x: { labelAutoRotate: true },
      y: { title: '价格' },
    },
    theme,
  }

  return (
    <div className="page-gold">
      <header className="page-header">
        <h1 className="page-title">黄金走势 (Au99.99)</h1>
        <button type="button" className="btn btn-secondary" onClick={load} disabled={loading}>
          {loading ? '加载中…' : '刷新'}
        </button>
      </header>
      <div className="chart-wrap">
        <Line {...config} />
      </div>
    </div>
  )
}
