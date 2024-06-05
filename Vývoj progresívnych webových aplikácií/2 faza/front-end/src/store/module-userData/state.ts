export interface ExampleStateInterface {
  channels: Channel[];
  isOnline: boolean;
  nickname: string;
  isDnd: boolean;
  OnlyNotificationAddressed: boolean;
  isTyping:  { [channelName:string]: {[senderNickname: string]: string[]} } ;
}

export interface Channel {
  state: string;
  id: number;
  name: string;
  isPrivate: boolean;
  isTopped: boolean;
  creatorId: number;
}

export interface IsTyping {
  senderNickname: string;
  message:string;
}

function state(): ExampleStateInterface {
  return {
    channels: [],
    isOnline: true,
    isDnd: true,
    nickname: '',
    OnlyNotificationAddressed: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isTyping: [] as any,
  };
}
export default state;

