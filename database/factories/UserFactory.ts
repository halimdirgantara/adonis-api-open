import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Hash from '@ioc:Adonis/Core/Hash'

export default Factory.define(User, async ({ faker }) => {
  const plainPassword = 'password'
  const hashedPassword = await Hash.make(plainPassword)
  return {
    name: faker.person.fullName(),
    password: hashedPassword,
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
  }
}).build()
