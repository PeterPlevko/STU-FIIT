import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CatsDataValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    per_page: schema.number(),
    page: schema.number(),
    order_by: schema.string.optional(),
    order_type: schema.string.optional(),
    sex: schema.enum.optional(['M', 'F']),
    born_after: schema.date.optional(),
    born_before: schema.date.optional(),
    country: schema.string.optional({}, []),
    breed: schema.string.optional({}, []),
    name: schema.string.optional({}, []),
    ems: schema.string.optional({}, []),
    id: schema.string.optional({}, []),
    father_name: schema.string.optional({}, []),
    mother_name: schema.string.optional({}, []),
  })
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
