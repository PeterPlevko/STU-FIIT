import type { MessageRepositoryContract, SerializedMessage } from '@ioc:Repositories/MessageRepository'
import Channel from 'App/Models/Channel'

export default class MessageRepository implements MessageRepositoryContract {
  public async getAll(channelName: string, pagination:number): Promise<any[]> {
    const channel = await Channel.query()
      .where('name', channelName)
      .preload('messages', (messagesQuery) =>  {
        messagesQuery.preload('author')
        .orderBy('created_at', 'asc')
        .groupLimit(pagination)
    }
      )
      .firstOrFail()
    return channel.messages.map((message) => message.serialize())
  }

  public async create(channelName: string, userId: number, content: string): Promise<SerializedMessage> {
    const channel = await Channel.findByOrFail('name', channelName)
    const message = await channel.related('messages').create({ user_id: userId, channel_id: channel.id, content: content })
    await message.load('author')
    return message.serialize() as SerializedMessage
  }
}
