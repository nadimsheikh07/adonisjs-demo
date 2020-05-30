'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up() {
    this.create('tasks', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('restrict').onUpdate('cascade')
      table.string('name', 100)
      table.date('start_date').nullable()
      table.datetime('start_time', { useTz: false }).nullable()
      table.date('end_date').nullable()
      table.datetime('end_time', { useTz: false }).nullable()
      table.text('details', 'text')
      table.timestamps()
    })
  }

  down() {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
