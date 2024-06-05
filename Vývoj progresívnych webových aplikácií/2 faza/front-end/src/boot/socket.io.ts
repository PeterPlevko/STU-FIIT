import { boot } from 'quasar/wrappers'
import { Manager } from 'socket.io-client'
import { SocketManager } from 'src/services/SocketManager'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $io: Manager
  }
}

// create socket.io manager
const io = SocketManager.createManager(process.env.API_URL)

export default boot((params) => {
  params.app.config.globalProperties.$io = io
  // boot socket manager here to allow to subscribe sockets to events and use store
  SocketManager.boot(params)
})

export { io }
