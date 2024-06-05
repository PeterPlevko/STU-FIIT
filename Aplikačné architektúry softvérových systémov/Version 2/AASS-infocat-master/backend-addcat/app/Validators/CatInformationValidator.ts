import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CatsDataValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    catId: schema.string([], [rules.required()]),
    chip: schema.string.nullable([], []),
    verifiedStatus: schema.string.nullable([], []),
    titleBefore: schema.string.nullable([], []),
    titleAfter: schema.string.nullable([], []),
    cattery: schema.string.nullable([], []),
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
