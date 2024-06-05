import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/names/:character', 'CatController.getCatNamesByAlphabet')
}).prefix('cats')
