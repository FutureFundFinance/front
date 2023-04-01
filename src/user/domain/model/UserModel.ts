export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePicture: string
  dateOfBirth: string
  wallet_address: string
  actions: Action[]
  preferences: Preference[]
}
export interface Preference {
  id: string
  name: string
  categories: string
  weight: number
  timestamp: string
}
export interface Action {
  id:string
  name: string
  type: string
  amount: number
  timestamp: string
}