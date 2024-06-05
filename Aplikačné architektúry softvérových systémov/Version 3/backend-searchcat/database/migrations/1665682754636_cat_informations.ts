import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cat_informations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title_before', 400)
      table.string('title_after', 400)
      table.string('chip', 100)
      table.string('verified_status', 20)
      table.string('cattery', 100)
      table.integer('cat_id').unsigned().references('cats.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
