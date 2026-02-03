import { useState, useEffect, useCallback } from 'react'
import { Header } from '../components/Header'
import { SummaryCards } from '../components/SummaryCards'
import { PositionTable } from '../components/PositionTable'
import { fetchFundData } from '../api/fundApi'
import type { FundData } from '../types/fund'

export function MyDashboard() {
  const [data, setData] = useState<FundData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchFundData()
      setData(res)
      setRefreshCount((c) => c + 1)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleManagePositions = () => {
    console.log('管理持仓')
  }

  const handleCalibrate = (id: string) => {
    console.log('校准', id)
  }

  if (!data) {
    return (
      <div className="main-content" style={{ textAlign: 'center', paddingTop: 48 }}>
        {loading ? '加载中…' : '暂无数据'}
      </div>
    )
  }

  return (
    <>
      <Header
        onManagePositions={handleManagePositions}
        onRefresh={load}
        refreshCount={refreshCount}
        loading={loading}
      />
      <main className="main-content">
        <SummaryCards data={data.summary} />
        <PositionTable positions={data.positions} onCalibrate={handleCalibrate} />
      </main>
    </>
  )
}
