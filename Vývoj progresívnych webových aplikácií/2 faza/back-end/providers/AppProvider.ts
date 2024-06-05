import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // bind our implementation of MessageRepository to container
    this.app.container.singleton('Repositories/MessageRepository', (container) => {
    // just make instance of app/Repositories/MessageRepository class
       return container.make('App/Repositories/MessageRepository')
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
