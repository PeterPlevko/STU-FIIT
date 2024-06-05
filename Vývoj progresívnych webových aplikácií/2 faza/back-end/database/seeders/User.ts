import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
      await User.createMany([
        {
          first_name: 'Peter',
          last_name: 'Plevko',
          email: 'pplevko@gmail.com',
          password: '123456789',
          nickname: 'kuntox',
          is_online: true,
          is_dnd: true,
        },
        {
          first_name: 'Roman',
          last_name: 'Palenik',
          email: 'roman.palenik3@gmail.com',
          password: '123456789',
          nickname: 'brzda',
          is_online: true,
          is_dnd: true,
        },
        {
          first_name: 'Matej',
          last_name: 'Delincak',
          email: 'matej.delincak@gmail.com',
          password: '123456789',
          nickname: 'morfex',
          is_online: true,
          is_dnd: true,
        },
        {
          first_name: 'Martin',
          last_name: 'Pirkovsky',
          email: 'm.pirkovsky@gmail.com',
          password: '123456789',
          nickname: 'pirky',
          is_online: true,
          is_dnd: true,
        },
        {
          first_name: 'Matej',
          last_name: 'Pirschel',
          email: 'matejpirschel1@gmail.com',
          password: '123456789',
          nickname: 'pirsch',
          is_online: true,
          is_dnd: true,
        },
      ])
    }

  }

