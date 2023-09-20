import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    // Implement logic to fetch a list of users, e.g., from a database
    const users = await User.all()

    return response.json(users)
  }

  public async store({ request, response }: HttpContextContract) {
    // Validate the request data against the UserValidator
    const validatedData = await request.validate(CreateUserValidator)

    // Create a new user based on validated data
    const user = new User()
    user.fill(validatedData)

    // Save the user record to the database
    await user.save()

    return response.status(201).json(user)
  }

  public async show({ params, response }: HttpContextContract) {
    // Implement logic to fetch and display a single user by ID
    const userId = params.id
    const user = await User.findOrFail(userId)

    return response.json(user)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Implement logic to update a user based on data from the request
    const userId = params.id
    const user = await User.findOrFail(userId)

    const userData = request.only(['name', 'email', 'phone', 'address', 'avatar'])
    user.merge(userData)
    await user.save()

    return response.json(user)
  }

  public async destroy({ params, response }: HttpContextContract) {
    // Implement logic to delete a user by ID
    const userId = params.id
    const user = await User.findOrFail(userId)

    await user.delete()

    return response.status(204)
  }
}
