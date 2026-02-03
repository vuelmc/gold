import type { PositionItem } from '../types/fund'

function formatMoney(n: number): string {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatPercent(n: number): string {
  const s = n >= 0 ? `+${n.toFixed(2)}%` : `${n.toFixed(2)}%`
  return s
}

export function PositionTable({
  positions,
  onCalibrate,
}: {
  positions: PositionItem[]
  onCalibrate?: (id: string) => void
}) {
  return (
    <section className="position-section" aria-label="持仓明细">
      <h2 className="section-title">
        <span className="section-icon" aria-hidden>☰</span>
        持仓明细
      </h2>
      <div className="table-wrap">
        <table className="position-table">
          <thead>
            <tr>
              <th>基金名称</th>
              <th>持有金额</th>
              <th>净值(估)</th>
              <th>涨幅</th>
              <th>今日盈亏</th>
              <th>持有盈亏</th>
              <th>更新时间</th>
              <th>校准</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-cell">
                  暂无持仓数据
                </td>
              </tr>
            ) : (
              positions.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="fund-name-cell">
                      <span className="fund-name">
                        {row.fundCode} {row.fundName}
                      </span>
                      <span
                        className={`value-tag ${row.valueSource === 'official' ? 'tag-official' : 'tag-realtime'}`}
                      >
                        {row.valueSource === 'official' ? '官方净值' : '实时估算'}
                      </span>
                    </div>
                  </td>
                  <td>{formatMoney(row.holdingAmount)}</td>
                  <td>{row.netValueEst.toFixed(4)}</td>
                  <td className={row.changePercent >= 0 ? 'positive' : 'negative'}>
                    {formatPercent(row.changePercent)}
                  </td>
                  <td className={row.todayPnl >= 0 ? 'positive' : 'negative'}>
                    {formatMoney(row.todayPnl)}
                  </td>
                  <td className={row.holdingPnl >= 0 ? 'positive' : 'negative'}>
                    {formatMoney(row.holdingPnl)}
                  </td>
                  <td>{row.updateTime}</td>
                  <td>
                    <button
                      type="button"
                      className="calibrate-btn"
                      onClick={() => onCalibrate?.(row.id)}
                      title="校准"
                      aria-label={`校准 ${row.fundName}`}
                    >
                      ✎
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
