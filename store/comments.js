import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/v1/auth/';

export const state = () => ({
  comments: [],
  comment: {},
});

export const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  }
};

export const actions = {
  async fetchComments(context, payload) {
    let url = baseUrl + payload.post_id + '/comment';
    let header = {
      Authorization: payload.token
    };
    try {
      let {data} = await axios({
        method: 'get',
        url: url,
        headers: header
      });
      context.commit('setComments', data)
    } catch (e) {
      console.log(e.response.data);
    }
  },
  async postComment(context, payload) {
    let url = baseUrl + payload.post_id + '/comment';
    let header ={
      Authorization: payload.token,
    };
    await axios({
      method: 'post',
      url: url,
      headers: header,
      data: {
        description: payload.description,
        user_id: payload.user_id
      }
    })
  }
};
