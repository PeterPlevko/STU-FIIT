import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ChannelsStateInterface } from './state'
import { channelService } from 'src/services'
import { RawMessage } from 'src/contracts'

const actions: ActionTree<ChannelsStateInterface, StateInterface> = {
  async join ({ commit, rootState }, channel: string) {
    try {
      commit('LOADING_START')
      const messages = await channelService.join(channel).loadMessages(rootState.channels.pagination)
      commit('LOADING_SUCCESS', { channel, messages })
    } catch (err) {
      commit('LOADING_ERROR', err)

    }
  },

  async loadPaginatedMessage ({ commit, rootState }) {
    try {
      const channelName = rootState.channels.active!
      commit('LOADING_START')
      const messages = await  channelService.in(channelName)?.loadMessages(rootState.channels.pagination)
      commit('LOADING_SUCCESS', { channel: channelName , messages:messages })
    } catch (err) {
      commit('LOADING_ERROR', err)
      throw err
    }
  },

  async leave ({ getters, commit }, channel: string | null) {
    const leaving: string[] = channel !== null ? [channel] : getters.joinedChannels
    leaving.forEach((c) => {
      channelService.leave(c)
      commit('CLEAR_CHANNEL', c)
    })
  },

  async addMessage ({rootState, commit, dispatch }, { channel, message }: { channel: string, message: RawMessage }) {
    if(channel === null){
      return
    }

    if(message.includes('/list')){
      const allUsers = await channelService.getAllUsersFromCurrentChannel(channel)
      commit('SET_ALL_USERS_IN_CHANNEL', allUsers.data )
      commit('SET_USERS_ALERT_ACTIVE', true)
    }

    else if(message.includes('/cancel')){
      dispatch('removeChannel', {channel:channel, userId:rootState.auth.user!.id});
    }

    else if(message.includes('/join')){
      let channelName = message.split('/join')[1]
      channelName = channelName.trim()
      let isPrivate = false
      if(message.includes('[private]')){
        isPrivate = true
        channelName = channelName.replace(' [private]', '')
      }
      const createdChannel = await channelService.createOrJoinChannel(channelName, isPrivate, rootState.auth.user!.id )
      if(createdChannel.data === ''){
        // channel is private you cant join it
      }
      else{
        const exists = await dispatch('checkIfExists', { channelName })

        if(exists){

        }
        else{
          commit('userData/ADD_CHANNEL', {channel:createdChannel.data.channel, isTopped:false, channelState:createdChannel.data.state}, {root: true} )
          dispatch('channels/join', createdChannel.data.channel.name, {root: true});

        }
      }
    }

    else if(message.includes('invite')){
      let nickname = message.split('/invite')[1]
      nickname = nickname.substring(1);
      dispatch('inviteUserToChannel', { nickname:nickname, channel:channel, userId:rootState.auth.user!.id });
    }

    else if(message.includes('/kick')){
      if(channel === 'general'){
        // do nothing
      }
      else{
        let nickname = message.split('/kick')[1]
        nickname = nickname.substring(1);
        await channelService.in(channel)?.kickUserFromChannel( channel, nickname, rootState.auth.user!.id )
      }

      // await channelService.kickUserFromServer(channelName, isPrivate, rootState.auth.user!.id )
      // commit('userData/REMOVE_CHANNEL', channel, {root: true} )
    }
    else if(message.includes('/quit')){
      if(channel === 'general'){
        // cant leave general
      }
      else{
        const userCreator = await channelService.in(channel)?.ownerQuit(channel, rootState.auth.user!.id)
        if(userCreator){
          commit('userData/REMOVE_CHANNEL', channel, {root: true} )
          dispatch('channels/leave', channel, {root: true} )
          commit('channels/SET_ACTIVE', null, {root: true} )
        }
      }
    }

    else if(message.includes('/revoke')){
      let nickname = message.split('/revoke')[1]
      nickname = nickname.substring(1);
      await channelService.in(channel)?.revokeUser( channel, nickname, rootState.auth.user!.id )
    }
    else{
      const newMessage = await channelService.in(channel)?.addMessage(message)
      commit('NEW_MESSAGE', { channel, message: newMessage })
    }
  },


  async allChannels({dispatch}, {channels}){
    for(let i = 0; i < channels.length; i++){
      dispatch('channels/join', channels[i].name, {root: true});
    }
  },

  async removeChannel({ commit, dispatch }, {channel, userId}){
    if(channel === 'general'){
      // if channel is general do nothing
    }
    else{
      await channelService.in(channel)?.ownerQuit(channel, userId)
      commit('channels/SET_ACTIVE', null, {root: true} )
      commit('userData/REMOVE_CHANNEL', channel, {root: true} )
      dispatch('channels/leave', channel, {root: true} )
    }
  },

  async inviteUserToChannel({}, {nickname, channel, userId}){
    await channelService.in('general')?.inviteUserToChannel(nickname, channel, userId)
  },

  async checkIfExists (context, channelName) {
    if(context.rootState.userData.channels.find(channel => channel.name === channelName.channelName)){
      return true
    }
    else{
      return false
    }
  },

  async realTimeMessage({rootState}, message){
    await channelService.in(rootState.channels.active!)?.sendRTMessage(rootState.channels.active!, rootState.auth.user!.nickname, message)
  }


}

export default actions
