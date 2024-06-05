import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 150)
      table.string('country_origin', 100)
      table.string('country_current', 100)
      table.string('color', 200)
      table.string('color_code', 70)
      table.timestamp('date_of_birth', { useTz: false })
      table.string('gender', 1)
      table.string('reg_num_origin', 200)
      table.string('reg_num_current', 200)
      table.string('src_db', 90)
      table.integer('src_id')
      table.integer('breed_id').nullable().unsigned().references('breeds.id').onDelete('set null')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
