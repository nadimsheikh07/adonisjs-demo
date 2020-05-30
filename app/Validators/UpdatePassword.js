'use strict'

class UpdatePassword {
  get rules() {
    return {
      password: 'required'
    }
  }
  get validateAll() {
    return true
  }
  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = UpdatePassword
