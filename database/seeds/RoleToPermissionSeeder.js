'use strict'

/*
|--------------------------------------------------------------------------
| RoleToPermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class RoleToPermissionSeeder {
  async run() {
    const data = {
      id: 1,
      role_id: 1,
      permission_id: 1
    }
    await Database.table('permission_roles').delete()
    await Database.table('permission_roles').insert(data)
  }
}

module.exports = RoleToPermissionSeeder
