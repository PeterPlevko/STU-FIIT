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
  async createCat({ request }: HttpContextContract) {
    const data = await request.validate(CatValidator)
    try {
      let breed = null as Breed | null
      if (data.breed) {
        breed = await Breed.query().where('code', data.breed.code).first()
        if (breed === null) throw new Error('Breed not found')
      }
      let cat = await Cat.create({
        gender: data.gender as 'F' | 'M',
        name: data.name,
        countryOrigin: data.countryOrigin,
        countryCurrent: data.countryCurrent,
        color: data.color,
        colorCode: data.colorCode,
        dateOfBirth: data.dateOfBirth
          ? DateTime.fromFormat(data.dateOfBirth, 'yyyy-MM-dd')
          : undefined,
        breedId: breed ? (breed!.id as number) : null,
        regNumCurrent: data.regNumCurrent,
        regNumOrigin: data.regNumOrigin,
      })

      if (data.additionalInfo) {
        await CatInformation.create({
          catId: cat.id,
          chip: data.additionalInfo.chip,
          titleAfter: data.additionalInfo.titleAfter,
          titleBefore: data.additionalInfo.titleBefore,
          verifiedStatus: data.additionalInfo.verifiedStatus,
          cattery: data.additionalInfo.cattery,
        })
      }

      if (data.links) {
        await Link.createMany(
          data.links.map((link) => ({
            content: link.content,
            catId: cat.id,
            type: link.type as 'HEALTH_STATUS' | 'NOTE' | 'URL' | 'AWARD',
          }))
        )
      }

      if (data.reference) {
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
      await cat.save()
      return {
        message: 'Cat created',
      }
    } catch (error) {
      console.log(error)
      return {
        error: 'Cat not found',
      }
    }
  }
}
