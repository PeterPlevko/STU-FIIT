import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CatsDataValidator from 'App/Validators/CatsDataValidator'
import * as console from 'console'

export default class CatController {
  async getCatNamesByAlphabet({ request }: HttpContextContract) {
    const data = await request.validate(CatsDataValidator)
    const catCharacter = request.params().character
    if (data['order_by'] === undefined) data['order_by'] = 'name'
    if (data['order_type'] === undefined) data['order_type'] = 'asc'
    if (data['per_page'] === undefined) data['per_page'] = 100
    if (data['page'] === undefined) data['page'] = 0
    if (data['sex'] === undefined) data['sex'] = '%'

    try {
      let cat = await Database.rawQuery(
        `SELECT DISTINCT name, gender, random() as randomX FROM cats WHERE gender ilike '${
          data.sex
        }' AND name ilike '${catCharacter}%' AND length(name) > 3 ORDER BY randomX LIMIT ${
          data['per_page']
        } OFFSET ${data['page'] * data['per_page']}`
      )

      const count = await Database.rawQuery(
        `SELECT DISTINCT COUNT(name) as count FROM cats WHERE gender ilike '${data.sex}' AND name ilike '${catCharacter}%' AND length(name) > 3`
      )

      return {
        metadata: {
          page: data.page,
          per_page: data.per_page,
          pages: Math.ceil(count.rows[0].count / data.per_page) - 1,
          total: parseInt(count.rows[0].count),
        },
        items: cat.rows,
      }
    } catch (error) {
      console.log(error)
      let cat = {
        error: 'error on catnames/:character endpoint',
      }
      return cat
    }
  }
}
