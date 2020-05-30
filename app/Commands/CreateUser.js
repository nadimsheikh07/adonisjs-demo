'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User');
const Database = use('Database')
const { validate } = use('Validator')

class CreateUser extends Command {
  static get signature() {
    return 'create:user'
  }

  static get description() {
    return 'Tell something helpful about this command'
  }

  async handle(args, options) {
    this.info('implementation for create:user command')

    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required'
    }

    const email = await this.ask('Enter Email')
    const password = await this.ask('Enter Password')

    const validation = await validate({ email, password }, rules)
    if (validation.fails()) {
      const validationData = validation.messages()
      if (validationData) {
        validationData.forEach(element => {
          this.warn(element.message)
        });
      }
    } else {
      let query = new User()
      query.role_id = 1
      query.email = email
      query.password = password
      const result = await query.save()
      if (result) {
        this.success('Created successfully')
      } else {
        this.error('Something went bad')
      }
    }

    Database.close()
  }
}

module.exports = CreateUser
