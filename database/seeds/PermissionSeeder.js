'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
class PermissionSeeder {
  async run() {
    const data = {
      id: 1,
      code: 'user_all_action_module',
      details: 'can use all action for user module'
    }
    await Database.table('permissions').delete()
    await Database.table('permissions').insert(data)
  }
}

module.exports = PermissionSeeder
