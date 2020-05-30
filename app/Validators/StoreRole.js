'use strict'

class StoreRole {
  get rules() {
    const id = this.ctx.params.id
    if (id) {
      return {
        name: `required|unique:roles,name,id,${id}`,
      }
    } else {
      return {
        name: `required|unique:roles,name`,
      }
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = StoreRole
