import { SerializedMessage } from 'src/contracts'
import { MutationTree } from 'vuex'
import { ChannelsStateInterface } from './state'

const mutation: MutationTree<ChannelsStateInterface> = {
  LOADING_START (state) {
    state.loading = true
    state.error = null
  },

  LOADING_SUCCESS (state, { channel, messages }: { channel: string, messages: SerializedMessage[] }) {
    state.loading = false
    state.messages[channel] = messages
  },

  LOADING_ERROR (state, error) {
    state.loading = false
    state.error = error
  },

  CLEAR_CHANNEL (state, channel) {
    // state.active = null
    delete state.messages[channel]
  },

  SET_ACTIVE (state, channel: string) {
    state.active = channel
  },

  NEW_MESSAGE (state, { channel, message }: { channel: string, message: SerializedMessage }) {
    state.messages[channel].push(message)
  },

  SET_ALL_USERS_IN_CHANNEL (state, allUsersInChannelParam: []) {
    state.allUsersInChannel = allUsersInChannelParam
  },

  SET_USERS_ALERT_ACTIVE (state, usersAlert: boolean) {
    state.usersAlert = usersAlert
  },

  ADD_NOTIFICATION_MESSAGE (state, { message }: {message: SerializedMessage }) {
    state.notificationMessage = { userNickname: message.author.nickname, message: message.content.substring(0,20) }
  },

  SET_PAGINATION (state, pagination: number) {
    state.pagination = pagination
  }
}

export default mutation
