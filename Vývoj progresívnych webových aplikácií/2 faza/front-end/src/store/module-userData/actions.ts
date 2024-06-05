import { channelService, userService } from 'src/services';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  async setDnd ({ commit }, { isDnd, userId }: { isDnd: boolean, userId: number }) {
    userService.setDnd(isDnd, userId)
    commit('UPDATE_IS_DND', isDnd)
  },

  async setNotificationAddressed ({ commit }, OnlyNotificationAddressed: boolean) {
    commit('UPDATE_ONLY_NOTIFICATION_ADDRESSED', OnlyNotificationAddressed)
  },

  async setOnline ({ commit }, { isOnline, userId }: { isOnline: boolean, userId: number }) {
    userService.setOnline(isOnline, userId)
    commit('UPDATE_IS_ONLINE', isOnline)
  },

  async setUsername ({ commit },  username:string ) {
    commit('UPDATE_NICKNAME', username)
  },

  async addChannel( {commit, dispatch}, { channelName, isPrivate, userId}: { channelName: string, isPrivate: boolean, userId: number } ){
    const createdChannel = await channelService.createOrJoinChannel(channelName, isPrivate, userId )
    if(createdChannel.data.channel === ''){
      // user is banned
    }
    else{
      await channelService.in('general')?.notifyAboutCreation(channelName)


      const exists = await dispatch('checkIfExists', { channelName })
      if(exists){
        // channel exists
      }
      else{
        dispatch('channels/join', createdChannel.data.channel.name, {root: true});
        commit('userData/ADD_CHANNEL', {channel: createdChannel.data.channel , isTopped:false} , {root: true} )
        commit('userData/changeChannelState', {channelName: createdChannel.data.channel.name, channelState: 'accepted'} , {root: true} )
      }
    }
  },

  async checkIfExists (state, channelName) {
    if(state.state.channels.find(channel => channel.name === channelName.channelName)){
      return true
    }
    else{
      return false
    }
  },


  async confirmInvite({rootState, commit, dispatch}, {channelName, userName}: { channelName: string, userName: string } ){
    if(userName === rootState.auth.user!.nickname){
      await channelService.confirmInvite(channelName, userName)
      dispatch('channels/join', channelName, {root: true});
      commit('userData/changeChannelState', {channelName: channelName, channelState: 'accepted'} , {root: true} )
    }
  },


  async declineInvite({rootState, commit, dispatch}, {channelName, userName}: { channelName: string, userName: string } ){
    if(userName === rootState.auth.user!.nickname){
      await channelService.declineInvite(channelName, userName)

      commit('userData/REMOVE_CHANNEL', channelName , {root: true} )

    }


  }
};

export default actions;
