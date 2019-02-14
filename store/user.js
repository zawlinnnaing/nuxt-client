import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/auth/';

export const state = () => ({
  other: {},
  /* note here that follower_id and followed_id are in perspective of logged in user . For example : if user follows 4 , then
  * follower_id in followers array will be 4 and followed_id will be user's id. While in other parts of the application , follower_ids and followed_ids
  * are in perspective of third person . (i.e  follower_id is user and followed_id is 4)
  */
  followers: [],
  followings: []
});

export const mutations = {
  setOther(state, data) {
    state.other = data
  },
  setFollowers(state, data) {
    state.followers = data
  },
  setFollowings(state, data) {
    state.followings = data
  },
  setFollow(state, id) {
    let data = state.followers.find((element) => {
      return element.follower_id === id
    });
    data.followed_by_user = true;
  },
  setFollowing(state, id) {
    let data = state.followings.find((element) => {
      return element.followed_id === id
    });
    data.followed_by_user = true;
  },
  setUnfollow(state, id) {
    let data = state.followers.find((element) => {
      return element.follower_id === id
    });
    data.followed_by_user = false;
  },
  setUnfollowing(state, id) {
    let data = state.followings.find((element) => {
      return element.followed_id === id
    });
    data.followed_by_user = false;
  }
};

export const actions = {
  testImageUpload(context, payload) {
    console.log(typeof payload.image);
    axios({
      method: 'post',
      url: baseUrl + 'post_image',
      data: payload
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  },

  updateProfile(context, payload) {
    let data = {
      name: payload.name,
      email: payload.email,
      image: payload.image
    };
    let header = {
      Authorization: payload.token
    };
    let url = baseUrl + 'user/' + payload.id;
    axios({
      method: 'put',
      headers: header,
      url: url,
      data: data
    });
  },

  async getUser(context, id) {
    console.log(id);
    let url = baseUrl + 'get_user/' + id;
    let {data} = await axios({
      method: 'get',
      url: url
    });
    context.commit('setOther', data);
  },

  async getFollowers(context, id) {
    let url = baseUrl + 'followers/' + id;
    console.log(url);
    let {data} = await axios({
      method: 'get',
      url: url
    });
    context.commit('setFollowers', data);
  },
  async getFollowing(context, id) {
    let url = baseUrl + 'following/' + id;
    let {data} = await axios({
      method: 'get',
      url: url
    });
    context.commit('setFollowings', data);
  },
  async follow(context, payload) {
    let url = baseUrl + 'follow/' + payload.follower_id + '/' + payload.followed_id;
    let header = {
      Authorization: payload.token
    };
    await axios({
      method: 'get',
      url: url,
      headers: header,
    });
  },
  async unfollow(context, payload) {
    let url = baseUrl + 'unfollow/' + payload.follower_id + '/' + payload.followed_id;
    let header = {
      Authorization: payload.token
    };
    await axios({
      method: 'get',
      url: url,
      headers: header,
    });
  }
};
