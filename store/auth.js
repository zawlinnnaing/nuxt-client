export const getters = {
  loggedIn(state) {
    return state.loggedIn
  },
  user(state) {
    return state.user
  },
  isActive(state) {
    return state.user.active;
  },
};

export const mutations = {
  increaseFollowers(state) {
    state.user.followers_count += 1;
  },
  decreaseFollowers(state) {
    state.user.followers_count -= 1;
  },
  increaseFollowed(state) {
    state.user.followed_count += 1;
  },
  decreaseFollowed(state) {
    state.user.followed_count -= 1;
  }
};
