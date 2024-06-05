import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cat_references'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cat_id').unsigned().references('cats.id').onDelete('CASCADE')
      table.integer('father_id').nullable().unsigned().references('cats.id').onDelete('set null')
      table.integer('mother_id').nullable().unsigned().references('cats.id').onDelete('set null')
      table.string('father_name', 200)
      table.string('mother_name', 200)
      table.string('father_reg_number', 200)
      table.string('mother_reg_number', 200)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
