import { MutationTree } from 'vuex';
import { Channel, ExampleStateInterface } from './state';

const mutation: MutationTree<ExampleStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },
  updateChannels (state:ExampleStateInterface,  channel: Channel) {
    state.channels.push(channel);
  },
  updateIsOnline (state:ExampleStateInterface,  isOnline: true) {
    state.isOnline = isOnline;
  },
  updateUserName (state:ExampleStateInterface,  name: string) {
    state.userName = name;
  },
  updateDNDValue (state:ExampleStateInterface,  value: boolean) {
    state.DNDValue = value;
  },
  sortChannels (state:ExampleStateInterface) {
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
};

export default mutation;
