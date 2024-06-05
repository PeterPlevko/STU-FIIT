import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum = '81' | '82' | '83' | '84'
type DescriptionEnum =
  | 'longhair (only applicable to DSP and PEB)'
  | 'shorthair (only applicable to DSP and PEB)'
  | 'brush (only applicable to DSP and PEB)'
  | 'straight (only applicable to LPL/LPS and SRL/SRS)'

export default class CoatStructure extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
