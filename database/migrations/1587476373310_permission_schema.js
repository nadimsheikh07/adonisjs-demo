'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up() {
    this.create('permissions', (table) => {
      table.increments()
      table.string('code', 100).notNullable().unique()
      table.string('details', 100).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
