import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cat from './Cat'

export default class CatHistory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public current: string

  @column()
  public updated: string

  @column()
  public catId: number

  @hasOne(() => Cat, {
    localKey: 'catId',
  })
  public cats: HasOne<typeof Cat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
