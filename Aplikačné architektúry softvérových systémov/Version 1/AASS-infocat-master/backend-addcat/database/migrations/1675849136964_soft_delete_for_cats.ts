import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cats'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('deleted_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
