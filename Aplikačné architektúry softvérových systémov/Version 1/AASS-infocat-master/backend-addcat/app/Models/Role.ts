import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => User, {
    foreignKey: 'roleId',
  })
  public users: HasMany<typeof User>
}
