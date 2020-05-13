export interface AuthData{
  email: string
  password: string
}
export interface Task{
  name: string
  text: string
  date?: Date
  _id?: number
}
export interface Filter{
  date?: Date
  previous?: string
  limit?: number
}
export interface Message {
  message: string
}
export interface TaskDialog{
  name: string
  text: string
  date: Date
}
