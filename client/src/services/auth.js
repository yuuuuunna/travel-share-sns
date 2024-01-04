import api from '.';

const API_URL = '/api/v1/auth';

const authAPI = {
  async signup(form) {
    return await api.post(API_URL + '/signup', form);
  },

  async login({ email, password }) {
    const res = await api.post(API_URL + '/login', { email, password });
    return res.data;
  },

  async logout() {
    return await api.post(API_URL + '/logout');
  },

  async getEmailVerifyCode({ email, type }) {
    return await api.post(API_URL + '/signup/auth-mail', { email, type });
  },

  async checkEmailVerifyCode({ email, authCode }) {
    return await api.post(API_URL + '/signup/check-mail', { email, authCode });
  },

  async getKakaoUserInfo() {
    return await api.get(API_URL + '/kakao/me');
  },

  async verify() {
    return await api.get(API_URL + '/me');
  },

  async changePassword({ email, password }) {
    return await api.post(API_URL + '/change-password', { email, password });
  },

  async kakaoUnlink() {
    return await api.post(API_URL + '/kakao/unlink');
  },

  async withdraw() {
    return await api.delete(API_URL + '/withdraw');
  },
};

export default authAPI;
