/** 单条行情：时间 + 价格，供折线图使用 */
export interface GoldQuotationItem {
  time: string
  price: number
}

/** 接口返回的原始行情项（ak.zhaoyeqing.cn 返回：品种、时间、现价、更新时间） */
export interface SpotQuotationRow {
  time?: string
  date?: string
  timestamp?: number
  price?: number
  close?: number
  last?: number
  /** 接口字段：时间，如 "09:30:00" */
  时间?: string
  /** 接口字段：现价 */
  现价?: number
  [key: string]: unknown
}
