import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'

// inject repository from container to controller constructor
// we do so because we can extract database specific storage to another class
// and also to prevent big controller methods doing everything
// controler method just gets data (validates it) and calls repository
// also we can then test standalone repository without controller
// implementation is bind into container inside providers/AppProvider.ts
export default class UsersController {
  constructor() {}

  public async sendToServer({ socket }: WsContextContract, channelName: string, userId: number) {let wasUserCreator = false
    const user = await User.findByOrFail('id', userId)
    const channel = await Channel.findByOrFail('name', channelName)

    await user.related('channels').detach([channel.id])

    if(channel.creator_id === userId){
      await channel.related('users').detach([userId])
      await channel.delete()
      wasUserCreator = true
    }

    // broadcast message to other users in channel
    socket.broadcast.emit('removeUserFromServerResponse', wasUserCreator, channelName)
  }

  public async ownerQuitRequest({ socket }: WsContextContract, channelName: string, userId: number) {
    let wasUserCreator = false
    const user = await User.findByOrFail('id', userId)
    const channel = await Channel.findByOrFail('name', channelName)

    await user.related('channels').detach([channel.id])

    if(channel.creator_id === userId){
      wasUserCreator = true
      await channel.delete()
    }

    // broadcast message to other users in channel
    socket.broadcast.emit('ownerQuitResponse', wasUserCreator, channelName)
    return wasUserCreator
  }



  public async inviteUserToChannel({ socket }: WsContextContract, nickname: string, channelName: string, userId: number) {
    const user = await User.findBy('nickname', nickname)
    if(user === null){
      socket.broadcast.emit('inviteUserToChannelResponse', null, null, null, null)
      return null
    }

    const channel = await Channel.findByOrFail('name', channelName)
    if(channel.is_private){
      if(channel.creator_id === userId){
        let daco = await channel
        .related('users')
        .query()
        .where('nickname', nickname)
        .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
        .first()

        if(daco){
          await user!.related('channels').sync( {
            [channel.id]: {
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'invited'
            }
          }, false)
          socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true)
        }

        else{
          await user!.related('channels').attach({
            [channel.id]: {
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'invited'
            },
          })
          socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true)
        }
      }
      else{
        socket.broadcast.emit('inviteUserToChannelResponse', null, null, null, null)
      }
    }
    else{
      let daco = await channel
      .related('users')
      .query()
      .where('nickname', nickname)
      .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
      .first()
      //user is banned
      if(daco){
        if(daco!.$extras.pivot_state === 'banned'){
          if(channel.creator_id === userId){
            await user!.related('channels').sync( {
              [channel.id]: {
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                state: 'invited'
              }
            }, false)
            socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true)
          }
          else{
            socket.broadcast.emit('inviteUserToChannelResponse', null, null, null, null)
          }

        }
        // user is not banned
        else{

          socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true)
        }
      }

      else{
        await user!.related('channels').attach({
          [channel.id]: {
            kicked_number: 0,
            is_topped: true,
            kicked_by: '',
            state: 'invited'
          },
        })
        socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true)
      }

    }
  }


  public async notifyAboutCreation({ socket }: WsContextContract, channelName: string) {
    socket.broadcast.emit('notifyAboutCreationResponse', channelName)
  }


  public async kickUserFromChannelRequest({ socket }: WsContextContract, channelName, nickname, userIdThatKicked) {
    const channel = await Channel.findByOrFail('name', channelName)

    const user = await User.findBy('nickname', nickname)
    const userThatKickedHim = await User.findByOrFail('id', userIdThatKicked)

    let daco = await channel
    .related('users')
    .query()
    .where('nickname', nickname)
    .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
    .first()

    if(daco === null){
      // user does not exist in the channel
      socket.broadcast.emit('kickUserFromChannelResponse', null, null)
    }
    else{

      if(daco!.$extras.pivot_kicked_by === ''){
        await channel.related('users').sync( {
          [user!.id]: {
            kicked_number: daco!.$extras.pivot_kicked_number + 1,
            kicked_by: userThatKickedHim.nickname,
            state: 'kicked'
          }
        }, false)
        socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname)
      }

      else{
        if(daco!.$extras.pivot_kicked_by.includes(userThatKickedHim.nickname)){
          // if user already kicked him do not kick him again
        }
        else{
          await channel.related('users').sync( {
            [user!.id]: {
              kicked_number: daco!.$extras.pivot_kicked_number + 1,
              kicked_by: daco!.$extras.pivot_kicked_by + userThatKickedHim.nickname,
              state: 'kicked'
            }
          }, false)
        }


      }

      daco = await channel
      .related('users')
      .query()
      .where('nickname', nickname)
      .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
      .first()

      if(channel.creator_id === userIdThatKicked){

          await channel.related('users').sync( {
          [user!.id]: {
            state: 'banned',
          }
        }, false)

        socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname)
      }
      else{
        if(daco!.$extras.pivot_kicked_number >= 3){

          await channel.related('users').sync( {
            [user!.id]: {
              state: 'banned',
            }
          }, false)
          socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname)
        }
        else{
          socket.broadcast.emit('kickUserFromChannelResponse', null, null)
        }
      }
    }
  }


  // /revoke private channel
  public async revokeUserRequest({ socket }: WsContextContract, channelName: string, nickname:string, userId: number) {
    const user = await User.findByOrFail('nickname', nickname)
    const channel = await Channel.findByOrFail('name', channelName)

    if(channel.is_private){
      if(channel.creator_id === userId){
        await user.related('channels').detach([channel.id])
      }
      // broadcast message to other users in channel
      socket.broadcast.emit('revokeUserResponse', channelName,nickname )
    }
    else{
      // channel is not private so dont do anything
    }

  }

}
