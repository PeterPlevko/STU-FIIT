import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'
export default class ChannelController {
  async getAllChannels() {
    const channels = await Channel.all()
    return channels
  }

  async addChannel( { request }: HttpContextContract ){
    let data = request.body()

    const channel = await Channel.create(
      {
        name: data.channelName,
        is_private: data.isPrivate,
        creator_id: data.userId,
      }
    )

    const user = await User.findByOrFail('id', data.userId)
    await user.related('channels').attach({
      [channel.id]: {
        user_id: data.userId,
        kicked_number: 0,
        is_topped: true,
        state: 'accepted'
      },
    })
    return channel
  }

  async getAllUsersFromCurrentChannel( { request }:HttpContextContract  ){
    let nameWithSpaces = request.param('id')
    let name = nameWithSpaces.replace(/%20/g, ' ');
    const channel = await Channel.findByOrFail('name', name)
    await channel.load('users')
    const users = channel.users;
    return users
  }

  async getAllNotBannedChannels( { request }:HttpContextContract  ){
    // check if there are some channels with messages older than 30 days if there are
    let nickname = request.param('id')

    let user = await User.findByOrFail('nickname', nickname)

    await user.load('channels')

    let channels = user.channels

    for(let i = 0; i < channels.length; i++){
      let channel = channels[i]
      await channel.load('messages')
      let messages = channel.messages
      let lastMessage = messages[messages.length - 1]
      if(lastMessage !== undefined){
        let date = new Date(lastMessage.createdAt.toFormat('yyyy-M-d'))
        let now = new Date()
        let diff = now.getTime() - date.getTime()
        let diffDays = Math.ceil(diff / (1000 * 3600 * 24))
        if(diffDays > 30){
          await channel.related('users').detach([user.id])
        }
      }
    }

    // load without deleted dates
    user = await User.findByOrFail('nickname', nickname)

    await user.load('channels')

    channels = user.channels

    let finalArray : any = [];

    for(let i = 0; i < channels.length; i++){
      if(channels[i].$extras.pivot_state !== 'banned' && channels[i].$extras.pivot_state !== 'kicked'){
        await finalArray.push(channels[i])
      }
    }

    let serializedFinalArray:any = []
    for(let i = 0; i < finalArray.length; i++){
      const serialized = await finalArray[i].serialize()
      serialized.isTopped = finalArray[i].$extras.pivot_is_topped
      serialized.state = finalArray[i].$extras.pivot_state
      serializedFinalArray.push(serialized)
    }

    return serializedFinalArray
  }


  public async removeUserFromChannel({ request }:HttpContextContract ){
    let nameWithSpaces = request.param('id')
    let name = nameWithSpaces.replace(/%20/g, ' ');

    let userId = request.body().userId

    const user = await User.findByOrFail('id', userId)
    const channel = await Channel.findByOrFail('name', name)

    await user.related('channels').detach([channel.id])

    if(channel.creator_id === userId){
      await channel.related('users').detach(userId)
      await channel.delete()
    }

  }


  async createOrJoinChannel({ request }: HttpContextContract) {
    let body = request.body()
    let channel = await Channel.findBy('name', body.channelName)
    if(channel?.is_private){
      // channel is private
      return null
    }
    else{
      let user = await User.findByOrFail('id', body.userId)

      if(channel === null){
        channel = await Channel.create(
          {
            name: body.channelName,
            is_private: body.isPrivate,
            creator_id: body.userId,
          }
        )

        await user.related('channels').attach({
          [channel.id]: {
            kicked_number: 0,
            is_topped: false,
            kicked_by: '',
            state: 'accepted',
          },
        })

        let daco = await channel
        .related('users')
        .query()
        .where('nickname', user.nickname)
        .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
        .first()
        return {channel: channel, state: daco!.$extras.pivot_state}
      }
      else{
        const user = await User.findByOrFail('id', body.userId)

        let daco = await channel
        .related('users')
        .query()
        .where('nickname', user.nickname)
        .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
        .first()

        if(daco !== null){
          if(daco!.$extras.pivot_state === 'banned'){
            return null
          }
          else{

            let daco = await channel
            .related('users')
            .query()
            .where('nickname', user.nickname)
            .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
            .first()

            return {channel: channel, state: daco!.$extras.pivot_state}


          }
        }
        else{

          await user.related('channels').attach({
            [channel.id]: {
              kicked_number: 0,
              is_topped: false,
              kicked_by: '',
              state: 'accepted',
            },
          })

          let daco = await channel
        .related('users')
        .query()
        .where('nickname', user.nickname)
        .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'state'])
        .first()

        return {channel: channel, state: daco!.$extras.pivot_state}


        }
      }
    }
  }


  async setNotTopped({ request }: HttpContextContract) {
    let body = request.body()

    let channel = await Channel.findByOrFail('name', body.channelName)
    let user = await User.findByOrFail('nickname', body.nickname)

    await channel.related('users').sync( {
      [user.id]: {
        is_topped: false,
      }
    }, false)
  }

  async acceptInvite({ request }: HttpContextContract) {
    let body = request.body()
    let channel = await Channel.findByOrFail('name', body.channelName)
    let user = await User.findByOrFail('nickname', body.userName)

    await channel.related('users').sync( {
      [user.id]: {
        state: 'accepted',
      }
    }, false)
  }


  async declineInvite({ request }: HttpContextContract) {
    let body = request.body()
    let channel = await Channel.findByOrFail('name', body.channelName)
    let user = await User.findByOrFail('nickname', body.userName)

    await channel.related('users').detach([user.id])
  }
}
