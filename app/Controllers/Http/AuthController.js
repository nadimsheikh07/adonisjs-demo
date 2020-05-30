'use strict'
const User = use('App/Models/User');
const Antl = use('Antl')
class AuthController {
    async register({ request, auth, response }) {
        const name = request.input("name")
        const email = request.input("email")
        const password = request.input("password")

        let query = new User()        
        query.name = name
        query.email = email
        query.password = password
        await query.save()
        
        return this.generateToken({ email, auth, response })
    }

    async login({ request, auth, response }) {
        const email = request.input("email")
        const password = request.input("password");
        if (await auth.attempt(email, password)) {
            return this.generateToken({ email, auth, response })
        } else {
            return response.status(404).send({ message: Antl.formatMessage('response.register_first') })
        }
    }
    
    async firebaseLogin({ request, auth, response }) {
        const email = request.input("email")
        const name = request.input("name")
        const mobile = request.input("mobile")

        let user = await User.findBy('email', email)
        
        if (!user) {
            let query = new User()
            query.name = name
            query.email = email
            query.mobile = mobile
            await query.save()
        }

        return this.generateToken({ email, auth, response })
    }

    async generateToken({ email, auth, response }) {
        const user = await User.findBy('email', email)
        const accessToken = await auth.generate(user)
        return response.status(200).send({
            message: Antl.formatMessage('response.login_success'),
            data: { "user": user, "access_token": accessToken }
        })
    }
}

module.exports = AuthController
