'use strict'
const Permission = use('App/Models/Permission');
const Antl = use('Antl')
const Query = use('Query')
const searchInFields = [
    'code',
    'details',
]
class PermissionController {
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

        const query = Permission.query()

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
                message: Antl.formatMessage('response.not_found', { name: "Permission" })
            })
        }
    }

    async store({ request, response }) {
        const query = new Permission()
        if (query) {

            query.code = request.input('code')
            query.details = request.input('details')
            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.create_success', { name: "Permission" })
            })

        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Permission" })
            })
        }
    }

    async show({ params, response }) {
        const query = await Permission.query().where('id', params.id).first()
        if (query) {
            return response.status(200).send(query)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Permission" })
            })
        }
    }

    async update({ params, request, response }) {
        let query = await Permission.find(params.id)
        if (query) {

            query.code = request.input('code')
            query.details = request.input('details')
            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.update_success', { name: "Permission" })
            })
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Permission" })
            })
        }
    }

    async destroy({ params, response }) {
        let query = await Permission.find(params.id)
        if (query) {
            try {
                const result = await query.delete()
                if (result) {
                    return response.status(200).send({
                        message: Antl.formatMessage('response.delete_success', { name: "Permission" })
                    })
                }
            } catch (error) {
                return response.status(500).send({
                    message: error
                })
            }
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Permission" })
            })
        }
    }

}

module.exports = PermissionController
