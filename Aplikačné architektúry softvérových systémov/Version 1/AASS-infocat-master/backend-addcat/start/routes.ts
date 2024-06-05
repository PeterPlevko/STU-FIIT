import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/', 'CatController.createCat')
}).prefix('cats')

Route.group(() => {
  Route.get('/all/', 'BreedController.getBreeds')
}).prefix('breeds')
