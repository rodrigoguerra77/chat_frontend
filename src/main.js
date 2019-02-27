import Vue from 'vue'
import App from './App.vue'
import router from './router';

import Vuex from 'vuex';
Vue.use(Vuex);
import VueSocketio from 'vue-socket.io';

import counterModule from '@/modules/counter';
import chatModule from '@/modules/chat';

const store = new Vuex.Store({
  state: {
    io: {}
  },
  mutations: {
    setSocket: (state, socket) => {
      state.io = socket;
      console.log("socket conectado");
    }
  },
  modules: {
    counterModule,
    chatModule
  }
});

//Vue.use(VueSocketio, 'http://localhost:5000/', store);

Vue.use(new VueSocketio({
  debug: true,
  connection: 'http://localhost:5000',
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  el: '#app',
  store,
  router,
  beforeCreate () {
    store.commit('setSocket', this.$socket);
  },
  render: h => h(App)
});
