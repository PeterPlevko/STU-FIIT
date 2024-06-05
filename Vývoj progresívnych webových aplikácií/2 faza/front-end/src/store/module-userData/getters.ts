import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';

const getters: GetterTree<ExampleStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  },
  channelExists(context,channelName:string){
      if(context.channels.find(c => c.name === channelName)){
        return true
      }
      else{
        return false
      }

    },
};

export default getters;
