import { MutationTree } from 'vuex';
import { Channel, ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  SET_CHANNELS (state, channels: Channel[]) {
    state.channels = channels
  },

  ADD_CHANNEL (state:ExampleStateInterface,  {channel, isTopped, channelState}: {channel: Channel, isTopped: boolean, channelState:string}) {
    channel.isTopped = isTopped
    channel.state = channelState
    state.channels.push(channel);
  },

  UPDATE_IS_ONLINE (state:ExampleStateInterface,  isOnline: true) {
    state.isOnline = isOnline;
  },

  UPDATE_NICKNAME (state:ExampleStateInterface,  nickname: string) {
    state.nickname = nickname;
  },

  UPDATE_IS_DND (state:ExampleStateInterface,  value: boolean) {
    state.isDnd = value;
  },

  SORT_CHANNELS (state:ExampleStateInterface) {
    state.channels.sort((a, b) => {
      if (a.isTopped && !b.isTopped) {
        return -1;
      }
      if (!a.isTopped && b.isTopped) {
        return 1;
      }
      return 0;
    });
  },

  UPDATE_ONLY_NOTIFICATION_ADDRESSED (state:ExampleStateInterface,  value: boolean) {
    state.OnlyNotificationAddressed = value;
  },

  REMOVE_CHANNEL (state, channelName) {
    state.channels = state.channels.filter(channel => channel.name !== channelName)
  },

  UPDATE_CHANNEL_IS_TOPPED (state, { channelName, isTopped }) {
    state.channels = state.channels.map(channel => {
      if (channel.name === channelName) {
        channel.isTopped = isTopped;
      }
      return channel;
    });
  },

  UPDATE_IS_TYPING (state, { channelName, senderNickname, message }) {
    if(state.isTyping[channelName] === undefined) {
      state.isTyping[channelName] = {};
    }
    state.isTyping[channelName][senderNickname] = message;
  },

  REMOVE_IS_TYPING (state, {channelName, senderNickname}) {
    if(state.isTyping[channelName]) {
      delete state.isTyping[channelName][senderNickname]
    }
    if (Object.keys(state.isTyping[channelName]).length === 0) {
      delete state.isTyping[channelName]
    }
  },

  changeChannelState(state, {channelName, channelState}) {
    state.channels = state.channels.map(channel => {
      if (channel.name === channelName) {
        channel.state = channelState;
      }
      return channel;
    });
  }
};

export default mutation;
