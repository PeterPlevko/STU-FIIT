import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'
import Breed from 'App/Models/Breed'
import Cat from 'App/Models/Cat'
import Link from 'App/Models/Link'
import CatInformation from 'App/Models/CatInformation'
import CatReference from 'App/Models/CatReference'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    if (Seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new Seeder.default(this.client).run()
  }
  public async run() {
    const breed = await Breed.first()
    const cat = await Cat.first()
    const link = await Link.first()
    const catInformation = await CatInformation.first()
    const catReference = await CatReference.first()
    const role = await Role.first()
    const user = await User.first()

    if (!breed) await this.runSeeder(await import('../SeederBreed'))
    if (!cat) await this.runSeeder(await import('../SeederCat'))
    if (!link) await this.runSeeder(await import('../SeederLink'))
    if (!catInformation) await this.runSeeder(await import('../SeederCatInformation'))
    if (!catReference) await this.runSeeder(await import('../SeederCatReference'))
    if (!role) await this.runSeeder(await import('../SeederRole'))
    if (!user) await this.runSeeder(await import('../SeederUser'))
  }
}
