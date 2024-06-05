import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
  connected: false,
});

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3333';
export const socket = io(URL);

socket.on('connect', () => {
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});
