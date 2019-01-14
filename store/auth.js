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
