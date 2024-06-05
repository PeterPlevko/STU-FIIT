export interface ExampleStateInterface {
  channels: Channel[];
  isOnline: boolean;
  userName: string;
  DNDValue: boolean;
}

export interface Channel {
  id: number;
  name: string;
  isPrivate: boolean;
  isTopped: boolean;
}

function state(): ExampleStateInterface {
  return {
    channels: [
      {
        id: 1,
        name: 'Channel 1',
        isPrivate: false,
        isTopped: true,
      },
      {
        id: 2,
        name: 'Channel 2',
        isPrivate: true,
        isTopped: false,
      },
      {
        id: 3,
        name: 'Channel 3',
        isPrivate: false,
        isTopped: false,
      },
      {
        id: 4,
        name: 'Channel 4',
        isPrivate: false,
        isTopped: false,
      },
    ],
    isOnline: true,
    userName: 'Roman Palenik',
    DNDValue: true,
  };
}
export default state;
