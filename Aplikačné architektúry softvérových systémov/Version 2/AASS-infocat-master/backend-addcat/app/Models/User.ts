import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Breed from './Breed'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public roleId: number

  @column()
  public email: string

  @column()
  public fullname: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public verified: boolean | null

  @column({ serializeAs: null })
  public email_date: DateTime | null

  @column({ serializeAs: null })
  public code: string | null

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  public role: BelongsTo<typeof Role>

  @manyToMany(() => Breed, {
    pivotTable: 'user_breeds',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'breed_id',
  })
  public breeds: ManyToMany<typeof Breed>
}
