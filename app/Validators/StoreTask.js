'use strict'

class StoreTask {
  get rules() {
    return {
      user_id: 'required',
      name: 'required',
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = StoreTask
