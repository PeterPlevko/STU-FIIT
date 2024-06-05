import { BaseModel, belongsTo, BelongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Cat from './Cat'

export default class CatReference extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public fatherName: string | undefined

  @column()
  public motherName: string | undefined

  @column()
  public fatherRegNum: string

  @column()
  public motherRegNum: string

  @column({
    serializeAs: null,
  })
  public fatherId: number | null

  @column({
    serializeAs: null,
  })
  public motherId: number | null

  @column({ serializeAs: null })
  public catId: number

  @hasOne(() => Cat, {
    localKey: 'catId',
  })
  public cats: HasOne<typeof Cat>

  @belongsTo(() => Cat, {
    foreignKey: 'fatherId',
  })
  public father: BelongsTo<typeof Cat>

  @belongsTo(() => Cat, {
    foreignKey: 'motherId',
  })
  public mother: BelongsTo<typeof Cat>
}
