import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'breeds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('code', 7).notNullable().unique()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
