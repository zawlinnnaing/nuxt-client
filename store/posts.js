export const state = () => ({
  posts: {},

  post: {}
});
export const mutations = {
  setPosts(state, data) {
    let current_page = data.meta.current_page;
    state.posts[current_page] = data.data;
  }
};
export const actions = {};

export const getters = {
  getPosts: (state) => (currentPage) => {
    return state.posts[currentPage];
  },
  hasPosts: (state) => (id) => {
    console.log(id in state.posts);
    return id in state.posts;
  }
};
