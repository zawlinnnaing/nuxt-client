import axios from "axios";

export const state = () => ({
  posts: [],
  post: {}
});
export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setPost(state, post) {
    state.post = post;
  }
};
export const actions = {
  async fetchPost(context, payload) {
    console.log('userId :' + payload.user_id + 'postId: ' + payload.post_id);
    let url = 'http://localhost:8000/api/v1/auth/post/' + payload.post_id;
    let header = {
      Authorization: payload.token
    };
    try {
      let {data} = await axios({
        method: 'get',
        url: url,
        headers: header
      });
      context.commit('setPost', data);
    } catch (e) {
      console.log(e.response);
    }

  }
};
