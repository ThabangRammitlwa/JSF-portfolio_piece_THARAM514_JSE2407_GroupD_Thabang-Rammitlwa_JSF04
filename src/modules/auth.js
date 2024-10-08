import jwtDecode from 'vue-jwt-decode';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user ? state.user.name : '',
    userId: (state) => state.user ? state.user.userId : '',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('SET_TOKEN', token);
      const decodedToken = jwtDecode(token);
      commit('SET_USER', { userId: decodedToken.userId, name: decodedToken.userName });
    },
    logout({ commit }) {
      commit('CLEAR_TOKEN');
      commit('LOGOUT');
    },
  },
};


  
