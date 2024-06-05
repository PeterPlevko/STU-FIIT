import axios from 'axios';

class UserService {
  setDnd (isDnd: boolean, userId: number) {
    axios.patch(`http://127.0.0.1:3333/setDnd/${userId}`, {
      isDnd: isDnd,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setOnline (isOnline: boolean, userId: number) {
    axios.patch(`http://127.0.0.1:3333/setOnline/${userId}`, {
      isOnline: isOnline,
    })
  }

  async addChannel (channelName: string, isPrivate: boolean, userId: number) {
    return axios.post('http://127.0.0.1:3333/addChannel', {
      channelName: channelName, isPrivate: isPrivate, userId: userId
    })
  }

}

export default new UserService()
