import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserChannels extends BaseSchema {
  protected tableName = 'user_channels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('channel_id').unsigned().references('channels.id').onDelete('CASCADE')
      table.boolean('is_topped').notNullable()
      table.integer('kicked_number').notNullable()
      table.string('kicked_by').notNullable()
      table.string('state').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
