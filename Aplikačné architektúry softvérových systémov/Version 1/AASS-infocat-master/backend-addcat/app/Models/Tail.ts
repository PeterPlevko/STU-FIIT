import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '51' | '52' | '53' | '54'
type DescriptionEnum = 'rumpy' | 'rumpy riser' | 'stumpy' | 'longie'

export default class Tail extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
