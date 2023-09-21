import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, async ({ faker }) => {
  return {
    name: faker.person.fullName(),
    password: 'password',
    email: faker.internet.email(),
    phone: faker.phone.number('###########'),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
  }
}).build()
