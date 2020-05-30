'use strict'
const Role = use('App/Models/Role');
const PermissionRole = use('App/Models/PermissionRole')
const Antl = use('Antl')
const Query = use('Query')
const searchInFields = [
    'name',
]
class RoleController {
    async index({ request, response }) {
        let page = 1;
        let pageSize = 5;

        if (request.input('page')) {
            page = request.input('page')
        }
        if (request.input('pageSize')) {
            pageSize = request.input('pageSize')
        }

        const search = request.input('search')
        const orderBy = request.input('orderBy')
        const orderDirection = request.input('orderDirection')
        const searchQuery = new Query(request, { order: 'id' })

        const query = Role.query()

        if (orderBy && orderDirection) {
            query.orderBy(`${orderBy}`, orderDirection)
        }

        if (search) {
            query.where(searchQuery.search(searchInFields))
        }

        if (request.input('filters')) {
            const filters = JSON.parse(request.input('filters'))
            filters.forEach(filter => {
                query.whereRaw(`${filter.name} LIKE '%${filter.value}%'`)
            })
        }

        const result = await query.paginate(page, pageSize)

        if (result) {
            return response.status(200).send(result)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Role" })
            })
        }
    }

    async storeRoles(id, request) {
        await PermissionRole
            .query()
            .where('role_id', id)
            .delete()

        if (request.input('permissions')) {
            var data = []
            const permissions = JSON.parse(request.input('permissions'))
            permissions.forEach(value => {
                data.push(
                    {
                        role_id: id,
                        permission_id: value,
                    }
                )
            })
            await PermissionRole.createMany(data)
        }
    }

    async store({ request, response }) {
        const query = new Role()
        if (query) {

            query.name = request.input('name')
            await query.save()
            this.storeRoles(query.id, request)
            return response.status(200).send({
                message: Antl.formatMessage('response.create_success', { name: "Role" })
            })

        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Role" })
            })
        }
    }

    async show({ params, response }) {
        const query = await Role.find(params.id)
        if (query) {
            const permissions = await query.permissions().ids()
            query.permissions = permissions
            return response.status(200).send(query)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Role" })
            })
        }
    }

    async update({ params, request, response }) {
        let query = await Role.find(params.id)
        if (query) {

            query.name = request.input('name')
            await query.save()
            this.storeRoles(query.id, request)
            return response.status(200).send({
                message: Antl.formatMessage('response.update_success', { name: "Role" })
            })
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Role" })
            })
        }
    }

    async destroy({ params, response }) {
        let query = await Role.find(params.id)
        if (query) {
            try {
                const result = await query.delete()
                if (result) {
                    return response.status(200).send({
                        message: Antl.formatMessage('response.delete_success', { name: "Role" })
                    })
                } else {
                    return response.status(500).send({
                        message: Antl.formatMessage('response.something_went_wrong')
                    })
                }
            } catch (error) {
                return response.status(500).send({
                    message: error
                })
            }
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Role" })
            })
        }
    }

}

module.exports = RoleController
