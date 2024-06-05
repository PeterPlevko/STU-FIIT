import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Breed from 'App/Models/Breed'

export default class BreedController {
  async getBreeds({}: HttpContextContract) {
    return await Breed.query().orderBy('code', 'asc').exec()
  }
}
