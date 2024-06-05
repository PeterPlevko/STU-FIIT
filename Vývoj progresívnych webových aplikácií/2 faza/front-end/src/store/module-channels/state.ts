import { SerializedMessage } from 'src/contracts'

export interface notificationMessageInterface{
  userNickname: string,
  message: string,
}
export interface ChannelsStateInterface {
  loading: boolean,
  error: Error | null,
  messages: { [channel: string]: SerializedMessage[] }
  active: string | null
  usersAlert: boolean
  allUsersInChannel: []
  notificationMessage: notificationMessageInterface
  pagination: number
}

function state (): ChannelsStateInterface {
  return {
    loading: false,
    error: null,
    messages: {},
    active: null,
    usersAlert: false,
    allUsersInChannel: [],
    notificationMessage: { userNickname: '', message: '' },
    pagination: 10,
  }
}

export default state
