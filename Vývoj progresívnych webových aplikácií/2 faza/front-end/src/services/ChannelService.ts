import axios from 'axios'
import { RawMessage, SerializedMessage } from 'src/contracts'
import { Channel } from 'src/store/module-userData/state'
import { BootParams, SocketManager } from './SocketManager'

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChannelSocketManager extends SocketManager {
  public subscribe ({ store }: BootParams): void {
    const channel = this.namespace.split('/').pop() as string

    this.socket.on('message', (message: SerializedMessage) => {
      store.commit('channels/ADD_NOTIFICATION_MESSAGE', { message: message })
      store.commit('channels/NEW_MESSAGE', { channel, message })
    })

    this.socket.on('removeUserFromServerResponse', (wasUserCreator: boolean, channelName:string) => {
      if(wasUserCreator){
        store.commit('userData/REMOVE_CHANNEL', channelName , { root: true })
      }
    })

    this.socket.on('ownerQuitResponse', (wasUserCreator: boolean, channelName:string) => {
      if(wasUserCreator){
        store.commit('userData/REMOVE_CHANNEL', channelName , { root: true })
        store.dispatch('channels/leave', channelName, {root: true} )
        if(channelName === store.state.channels.active){
          store.commit('channels/SET_ACTIVE', null , {root: true} )
        }
      }
    })

    this.socket.on('inviteUserToChannelResponse', (nickname: string, channelName: Channel, isPrivate:string, isTopped:boolean) => {
      if(nickname === null){
        // snazi sa invitnut nie creator
        // roman palenik channel 1 creator je kuntox
        // roman palenik invitne morfexa
      }
      else{
        if(nickname === store.state.userData.nickname){
          const exists = store.state.userData.channels.find(c => c.name === channelName.name)

          if (exists) {
            // channel exists
          }
          else{
            store.commit('userData/ADD_CHANNEL', {channel:channelName, isTopped: isTopped, channelState: 'invited'}, { root: true })
            store.commit('userData/SORT_CHANNELS')
          }
        }
      }
    })

    this.socket.on('notifyAboutCreationResponse', (channelName:string) => {
      store.dispatch('channels/join', channelName, {root: true});
    })

    this.socket.on('kickUserFromChannelResponse', (channelName:string, nickname:string) => {
      if(nickname === store.state.userData.nickname){
        store.commit('userData/REMOVE_CHANNEL', channelName , { root: true })
        store.commit('channels/SET_ACTIVE', null, {root: true} )
      }
    })

    this.socket.on('revokeUserResponse', (channelName:string, nickname:string) => {
      if(nickname === store.state.userData.nickname){
        store.commit('userData/REMOVE_CHANNEL', channelName , { root: true })
        store.commit('channels/SET_ACTIVE', null, {root: true} )
      }
    })

    this.socket.on('sendRTMessageResponse', (channelName: string, senderNickname: string, message: string) => {
      if (message === ''){
        store.commit('userData/REMOVE_IS_TYPING', {channelName, senderNickname}, { root: true })
      }
      else{
        store.commit('userData/UPDATE_IS_TYPING', {channelName, senderNickname, message}, { root: true })
      }
    })

  }

  public addMessage (message: RawMessage): Promise<SerializedMessage> {
    return this.emitAsync('addMessage', message) // send event to backend socket.io routes and handles it
  }

  public loadMessages (pagination:number): Promise<SerializedMessage[]> {
    return this.emitAsync('loadMessages', pagination)
  }

  public removeUserFromServer (channel: string, userId: number): Promise<[]> {
    return this.emitAsync('removeUserFromServerRequest', channel, userId)
  }

  public inviteUserToChannel (nickname: string, channelName:string, userId:number): Promise<[]> {
    return this.emitAsync('inviteUserToChannelRequest', nickname, channelName, userId)
  }

  public notifyAboutCreation (channelName:string): Promise<[]> {
    return this.emitAsync('notifyAboutCreationRequest', channelName)
  }

  public kickUserFromChannel( channel:string, nickname:string, userId:number ): Promise<[]> {
    return this.emitAsync('kickUserFromChannelRequest', channel, nickname, userId)
  }

  public ownerQuit (channel: string, userId: number): Promise<[]> {
    return this.emitAsync('ownerQuitRequest', channel, userId)
  }

  public revokeUser (channel: string, nickname:string, userId: number): Promise<[]> {
    return this.emitAsync('revokeUserRequest', channel,nickname, userId)
  }

  public sendRTMessage (channelName: string, senderNickname: string, message: string): Promise<[]> {
    return this.emitAsync('sendRTMessageRequest', channelName, senderNickname, message)
  }

}

class ChannelService {
  private channels: Map<string, ChannelSocketManager> = new Map()


  public join (name: string): ChannelSocketManager {
    if (this.channels.has(name)) {
      throw new Error(`User is already joined in channel "${name}"`)
    }

    // connect to given channel namespace
    const channel = new ChannelSocketManager(`/channels/${name}`)
    this.channels.set(name, channel)
    return channel
  }

  public leave (name: string): boolean {
    const channel = this.channels.get(name)

    if (!channel) {
      return false
    }

    // disconnect namespace and remove references to socket
    channel.destroy()
    return this.channels.delete(name)
  }

  public in (name: string): ChannelSocketManager | undefined {
    return this.channels.get(name)
  }

  public getAllUsersFromCurrentChannel(channel: string){
    return axios.get(`http://127.0.0.1:3333/getAllUsersFromCurrentChannel/${channel}`, {
    })
  }

  public removeUserFromChannel(channel: string, userId: number){
    return axios.delete(`http://127.0.0.1:3333/removeUserFromChannel/${channel}`, {
      data: { userId: userId }
    })
  }

  public createOrJoinChannel(channelName: string, isPrivate: boolean, userId: number){
    return axios.post('http://127.0.0.1:3333/createOrJoinChannel', {
       userId: userId, channelName: channelName, isPrivate: isPrivate
    })
  }

  public confirmInvite(channelName: string, userName: string){
    return axios.post('http://127.0.0.1:3333/acceptInvite', {
      channelName: channelName, userName: userName
   })
  }


  public declineInvite(channelName: string, userName: string){
    return axios.post('http://127.0.0.1:3333/declineInvite', {
      channelName: channelName, userName: userName
   })
  }


}

export default new ChannelService()
