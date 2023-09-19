import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run() {
    // Create multiple user records using the UserFactory
    await UserFactory.createMany(10) // Adjust the number of users as needed
  }
}
