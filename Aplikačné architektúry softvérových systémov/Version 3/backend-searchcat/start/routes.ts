import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/:id', 'CatController.getCat')
  Route.put('/:id', 'CatController.updateCat')
  Route.delete('/:id', 'CatController.deleteCat')
  Route.post('/all', 'CatController.getCats')
}).prefix('cats')
