import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Channel from 'App/Models/Channel'
import User from 'App/Models/User'


export default class ChannelSeeder extends BaseSeeder {
  public async run () {
    const users = await User.all()

      users.sort((a, b) => a.id - b.id)

      let channels = await Channel.createMany([
        {
          name: 'general',
          is_private: false,
          creator_id: undefined,
        },
        {
          name: 'Channel 1',
          is_private: false,
          creator_id: 1,
        },
        {
          name: 'Channel 2',
          is_private: false,
          creator_id: 2,
        },
        {
          name: 'Channel 3',
          is_private: false,
          creator_id: 3,
        },
      ])

      // every one into general
          await users[0].related('channels').attach({
            [channels[0].id]: {
              user_id: users[0].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),

          await users[1].related('channels').attach({
            [channels[0].id]: {
              user_id: users[1].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),

          await users[2].related('channels').attach({
            [channels[0].id]: {
              user_id: users[2].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),

          await users[3].related('channels').attach({
            [channels[0].id]: {
              user_id: users[3].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),

        await users[4].related('channels').attach({
          [channels[0].id]: {
            user_id: users[4].id,
            kicked_number: 0,
            is_topped: true,
            kicked_by: '',
            state: 'accepted'
          },
        },
      ),
        // channel 1
        await users[0].related('channels').attach({
            [channels[1].id]: {
              user_id: users[0].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),
        await users[1].related('channels').attach({
            [channels[1].id]: {
              user_id: users[1].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
        // channel 2
        await users[2].related('channels').attach({
            [channels[2].id]: {
              user_id: users[2].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        ),
        await users[3].related('channels').attach({
            [channels[2].id]: {
              user_id: users[3].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
        // channel 3
        await users[0].related('channels').attach({
            [channels[3].id]: {
              user_id: users[0].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
        await users[1].related('channels').attach({
            [channels[3].id]: {
              user_id: users[1].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
        await users[2].related('channels').attach({
            [channels[3].id]: {
              user_id: users[2].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
        await users[3].related('channels').attach({
            [channels[3].id]: {
              user_id: users[3].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',

              state: 'accepted'
            },
          },
        )
          await users[4].related('channels').attach({
            [channels[3].id]: {
              user_id: users[4].id,
              kicked_number: 0,
              is_topped: true,
              kicked_by: '',
              state: 'accepted'
            },
          },
        )
    }
  }

