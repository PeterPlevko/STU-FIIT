import Cat from './Cat'
import { DateTime } from 'luxon'
import { column, BaseModel, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string | undefined | null

  @column()
  public type: 'HEALTH_STATUS' | 'NOTE' | 'URL' | 'AWARD' | undefined | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public catId: number

  @hasOne(() => Cat, {
    localKey: 'catId',
  })
  public cats: HasOne<typeof Cat>
}
