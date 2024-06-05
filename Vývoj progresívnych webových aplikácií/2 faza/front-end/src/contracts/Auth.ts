import { Channel } from 'src/store/module-userData/state'

export interface ApiToken {
  type: 'bearer'
  token: string
  expires_at?: string
  expires_in?: number
}

export interface RegisterData {
  nickname: string
  firstName: string
  lastName: string
  email: string
  state: string
  password: string
  passwordConfirmation: string
}

export interface LoginCredentials {
  email: string
  password: string
  remember: boolean
}

export interface User {
  id: number
  nickname: string
  firstName: string
  lastName: string
  email: string
  channels: Channel[]
  createdAt: string
  updatedAt: string
  isOnline: boolean
  isDnd: boolean

}
