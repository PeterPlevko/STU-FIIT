import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  async register({ request }: HttpContextContract) {
    // if invalid, exception
    const data = await request.validate(RegisterUserValidator)
    const user = await User.create(data)
    // join user to general channel
    const general = await Channel.findByOrFail('name', 'general')
    await user.related('channels').attach({
      [general.id]: {
        is_topped: true,
        kicked_number: 0,
      }
    })

    return user
  }

  async login({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    return auth.use('api').attempt(email, password)
  }

  async logout({ auth }: HttpContextContract) {
    return auth.use('api').logout()
  }

  async me({ auth }: HttpContextContract) {
    await auth.user!.load('channels')
    return auth.user
  }
}
