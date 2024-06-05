import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, manyToMany, ManyToMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import Notification from './Notification'
import Channel from './Channel'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public nickname: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public is_online: boolean

  @column()
  public is_dnd: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Message, {
    foreignKey: 'user_id',
  })
  public sentMessages: HasMany<typeof Message>

  @hasMany(() => Notification, {
    foreignKey: 'user_id',
  })
  public Notifications: HasMany<typeof Notification>

  @belongsTo(() => Channel, {
    foreignKey: 'creator_id',
  })
  public creatorId: BelongsTo<typeof Channel>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @manyToMany(() => Channel, {
    pivotTable: 'user_channels',
    pivotForeignKey: 'user_id', // ten moj
    pivotRelatedForeignKey: 'channel_id', // ten cudzi
    pivotColumns: ['is_topped', 'kicked_number', 'kicked_by', 'state'],
    pivotTimestamps: true,
  })
  public channels: ManyToMany<typeof Channel>
}
