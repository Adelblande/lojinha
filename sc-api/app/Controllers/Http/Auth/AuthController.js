'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {
        const { name, surname, email, password } = request.all()
        const user = await User.create({ name, surname, email, password })
        return response.status(201).send({ data: user })
    }
}

module.exports = AuthController
