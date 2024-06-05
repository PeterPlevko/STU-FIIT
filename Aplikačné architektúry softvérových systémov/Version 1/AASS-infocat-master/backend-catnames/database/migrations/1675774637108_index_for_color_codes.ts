import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.raw('CREATE INDEX gin_color_code ON cats USING gin(color_code gin_trgm_ops);')
  }

  public async down() {}
}
