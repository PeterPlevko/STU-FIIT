import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '71' | '72'
type DescriptionEnum =
  | 'straight (only applicable to ACL and ACS)'
  | 'curled (only applicable to ACL and ACS)'

export default class Ear extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
