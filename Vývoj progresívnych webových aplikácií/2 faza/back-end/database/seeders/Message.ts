import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Message from 'App/Models/Message'

export default class MessageSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
      await Message.createMany([
        {
          user_id: 1,
          channel_id: 1,
          content: 'general',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ahoj Roman ako sa mas ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Ahoj Peter mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Mam sa dobre, co mas nove ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ja mam nove boty za 50 eur',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Frajerina',
        },
        // channel 1
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ahoj Roman ako sa mas ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Ahoj Peter mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Mam sa dobre, co mas nove ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ja mam nove boty za 50 eur',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Frajerina',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Ahoj Peter mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Mam sa dobre, co mas nove ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ja mam nove boty za 50 eur',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Frajerina',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Ahoj Peter mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Mam sa dobre, co mas nove ?',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
        },
        {
          user_id: 1,
          channel_id: 1,
          content: 'Ja mam nove boty za 50 eur',
        },
        {
          user_id: 2,
          channel_id: 1,
          content: 'Frajerina',
        },
        // channel 2 id 3 matej id 4 pirky
        {
          user_id: 3,
          channel_id: 3,
          content: 'Ahoj Martin ako sa mas ?',
        },
        {
          user_id: 4,
          channel_id: 3,
          content: 'Ahoj Matej mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
        },
        {
          user_id: 3,
          channel_id: 3,
          content: 'Mam sa dobre, co mas nove ?',
        },
        {
          user_id: 4,
          channel_id: 3,
          content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
        },
        {
          user_id: 3,
          channel_id: 3,
          content: 'Ja mam nove boty za 60 eur',
        },
        {
          user_id: 4,
          channel_id: 3,
          content: 'Velka frajerina',
        },
        // channel 3
        {
          user_id: 1,
          channel_id: 4,
          content: 'Moje meno je Peter.',
        },
        {
          user_id: 2,
          channel_id: 4,
          content: 'Moje meno je Roman',
        },
        {
          user_id: 3,
          channel_id: 4,
          content: 'Moje meno je Matej',
        },
        {
          user_id: 4,
          channel_id: 4,
          content: 'Moje meno je Martin',
        },
        {
          user_id: 1,
          channel_id: 4,
          content: 'Ja mam nove boty za 10 eur',
        },
        {
          user_id: 2,
          channel_id: 4,
          content: 'Ja mam nove boty za 20 eur',
        },
        {
          user_id: 3,
          channel_id: 4,
          content: 'Ja mam nove boty za 30 eur',
        },
        {
          user_id: 4,
          channel_id: 4,
          content: 'Ja mam nove boty za 40 eur',
        },
      ])
    }

  }


