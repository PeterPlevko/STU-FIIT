import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Breed from 'App/Models/Breed'
import Cat from 'App/Models/Cat'
import CatInformation from 'App/Models/CatInformation'
import CatReference from 'App/Models/CatReference'
import Link from 'App/Models/Link'
import CatValidator from 'App/Validators/CatValidator'
import { DateTime } from 'luxon'
import * as console from 'console'

export default class CatController {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async getCat({ request }: HttpContextContract) {
    try {
      let catId = atob(request.params().id)

      let cat = await Cat.query()
        .preload('history')
        .preload('breed')
        .preload('information')
        .preload('reference', (query) => query.preload('father').preload('mother'))
        .preload('links')
        .where('id', catId)
        .first()
      if (cat === null) throw new Error('Cat not found')

      return cat?.serialize()
    } catch (error) {
      console.log(error)
      return {
        error: 'Cat not found',
      }
    }
  }

  async deleteCat({ request }: HttpContextContract) {
    try {
      let catId = atob(request.params().id)

      let cat = await Cat.query().where('id', catId).first()
      if (cat) {
        await cat.softDelete()
        return {
          message: 'Cat deleted',
        }
      } else {
        throw new Error('Cat not found')
      }
    } catch (error) {
      console.log(error)
      return {
        error: 'Cat not found',
      }
    }
  }

  async updateCat({ request }: HttpContextContract) {
    const data = await request.validate(CatValidator)
    try {
      let catId = atob(request.params().id)
      let breed = null as Breed | null
      if (data.breed) {
        breed = await Breed.query().where('code', data.breed.code).first()
        if (breed === null) throw new Error('Breed not found')
      }

      let cat = await Cat.query().where('id', catId).first()
      if (cat && breed) {
        cat.gender = data.gender as 'F' | 'M'
        cat.name = data.name
        cat.countryOrigin = data.countryOrigin
        cat.countryCurrent = data.countryCurrent
        cat.color = data.color
        cat.colorCode = data.colorCode
        cat.dateOfBirth = data.dateOfBirth
          ? DateTime.fromFormat(data.dateOfBirth, 'yyyy-MM-dd')
          : undefined
        cat.regNumCurrent = data.regNumCurrent
        cat.regNumOrigin = data.regNumOrigin
        if (breed) {
          await cat.related('breed').dissociate()
          await cat.related('breed').associate(breed)
        }
        await cat.save()
        if (data.additionalInfo) {
          let info = await CatInformation.query().where('catId', catId).first()
          if (info) {
            info.chip = data.additionalInfo.chip === undefined ? null : data.additionalInfo.chip
            info.titleAfter =
              data.additionalInfo.titleAfter === undefined ? null : data.additionalInfo.titleAfter
            info.titleBefore =
              data.additionalInfo.titleBefore === undefined ? null : data.additionalInfo.titleBefore
            info.verifiedStatus =
              data.additionalInfo.verifiedStatus === undefined
                ? null
                : data.additionalInfo.verifiedStatus
            info.cattery =
              data.additionalInfo.cattery === undefined ? null : data.additionalInfo.cattery
            await info.save()
          } else {
            await CatInformation.create({
              catId: cat.id,
              chip: data.additionalInfo.chip,
              titleAfter: data.additionalInfo.titleAfter,
              titleBefore: data.additionalInfo.titleBefore,
              verifiedStatus: data.additionalInfo.verifiedStatus,
              cattery: data.additionalInfo.cattery,
            })
          }
        }

        //TODO update links
        let dbLinks = await Link.query().where('catId', catId)

        if (data.links) {
          for (let link of data.links) {
            let dbLink = dbLinks.find((l) => l.id === link.id)
            if (dbLink) {
              dbLinks.splice(dbLinks.indexOf(dbLink), 1)

              dbLink.content = link.content
              dbLink.type = link.type as 'HEALTH_STATUS' | 'NOTE' | 'URL' | 'AWARD'
              await dbLink.save()
            } else {
              await Link.create({
                content: link.content,
                catId: cat.id,
                type: link.type as 'HEALTH_STATUS' | 'NOTE' | 'URL' | 'AWARD',
              })
            }
          }
        }

        if (dbLinks.length > 0) {
          await Link.query()
            .whereIn(
              'id',
              dbLinks.map((l) => l.id)
            )
            .delete()
        }

        if (data.reference && Object.keys(data.reference).length > 0) {
          let ref = await CatReference.query().where('catId', catId).first()
          if (ref) {
            ref.fatherId =
              data.reference.father === undefined
                ? null
                : parseInt(atob(data.reference.father.id as string))
            if (data.reference.father === undefined) ref.fatherName = undefined
            ref.motherId =
              data.reference.mother === undefined
                ? null
                : parseInt(atob(data.reference.mother.id as string))
            if (data.reference.mother === undefined) ref.motherName = undefined

            await ref.save()
          } else {
            await CatReference.create({
              catId: cat.id,
              fatherId:
                data.reference.father === undefined
                  ? null
                  : parseInt(atob(data.reference.father.id as string)),
              motherId:
                data.reference.mother === undefined
                  ? null
                  : parseInt(atob(data.reference.mother.id as string)),
            })
          }
        }
      } else {
        throw new Error('Cat not found')
      }
      return {
        message: 'Cat updated',
      }
    } catch (error) {
      console.log(error)
      return {
        error: error.message,
      }
    }
  }

