import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_breeds'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('breed_id').unsigned().references('breeds.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
