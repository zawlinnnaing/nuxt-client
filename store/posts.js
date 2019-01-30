import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/auth/';
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
    let url = baseUrl + 'post/' + payload.post_id;
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
  },

  async createPost(context, payload) {
    let url = baseUrl + payload.user_id + '/post';
    let header = {
      Authorization: payload.token
    };
    let data = {
      title: payload.title,
      body: payload.body
    };
    await axios({
      method: 'post',
      headers: header,
      data: data,
      url: url
    });
  },

  async updatePost(context, payload) {
    let url = baseUrl + payload.user_id + '/post/' + payload.post_id;
    let header = {
      Authorization: payload.token
    };
    let data = {
      title: payload.title,
      body: payload.body
    };
    await axios({
      method: 'put',
      url: url,
      headers: header,
      data: data
    });
  },

  async deletePost(context, payload) {
    let url = baseUrl + payload.user_id + '/post/' + payload.post_id;
    let header = {
      Authorization: payload.token
    };
    await axios({
      method: 'delete',
      headers: header,
      url: url
    });
  },

  async fetchGuestUserPosts(context,id) {
    let url = baseUrl + 'get_posts/' + id;
    let response = await axios({
      method: 'get',
      url: url
    });
    context.commit('setPosts',response.data.data);
  }
};
