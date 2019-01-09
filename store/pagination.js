import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/auth/';
export const state = () => ({
  nextPageUrl: '',
  prevPageUrl: '',
  currentPage: '',
  totalPage: ''
});

export const mutations = {
  setNextPageUrl(state, url) {
    state.nextPageUrl = url;
  },
  setPrevPageUrl(state, url) {
    state.prevPageUrl = url;
  },
  setCurrentPage(state, value) {
    state.currentPage = value;
  },
  setTotalPage(state, value) {
    state.totalPage = value;
  }
};

export const actions = {
  async fetchPosts(context, payload) {
    let url = "http://localhost:8000/api/v1/auth/" + payload.userId + "/post?page=" + payload.page;
    let header = {
      Authorization: payload.token
    };
    let {data} = await axios({
      url: url,
      headers: header,
      method: 'get'
    });
    context.dispatch('setPageInfoAndPosts', data);
  },

  setPageInfoAndPosts(context, data) {
    context.commit('setCurrentPage', data.meta.current_page);
    context.commit('setNextPageUrl', data.links.next);
    context.commit('setPrevPageUrl', data.links.prev);
    context.commit('setTotalPage', data.meta.last_page);
    context.commit('posts/setPosts', data.data, {root: true});
  },

  async fetchNextOrPrev(context, payload) {
    let header = {
      Authorization: payload.token
    };
    let {data} = await axios({
      url: payload.url,
      method: 'get',
      headers: header
    });
    context.dispatch('setPageInfoAndPosts', data);
  },
  async fetchAllPosts(context, page) {
    let url = baseUrl + 'posts?' + 'page=' + page;
    let {data} = await axios({
      url: url,
      method: 'get'
    });
    context.dispatch('setPageInfoAndPosts', data);
  }
};
