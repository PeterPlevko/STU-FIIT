import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = 's' | 'y'
type DescriptionEnum = 'silver' | 'golden'

export default class SilverGolden extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
