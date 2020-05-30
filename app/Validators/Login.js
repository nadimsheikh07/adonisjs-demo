'use strict'

class Login {
  get rules() {
    return {
      email: 'required|email',
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

module.exports = Login
