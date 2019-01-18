import VueEcho from 'vue-echo'
import Vue from 'vue'
window.io = require('socket.io-client');
Vue.use(VueEcho, {
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  headers:{
    Authorization: 'Bearer c6f24bfb48724b2876097f714de5dc7f'
  }
});
