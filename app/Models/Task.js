'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const moment = require("moment");
class Task extends Model {

    static get dates() {
        return super.dates.concat(['start_date', 'end_date', 'start_time', 'end_time'])
    }

    static formatDates(field, value) {
        if (['start_date', 'end_date'].includes(field)) {
            return moment(value).format('MM-DD-YYYY')
        }
        if (['start_time', 'end_time'].includes(field)) {
            return moment(value).format('MM-DD-YYYY HH:mm:ss')
        }
        return super.formatDates(field, value)
    }

    static castDates(field, value) {
        if (['start_date', 'end_date'].includes(field)) {
            return moment(value).format('MM-DD-YYYY')
        }
        if (['start_time', 'end_time'].includes(field)) {
            return moment(value).format('MM-DD-YYYY HH:mm:ss')
        }
        return super.formatDates(field, value)
    }

    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Task
