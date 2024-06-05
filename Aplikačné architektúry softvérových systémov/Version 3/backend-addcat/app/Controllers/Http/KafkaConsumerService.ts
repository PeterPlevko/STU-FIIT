import { Kafka, Consumer } from 'kafkajs'
import Cat from '../../Models/Cat'
import Ws from 'App/Services/Ws'
import Distributor from 'App/Controllers/Http/Distributor'
import axios from 'axios'
import { Client, logger } from 'camunda-external-task-client-js'
import Breed from 'App/Models/Breed'
import CatReference from 'App/Models/CatReference'
import Link from 'App/Models/Link'
import CatInformation from 'App/Models/CatInformation'
import { DateTime } from 'luxon'

class KafkaConsumerService {
  private kafka: Kafka
  private consumer: Consumer
  private distributor: Distributor

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
    })

    this.consumer = this.kafka.consumer({ groupId: 'my-group' })
    this.distributor = new Distributor()
  }

  async start(topics: string[]): Promise<void> {
    await this.consumer.connect()

    await Promise.all(topics.map((topic) => this.consumer.subscribe({ topic })))

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        switch (topic) {
          case 'checkCatName':
            const data = JSON.parse(message.value!.toString())
            let cat = await Cat.query().where('name', data.name).first()
            if (cat === null) {
              this.distributor.createTopicCreateCamundaForm(data)
            } else {
              Ws.io.emit('showNotification', {
                message: `Cat with name: ${data.name} already exists`,
                type: 'negative',
              })
            }
            break
          case 'createCamundaForm':
            const url =
              'http://localhost:8080/engine-rest/process-definition/key/add-cat-process/start'
            const headers = {
              'accept': 'application/json',
              'Authorization': 'Basic ZGVtbzpkZW1v',
              'Content-Type': 'application/json',
            }

            const catData = JSON.parse(message.value!.toString())
            const catDataStringified = JSON.stringify(catData)

            const dataForCamunda = {
              variables: {
                cat: {
                  value: catDataStringified,
                  type: 'Object',
                  valueInfo: {
                    objectTypeName: 'com.camunda.SomeClass',
                    serializationDataFormat: 'application/json',
                  },
                },
              },
            }

            try {
              await axios.post(url, dataForCamunda, { headers })
            } catch (error) {
              console.error('Error:', error.response ? error.response.data : error.message)
            }

            break
          case 'createCat':
            const thing = message.value!.toString()
            const saveCatData = JSON.parse(thing)

            try {
              let breed = null as Breed | null

              if (saveCatData.breed) {
                breed = await Breed.query().where('code', saveCatData.breed.code).first()
                if (breed === null) throw new Error('Breed not found')
              }

              let cat = await Cat.create({
                gender: saveCatData.gender as 'F' | 'M',
                name: saveCatData.name,
                countryOrigin: saveCatData.countryOrigin,
                countryCurrent: saveCatData.countryCurrent,
                color: saveCatData.color,
                colorCode: saveCatData.colorCode,
                dateOfBirth: saveCatData.dateOfBirth
                  ? DateTime.fromFormat(saveCatData.dateOfBirth, 'yyyy-MM-dd')
                  : undefined,
                breedId: breed ? (breed!.id as number) : null,
                regNumCurrent: saveCatData.regNumCurrent,
                regNumOrigin: saveCatData.regNumOrigin,
              })

              if (saveCatData.additionalInfo) {
                await CatInformation.create({
                  catId: cat.id,
                  chip: saveCatData.additionalInfo.chip,
                  titleAfter: saveCatData.additionalInfo.titleAfter,
                  titleBefore: saveCatData.additionalInfo.titleBefore,
                  verifiedStatus: saveCatData.additionalInfo.verifiedStatus,
                  cattery: saveCatData.additionalInfo.cattery,
                })
              }

              if (saveCatData.links) {
                await Link.createMany(
                  data.links.map((link) => ({
                    content: link.content,
                    catId: cat.id,
                    type: link.type as 'HEALTH_STATUS' | 'NOTE' | 'URL' | 'AWARD',
                  }))
                )
              }

              if (saveCatData.reference) {
                await CatReference.create({
                  catId: cat.id,
                  fatherId:
                    saveCatData.reference.father === undefined
                      ? null
                      : parseInt(atob(saveCatData.reference.father.id as string)),
                  motherId:
                    saveCatData.reference.mother === undefined
                      ? null
                      : parseInt(atob(saveCatData.reference.mother.id as string)),
                })
              }
              await cat.save()

              Ws.io.emit('showNotification', {
                message: `Cat with name: ${saveCatData.name} was created`,
                type: 'positive',
              })
            } catch (error) {
              Ws.io.emit('showNotification', {
                message: `Cat with name: ${saveCatData.name} was not found`,
                type: 'negative',
              })
            }
            break
          default:
            console.log('Received message from unknown topic:', message.value!.toString())
            break
        }
      },
    })

    const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger }
    const client = new Client(config)
    client.subscribe('add-cat', async ({ task, taskService }) => {
      try {
        const catStringifiedObject = task.variables.get('cat')
        const catObject = JSON.parse(catStringifiedObject)
        const catColor = task.variables.get('cat_color')
        catObject.color = catColor
        const catJsonString = JSON.stringify(catObject)
        await taskService.complete(task)
        this.distributor.createTopicCreateCat(catJsonString)
      } catch (error) {
        console.log('error', error)
      }
    })
  }

  async stop(): Promise<void> {
    await this.consumer.disconnect()
  }
}

export default KafkaConsumerService
