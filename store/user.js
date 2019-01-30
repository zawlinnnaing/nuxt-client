import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/auth/';

export const state = () => ({
  other: {}
});

export const mutations = {
  setOther(state,data) {
    state.other = data
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
    let url = baseUrl + 'get_user/' + id;
    let {data} = await axios({
      method: 'get',
      url: url
    });
    context.commit('setOther', data);
  }
};
