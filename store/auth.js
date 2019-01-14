export const getters = {
  loggedIn(state) {
    return state.loggedIn
  },
  user(state) {
    return state.user
  },
  isActive(state) {
    console.log(state.user.active);
    return state.user.active;
  },
};
