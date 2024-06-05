import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Channel from 'App/Models/Channel'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public channel_id: number

  @column()
  public content: string

  @column()
  public date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => Channel, {
    foreignKey: 'channel_id',
  })
  public channel: BelongsTo<typeof Channel>
}
