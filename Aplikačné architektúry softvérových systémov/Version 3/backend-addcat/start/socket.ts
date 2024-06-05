import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  console.log('A new socket connection has been established')

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })
})
