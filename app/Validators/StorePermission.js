'use strict'

class StorePermission {
  get rules() {
    const id = this.ctx.params.id
    if (id) {
      return {
        code: `required|unique:permissions,code,id,${id}`,
        details: 'required'
      }
    } else {
      return {
        code: `required|unique:permissions,code`,
        details: 'required'
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

module.exports = StorePermission
