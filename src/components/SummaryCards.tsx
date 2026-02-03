import type { SummaryData } from '../types/fund'

function formatMoney(n: number): string {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatSigned(n: number): string {
  const s = n >= 0 ? `+${formatMoney(n)}` : formatMoney(n)
  return s
}

export function SummaryCards({ data }: { data: SummaryData }) {
  const { totalValue, todayEstPnl, historicalPnl } = data

  return (
    <section className="summary-cards" aria-label="关键指标">
      <div className="card card-total">
        <span className="card-eye" aria-hidden>👁</span>
        <div className="card-icon card-icon-purple" aria-hidden />
        <h2 className="card-title">持仓总市值</h2>
        <p className="card-value">¥ {formatMoney(totalValue)}</p>
        <span className="card-tag tag-cny">CNY 实时估算</span>
      </div>
      <div className="card card-today">
        <span className="card-eye" aria-hidden>👁</span>
        <div className="card-icon card-icon-chart" aria-hidden />
        <h2 className="card-title">今日预估收益</h2>
        <p className={`card-value ${todayEstPnl >= 0 ? 'positive' : 'negative'}`}>
          {formatSigned(todayEstPnl)}
        </p>
        <span className="card-desc">基于实时涨跌幅计算</span>
      </div>
      <div className="card card-history">
        <span className="card-eye" aria-hidden>👁</span>
        <div className="card-icon card-icon-piggy" aria-hidden />
        <h2 className="card-title">历史累计收益</h2>
        <p className={`card-value ${historicalPnl >= 0 ? 'positive' : 'negative'}`}>
          {formatSigned(historicalPnl)}
        </p>
        <span className="card-desc">包含历史持仓盈亏</span>
      </div>
    </section>
  )
}
