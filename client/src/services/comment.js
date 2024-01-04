import api from '.';

const API_URL = '/api/v1/comments';

const commentAPI = {
  async getAllCommentsByMe() {
    return await api.get(API_URL + '/mine');
  },
  async getAllCommentByPost(postId) {
    return await api.get(API_URL + `?postId=${postId}`);
  },
  // 댓글, 대댓글 post
  async postComment({ parentComment, postId, content }) {
    const payload = parentComment ? { parentComment, postId, content } : { postId, content };
    return await api.post(API_URL, payload);
  },

  //댓글 수정
  async updateComment({ commentId, content }) {
    return await api.patch(API_URL + `/${commentId}`, { content });
  },
  // 대댓글 수정
  async updateReply({ commentId, content }) {
    return await api.patch(API_URL + `/reply/${commentId}`, { content });
  },

  //댓글 삭제
  async removeOne({ id }) {
    return await api.delete(API_URL + `/${id}`);
  },
  // 대댓글 삭제
  async removeReply({ id }) {
    return await api.delete(API_URL + `/reply/${id}`);
  },
};

export default commentAPI;
