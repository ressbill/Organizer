export interface AuthData{
  email: string
  password: string
}
export interface Task{
  name: string
  text: string
  date?: Date
  id?: number
}
export interface Filter{
  date?: Date
  previous?: string
  limit?: number
}
