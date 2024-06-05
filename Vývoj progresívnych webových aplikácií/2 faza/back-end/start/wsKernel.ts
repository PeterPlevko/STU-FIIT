/*
|--------------------------------------------------------------------------
| Websocket middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for websocket namespaces. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed on all the registered namespaces
|
*/
Ws.middleware.register([
  // () => import('App/Middleware/Auth')
])

Ws.middleware.register([() => import('App/Middleware/Auth')])
/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual namespaces. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Ws.namespace('chat').middleware('auth')
|
*/
Ws.middleware.registerNamed({
  // auth: () => import('App/Middleware/Auth')
})
