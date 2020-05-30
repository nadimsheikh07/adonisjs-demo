'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionRolesSchema extends Schema {
  up() {
    this.create('permission_roles', (table) => {
      table.increments()
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('cascade').onUpdate('cascade')
      table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('cascade').onUpdate('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('permission_roles')
  }
}

module.exports = PermissionRolesSchema
