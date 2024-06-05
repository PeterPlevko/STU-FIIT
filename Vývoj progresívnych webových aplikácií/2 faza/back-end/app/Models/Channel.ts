import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Message from 'App/Models/Message'
import User from './User'

export default class Channel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public is_private: boolean

  @column()
  public creator_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey: 'channel_id',
  })
  public messages: HasMany<typeof Message>

  @hasOne(() => User, {
    localKey: 'creator_id',
  })
  public user: HasOne<typeof User>

  // userChannel
  @manyToMany(() => User, {
    pivotTable: 'user_channels',
    pivotForeignKey: 'channel_id', // ten moj
    pivotRelatedForeignKey: 'user_id', // ten cudzi
    pivotColumns: ['is_topped', 'kicked_number', 'kicked_by', 'state'],
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>
}
