'use strict'
const Task = use('App/Models/Task');
const Antl = use('Antl')
const Query = use('Query')
const searchInFields = [
    'name',
    'details'
]
class TaskController {

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
        const query = Task.query()

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
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }

    async store({ request, response }) {
        const query = new Task()
        if (query) {
            query.user_id = request.input('user_id')
            query.name = request.input('name')
            query.start_date = request.input('start_date')
            query.start_time = request.input('start_time')
            query.end_date = request.input('end_date')
            query.end_time = request.input('end_time')
            query.details = request.input('details')

            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.create_success', { name: "Task" })
            })

        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }

    async show({ params, response }) {
        const query = await Task.query().with('user').where('id', params.id).first()
        if (query) {
            return response.status(200).send(query)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }

    async update({ params, request, response }) {
        let query = await Task.find(params.id)
        if (query) {
            query.user_id = request.input('user_id')
            query.name = request.input('name')
            query.start_date = request.input('start_date')
            query.start_time = request.input('start_time')
            query.end_date = request.input('end_date')
            query.end_time = request.input('end_time')
            query.details = request.input('details')
            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.update_success', { name: "Task" })
            })
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }

    async destroy({ params, response }) {
        let query = await Task.find(params.id)
        if (query) {
            try {
                const result = await query.delete()
                if (result) {
                    return response.status(200).send({
                        message: Antl.formatMessage('response.delete_success', { name: "Task" })
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
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }

    async all({ request, response }) {
        const query = Task.query()

        if (request.input('user_id')) {
            query.where('user_id', request.input('user_id'))
        }
        const result = await query.fetch()
        if (result) {
            const data = {
                data: result
            }
            return response.status(200).send(data)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "Task" })
            })
        }
    }
}

module.exports = TaskController
