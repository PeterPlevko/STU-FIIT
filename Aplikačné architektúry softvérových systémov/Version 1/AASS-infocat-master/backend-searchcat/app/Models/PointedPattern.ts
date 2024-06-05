import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '31' | '32' | '33'
type DescriptionEnum = 'Burmese pointed' | 'Tonkinese pointed' | 'Siamese pointed'

export default class PointedPattern extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
