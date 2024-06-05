import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.raw(
      'CREATE INDEX mother_id_idx ON cat_references(mother_id); CREATE INDEX father_id_idx ON cat_references(father_id);'
    )
  }

  public async down() {}
}
