'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require("moment");
class User extends Model {
  static get hidden() {
    return ['password']
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get dates() {
    return super.dates.concat(['dob'])
  }

  static formatDates(field, value) {
    if (field === 'dob') {
      return moment(value).format('MM-DD-YYYY')
    }
    return super.formatDates(field, value)
  }

  static castDates(field, value) {
    if (field === 'dob') {
      return moment(value).format('MM-DD-YYYY')
    }
    return super.formatDates(field, value)
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  tasks() {
    return this.hasMany('App/Models/Task')
  }

  role() {
    return this.belongsTo('App/Models/Role')
  }

}

module.exports = User
