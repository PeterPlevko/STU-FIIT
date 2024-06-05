import Ws from '@ioc:Ruby184/Socket.IO/Ws'

Ws.namespace('/')
  .connected('ActivityController.onConnected')
  .disconnected('ActivityController.onDisconnected')

// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('channels/:name')
  // .middleware('channel') // check if user can join given channel
  .on('loadMessages', 'MessageController.loadMessages')
  .on('addMessage', 'MessageController.addMessage')
  .on('removeUserFromServerRequest', 'UserController.sendToServer')
  .on('inviteUserToChannelRequest', 'UserController.inviteUserToChannel')
  .on('notifyAboutCreationRequest', 'UserController.notifyAboutCreation')
  .on('kickUserFromChannelRequest', 'UserController.kickUserFromChannelRequest')
  .on('ownerQuitRequest', 'UserController.ownerQuitRequest')
  .on('revokeUserRequest', 'UserController.revokeUserRequest')
  .on('sendRTMessageRequest', 'MessageController.sendRTMessageRequest')
