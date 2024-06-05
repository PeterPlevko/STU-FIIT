import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
    if (this.app.environment === 'web') {
      const kafkaConsumerService = await import('App/Controllers/Http/KafkaConsumerService')
      const kafkaConsumerServiceInstance = new kafkaConsumerService.default()
      await kafkaConsumerServiceInstance.start(['checkCatName', 'createCamundaForm', 'createCat'])
    }
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
