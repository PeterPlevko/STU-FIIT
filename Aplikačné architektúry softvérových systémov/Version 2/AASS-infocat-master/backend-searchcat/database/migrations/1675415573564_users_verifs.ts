import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('verified').nullable()
      table.timestamp('email_date', { useTz: true }).nullable()
      table.string('code', 20).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('verified')
      table.dropColumn('email_date')
      table.dropColumn('code')
    })
  }
}
