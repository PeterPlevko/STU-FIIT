import { User } from 'src/contracts'
import { authManager } from '.'
import { SocketManager } from './SocketManager'

class ActivitySocketManager extends SocketManager {
  public subscribe (): void {
    this.socket.on('user:list', (onlineUsers: User[]) => {
      console.log('Online users list', onlineUsers)
    })

    this.socket.on('user:online', (user: User) => {
      console.log('User is online', user)
    })

    this.socket.on('user:offline', (user: User) => {
      console.log('User is offline', user)
    })

    authManager.onChange((token) => {
      if (token) {
        this.socket.connect()
      } else {
        this.socket.disconnect()
      }
    })
  }
}

export default new ActivitySocketManager('/')
