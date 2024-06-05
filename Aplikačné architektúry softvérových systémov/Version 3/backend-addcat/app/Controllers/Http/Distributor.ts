import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CatValidator from 'App/Validators/CatValidator'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
})

const producer = kafka.producer()

async function connectProducer() {
  await producer.connect()
  console.log('Kafka producer connected')
}

export default class Distributor {
  async createTopicCheckCatName({ request }: HttpContextContract) {
    try {
      const data = await request.validate(CatValidator)

      const eventData = JSON.stringify(data)

      await connectProducer()

      await producer.send({
        topic: 'checkCatName',
        messages: [{ value: eventData }],
      })

      console.log('checkCatName sent to Kafka')
    } catch (error) {
      console.error('Error sending event to Kafka:', error)
    }
  }

  async createTopicCreateCamundaForm(data: any) {
    try {
      await connectProducer()
      const eventData = JSON.stringify(data)

      await producer.send({
        topic: 'createCamundaForm',
        messages: [{ value: eventData }],
      })

      console.log('createCamundaForm sent to Kafka')
    } catch (error) {
      console.error('Error sending event to Kafka:', error)
    }
  }

  async createTopicCreateCat(data: any) {
    try {
      await connectProducer()

      await producer.send({
        topic: 'createCat',
        messages: [{ value: data }],
      })

      console.log('createCat sent to Kafka')
    } catch (error) {
      console.error('Error sending event to Kafka:', error)
    }
  }
}
