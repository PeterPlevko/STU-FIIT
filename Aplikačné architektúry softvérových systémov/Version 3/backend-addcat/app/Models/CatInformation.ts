import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cat from './Cat'

export default class CatInformation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public chip: string | undefined | null

  @column()
  public verifiedStatus: string | undefined | null

  @column()
  public titleBefore: string | undefined | null

  @column()
  public titleAfter: string | undefined | null

  @column()
  public cattery: string | undefined | null

  @column({ serializeAs: null })
  public catId: number

  @hasOne(() => Cat, {
    localKey: 'catId',
  })
  public cats: HasOne<typeof Cat>
}
