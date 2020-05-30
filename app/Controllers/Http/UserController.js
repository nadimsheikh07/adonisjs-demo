'use strict'
const User = use('App/Models/User');
const Antl = use('Antl')
const Query = use('Query')
const searchInFields = [
    'name',
    'mobile',
    'email',
]
class UserController {
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
        const query = User.query()

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
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }

    async store({ request, response }) {
        const query = new User()
        if (query) {

            query.role_id = request.input('role_id')
            query.name = request.input('name')
            query.mobile = request.input('mobile')
            query.email = request.input('email')
            query.dob = request.input('dob')
            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.create_success', { name: "User" })
            })

        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }

    async show({ params, response }) {
        const query = await User.query().with('tasks').where('id', params.id).first()
        if (query) {
            return response.status(200).send(query)
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }

    async update({ params, request, response }) {
        let query = await User.find(params.id)
        if (query) {
            query.role_id = request.input('role_id')
            query.name = request.input('name')
            query.mobile = request.input('mobile')
            query.email = request.input('email')
            query.dob = request.input('dob')
            await query.save()
            return response.status(200).send({
                message: Antl.formatMessage('response.update_success', { name: "User" })
            })
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }

    async destroy({ params, response }) {
        let query = await User.find(params.id)
        if (query) {
            try {
                let total = await User.getCount()
                if (total == 1) {
                    return response.status(500).send({
                        message: Antl.formatMessage('response.user_delete_error', { name: `${query.name}(${query.email})` })
                    })
                }
                const result = await query.delete()
                if (result) {
                    return response.status(200).send({
                        message: Antl.formatMessage('response.delete_success', { name: "User" })
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
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }

    async changePassword({ params, request, response }) {
        let query = await User.find(params.id)
        if (query) {
            query.password = request.input('password')
            const result = await query.save()
            if (result) {
                return response.status(200).send({
                    message: Antl.formatMessage('response.password_update_success', { name: "User" })
                })
            } else {
                return response.status(500).send({
                    message: Antl.formatMessage('response.something_went_wrong')
                })
            }
        } else {
            return response.status(404).send({
                message: Antl.formatMessage('response.not_found', { name: "User" })
            })
        }
    }
}

module.exports = UserController
