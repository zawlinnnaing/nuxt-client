import axios from 'axios'
import {empty} from "../.nuxt/utils";

const baseUrl = 'http://localhost:8000/api/v1/auth/';

export const state = () => ({
  comments: [],
  comment: {},
});

export const getters = {
  // duplicateComment: (state) => (id) => {
  //   state.comments.find((element) => {
  //     console.log('from duplicate getters');
  //     return element.id === id;
  //   })
  // }
};

export const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  prependComment(state, comment) {
    state.comments.unshift(comment);
  },

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
    let header = {
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
  },
  prependComment(context, comment) {
    // console.log('from actions');
    // let foundElement = context.getters.duplicateComment(comment.id);
    // console.log(foundElement);
    // if (foundElement === undefined || foundElement === null || foundElement === '') {
      context.commit('prependComment', comment);
    // }
  }
};
