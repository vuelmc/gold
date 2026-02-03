export interface PositionItem {
  id: string
  fundCode: string
  fundName: string
  holdingAmount: number
  netValueEst: number
  changePercent: number
  todayPnl: number
  holdingPnl: number
  updateTime: string
  valueSource: 'official' | 'realtime'
}

export interface SummaryData {
  totalValue: number
  todayEstPnl: number
  historicalPnl: number
}

export interface FundData {
  summary: SummaryData
  positions: PositionItem[]
}
