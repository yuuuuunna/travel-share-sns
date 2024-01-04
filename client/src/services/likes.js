import api from '.';

const API_URL = '/api/v1/likes';

const likesAPI = {
  async getAllLikesByMe() {
    return await api.get(API_URL);
  },

  async postLike(userId, postId) {
    return await api.post(API_URL, { userId, postId });
  },

  async removeAll(payload) {
    return await api.patch(API_URL, payload);
  },
};

export default likesAPI;
