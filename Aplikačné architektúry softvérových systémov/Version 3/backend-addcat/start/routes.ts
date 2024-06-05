import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/all/', 'BreedController.getBreeds')
}).prefix('breeds')

Route.group(() => {
  Route.post('/cats', 'Distributor.createTopicCheckCatName')
}).prefix('distributor')
