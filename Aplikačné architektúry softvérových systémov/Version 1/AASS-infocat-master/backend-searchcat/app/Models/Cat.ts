import Link from './Link'
import Breed from './Breed'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
  HasMany,
  hasMany,
  beforeFetch,
  beforeFind,
} from '@ioc:Adonis/Lucid/Orm'
import CatInformation from './CatInformation'
import CatReference from './CatReference'
import CatHistory from './CatHistory'
import { softDeleteQuery, softDelete } from 'App/Services/SoftDelete'

type SexEnum = 'F' | 'M'

export default class Cat extends BaseModel {
  public hashId(): string {
    return btoa(this.id + '')
  }

  @column({
    isPrimary: true,
    serialize: (value: number | null) => {
      return value ? btoa(value + '') : value
    },
  })
  public id: number

  @column()
  public name: string | undefined | null

  @column({ serializeAs: 'countryOrigin' })
  public countryOrigin: string | undefined | null

  @column({ serializeAs: 'countryCurrent' })
  public countryCurrent: string | undefined | null

  @column()
  public gender: SexEnum | undefined | null

  @column({ serializeAs: 'colorCode' })
  public colorCode: string | undefined | null

  @column.date({ serializeAs: 'dateOfBirth' })
  public dateOfBirth: DateTime | undefined | null

  @column({ serializeAs: null })
  public breedId: number | undefined | null

  @column()
  public color: string | undefined | null

  @column({ serializeAs: 'regNumOrigin' })
  public regNumOrigin: string | undefined | null

  @column({ serializeAs: 'regNumCurrent' })
  public regNumCurrent: string | undefined | null

  @column()
  public srcDb: string | null

  @column({ serializeAs: null })
  public srcId: number | null

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Link, {
    foreignKey: 'catId',
  })
  public links: HasMany<typeof Link>

  @hasMany(() => CatHistory, {
    foreignKey: 'catId',
  })
  public history: HasMany<typeof CatHistory>

  @belongsTo(() => Breed, {
    foreignKey: 'breedId',
  })
  public breed: BelongsTo<typeof Breed>

  @hasOne(() => CatReference, {
    foreignKey: 'catId',
  })
  public reference: HasOne<typeof CatReference>

  @hasOne(() => CatInformation, {
    foreignKey: 'catId',
    serializeAs: 'additionalInfo',
  })
  public information: HasOne<typeof CatInformation>

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
