import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

type CodeEnum =
  | 'n'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'j'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 't'
  | 'w'
type DescriptionEnum =
  | 'black ("n" comes from the French noir, meaning black), seal (in pointed cats), brown (in BUR), ruddy (in ABY and SOM), tawny (in OCI)'
  | 'blue'
  | 'chocolate'
  | 'lilac'
  | 'red'
  | 'cream'
  | 'black tortie'
  | 'blue tortie'
  | 'chocolate tortie'
  | 'lilac tortie'
  | 'cinnamon (sorrel in ABY and SOM)'
  | 'fawn'
  | 'cinnamon tortie'
  | 'fawn tortie'
  | 'amber (in NFO) charcoal (in BEN)'
  | 'white'

export default class Colour extends BaseModel {
  @column({ isPrimary: true })
  public code: CodeEnum

  @column()
  public description: DescriptionEnum
}
