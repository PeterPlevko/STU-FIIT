import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = 'x'
type DescriptionEnum = 'non-recognised variety'

export default class NonRecognisedVariety extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
