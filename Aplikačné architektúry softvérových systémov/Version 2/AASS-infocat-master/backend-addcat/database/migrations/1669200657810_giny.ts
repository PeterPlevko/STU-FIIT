import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_breeds'

  public async up() {
    this.schema.raw(
      'create extension pg_trgm; CREATE INDEX gin_name ON cats USING gin(name gin_trgm_ops);'
    )
  }

  public async down() {}
}
