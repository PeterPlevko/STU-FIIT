import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  async setDnd({ request }: HttpContextContract) {
    let id = request.param('id')
    let body = request.body()

    const user = await User.findByOrFail('id', id)
    user.is_dnd = body.isDnd
    let changedUser = await user.save()
    return changedUser
  }

  async setOnline({ request }: HttpContextContract) {
    let id = request.param('id')
    let body = request.body()

    const user = await User.findByOrFail('id', id)
    user.is_online = body.isOnline
    let changedUser = await user.save()

    return changedUser
  }
}
