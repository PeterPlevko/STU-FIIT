import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '61' | '62' | '63' | '64' | '65' | '66' | '67'
type DescriptionEnum =
  | 'deep blue'
  | 'copper or deep orange'
  | 'odd eyed: one deep blue eye, the other one according to the standard for the breed'
  | 'green'
  | 'golden yellow - Burmese eye colour'
  | 'aquamarine (bluish-green) - Tonkinese eye colour'
  | 'intense deep blue - Siamese eye colour'

export default class EyeColour extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
