import api from '.';

const API_URL = '/api/v1/users';

const userAPI = {
  async checkEmail({ email }) {
    return await api.post(API_URL + '/check/email', { email });
  },

  async checkNickname({ nickname }) {
    return await api.post(API_URL + '/check/nickname', { nickname });
  },

  async userInfoModify(formData) {
    return await api.put(API_URL + '/', formData);
  },
};

export default userAPI;
