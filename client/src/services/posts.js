import api from '.';

const API_URL = '/api/v1/posts';

const postsAPI = {
  async getAllPosts({ tag, sort, city }) {
    return await api.get(API_URL, { params: { tag, sort, city } });
  },

  async getPostById(postId) {
    return await api.get(API_URL + `/${postId}`);
  },

  async getAllPostsByMe() {
    return await api.get(API_URL + '/my-page');
  },

  async addOne(payload) {
    return await api.post(API_URL, payload);
  },

  async removeOne(id) {
    return await api.delete(API_URL + `/${id}`);
  },

  async updateOne({ id, payload }) {
    return await api.put(API_URL + `/${id}`, payload);
  },
};

export default postsAPI;
