export interface AuthData {
  email: string
  password: string
}

export interface Task {
  name: string
  text: string
  date?: Date
  _id?: string
}

export interface Filter {
  date?: Date
  previous?: string
  limit?: number
}

export interface Message {
  message: string
}

export interface TaskDialog {
  name: string
  text: string
  date: Date
  _id: string
}

export interface Cost {
  name: string
  price: number
  _id?: string
}

export interface Income {
  name: string
  amount: number
  _id?: string
}

export interface CostsChart {
  label: string
  costs: number
}

export interface IncomeChart {
  label: string
  income: number
}

export interface CostsData {
  totalAmount: number
  total: number
  average: number
}

export interface IncomeData {
  totalAmount: number
  total: number
  average: number
}

export interface AnalyticsData {
  costsChart: CostsChart[]
  incomeChart: IncomeChart[]
  costs: CostsData
  income: IncomeData
}
