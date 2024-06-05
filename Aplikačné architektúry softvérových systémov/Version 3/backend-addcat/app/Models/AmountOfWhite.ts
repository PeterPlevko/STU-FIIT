import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '01' | '02' | '03' | '04' | '05' | '09'
type DescriptionEnum =
  | 'van'
  | 'harlequin'
  | 'bicolour'
  | 'mitted (only applicable to RAG)'
  | 'snowshoe (only applicable to SNO)'
  | 'any other amount of white'

export default class AmountOfWhite extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