  async getCats({ request }: HttpContextContract) {
    try {
      const data = request.body()
      if (data['order_by'] === undefined) data['order_by'] = 'id'
      if (data['order_type'] === undefined) data['order_type'] = 'asc'
      if (data['sex'] === 'male') data['sex'] = 'M'
      if (data['sex'] === 'female') data['sex'] = 'F'
      if (data['order_by'] === 'breed') data['order_by'] = 'breedCode'

      // if invalid, exception
      let catQuery = Cat.query()
      try {
        if (data.id !== undefined)
          catQuery = catQuery.where('cats.id', '=', `${parseInt(atob(data.id))}`)
      } catch (error) {
        console.log(error)
      }
      if (data.name !== undefined) catQuery = catQuery.where('cats.name', 'ilike', `%${data.name}%`)
      if (data.sex !== undefined) catQuery = catQuery.where('cats.gender', '=', `${data.sex}`)
      if (data.country !== undefined)
        catQuery = catQuery.where('cats.country_current', '=', `${data.country}`)
      if (data.father_name !== undefined)
        catQuery = catQuery.where('c2.name ', 'ilike', `%${data.father_name}%`)
      if (data.mother_name !== undefined)
        catQuery = catQuery.where('c1.name', 'ilike', `%${data.mother_name}%`)
      if (data.ems !== undefined)
        catQuery = catQuery.where('cats.color_code', 'ilike', `%${data.ems}%`)
      if (data.born_after !== undefined)
        catQuery = catQuery.where('cats.date_of_birth', '>=', `%${data.born_after}%`)
      if (data.born_before !== undefined)
        catQuery = catQuery.where('cats.date_of_birth', '<=', `%${data.born_before}%`)
      if (data.breed !== undefined)
        catQuery = catQuery.whereHas('breed', (query) => {
          query.where('code', `${data.breed}`)
        })

      if (data.father_name !== undefined || data.mother_name !== undefined)
        catQuery = catQuery
          .join('cat_references', 'cat_references.cat_id', 'cats.id')
          .join('cats as c1', 'cat_references.mother_id', 'c1.id')
          .join('cats as c2', 'cat_references.father_id', 'c2.id')

      const count = await catQuery.clone().count('* as count').first()

      catQuery = catQuery
        .leftJoin('breeds', 'cats.breed_id', 'breeds.id')
        .select('cats.*')
        .select('breeds.code as breedCode')

      const cats = await catQuery
        .preload('history')
        .preload('links')
        .preload('breed')
        .preload('information')
        .preload('reference', (query) => query.preload('father').preload('mother'))
        .limit(data.per_page)
        .offset(data.page * data.per_page)
        .orderBy(data['order_by'], data['order_type'] as 'asc' | 'desc')
        .exec()

      return {
        metadata: {
          page: data.page,
          per_page: data.per_page,
          pages: Math.ceil(count?.$extras.count / data.per_page) - 1,
          total: parseInt(count?.$extras.count),
        },
        items: cats.map((cat) => cat.serialize()),
      }
    } catch (error) {
      console.log(error)
      return {
        error: 'Something went wrong',
      }
    }
  }
}
