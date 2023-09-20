import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(6)]),
    phone: schema.string.optional({ trim: true }, [rules.minLength(9), rules.maxLength(20)]),
    address: schema.string.optional({ trim: true }),
    avatar: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'email.required': 'Email is required',
    'email.email': 'Invalid email format',
    'email.unique': 'Email already exists',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 6 characters long',
    'phone.minLength': 'Phone must be at least 9 characters long',
    'phone.maxLength': 'Phone must be at least 20 characters long',
  }
}
