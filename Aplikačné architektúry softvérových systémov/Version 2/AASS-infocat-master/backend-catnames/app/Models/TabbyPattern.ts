import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '11' | '12' | '21' | '22' | '23' | '24' | '24' | '25'
type DescriptionEnum =
  | 'shaded (for BLH/BSH: tipped)'
  | 'shell (not for BLH/BSH)'
  | 'unspecified tabby'
  | 'mackerel tabby'
  | 'spotted tabby'
  | 'ticked tabby'

export default class TabbyPattern extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
