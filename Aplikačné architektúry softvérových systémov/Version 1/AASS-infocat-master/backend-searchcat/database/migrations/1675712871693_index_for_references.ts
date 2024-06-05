import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.raw('CREATE INDEX cat_id_idx ON cat_references(cat_id)')
  }

  public async down() {}
}
