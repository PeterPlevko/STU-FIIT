import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Breed from 'App/Models/Breed'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'monika.kovacova@stuba.sk',
        fullname: 'Monika Kováčová',
        password: 'timak2023sup3rt1m',
        verified: true,
        roleId: 3,
      },
    ])
  }
}
