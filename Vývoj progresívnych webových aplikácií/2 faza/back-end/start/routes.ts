/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('auth')

Route.post('getAllChannels', 'ChannelController.getAllChannels')

Route.patch('setDnd/:id', 'UsersController.setDnd')

Route.patch('setOnline/:id', 'UsersController.setOnline')

Route.post('addChannel', 'ChannelController.addChannel')

Route.get('getAllUsersFromCurrentChannel/:id', 'ChannelController.getAllUsersFromCurrentChannel')

Route.delete('removeUserFromChannel/:id', 'ChannelController.removeUserFromChannel')

Route.post('createOrJoinChannel', 'ChannelController.createOrJoinChannel')

Route.get('getAllNotBannedChannels/:id', 'ChannelController.getAllNotBannedChannels')

Route.post('setNotTopped', 'ChannelController.setNotTopped')

Route.post('acceptInvite', 'ChannelController.acceptInvite')

Route.post('declineInvite', 'ChannelController.declineInvite')
