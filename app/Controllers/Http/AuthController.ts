import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const validatedData = await request.validate(CreateUserValidator)

    // Create a new user
    const user = new User()
    user.fill(validatedData)
    await user.save()
    const token = await auth.use('api').generate(user)
    return response.status(201).json({ user, token })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const providedPassword = request.input('password')

    try {
      const token = await auth.attempt(email, providedPassword)
      return response.json({ token })
    } catch (error) {
      console.error('Authentication error:', error)
      return response.status(401).json({ error: 'Invalid credentials' })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    // Revoke the user's token to log them out
    await auth.logout()

    // Send a 204 response (No Content) to indicate a successful logout
    return response.status(204)
  }
}
