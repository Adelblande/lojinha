'use strict'

const User = use('App/Models/User')
const Role = use('Role')
class AuthController {
    /*Registrar um novo usuário*/
    async register({ request, response }) {
        const { name, surname, username, email, password } = request.all()
        const user = await User.create({ name, surname, username, email, password })
        const userRole = await Role.findBy('slug','client')
        await user.roles().attach([userRole.id])
        
        return response.status(201).send({ data: user })
    }
    /*Fazer Login com um usuário*/
    async login({ request, response, auth }) {
        const { email, password } = request.all()
        const user = await auth.withRefreshToken().attempt(email, password)

        return response.send({ data: user })
    }
    /*Atualizar Token*/
    async refresh({ request, response, auth }) {
        const { refresh_token } = request.all()
        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)

        return response.send({ data: user })
    }
    /*Deslogar um usuário*/
    async logout({ request, response, auth }) {
        const { refresh_token } = request.all()
        const loggedOut = await auth.authenticator('jwt').revokeTokens([refresh_token], true)

        return response.send({ msg: 'Usuário deslogado' })
    }
}

module.exports = AuthController
