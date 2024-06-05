import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = 'm' | 'am' | 'cm' | 'em' | 'pm' | '*m'
type DescriptionEnum =
  | 'modifier'
  | 'caramel, based on blue'
  | 'caramel, based on lilac'
  | 'apricot, based on cream'
  | 'caramel, based on fawn'
  | 'caramel, where the base colour is unknown'

export default class DiluteModifier extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
