'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class RoleSeeder {
  async run() {
    const data = {
      id: 1,
      name: 'Super Admin'
    }
    await Database.table('roles').delete()
    await Database.table('roles').insert(data)
  }
}

module.exports = RoleSeeder
