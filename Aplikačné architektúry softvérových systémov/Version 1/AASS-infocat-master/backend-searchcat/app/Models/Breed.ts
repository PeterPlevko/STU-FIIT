import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Cat from './Cat'
import User from './User'

export default class Breed extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @belongsTo(() => Cat, {
    foreignKey: 'breedId',
  })
  public cat: BelongsTo<typeof Cat>

  @manyToMany(() => User, {
    pivotTable: 'user_breeds',
    pivotForeignKey: 'breed_id',
    pivotRelatedForeignKey: 'user_id',
  })
  public users: ManyToMany<typeof User>
}
