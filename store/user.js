import axios from "axios";

const baseUrl = 'http://localhost:8000/api/v1/auth/';

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
      Authorization:  payload.token
    };
    let url = baseUrl + 'user/'+payload.id;
    axios({
      method: 'put',
      headers: header,
      url: url,
      data: data
    });
  }
};
