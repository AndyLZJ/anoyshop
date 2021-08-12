import cache from '../code/cache.js';

const apply = {
  namespaced: true,
  state: {
    is_login: false,
    menus: [],
    userInfo: {},
    token: '',
    roles: '',
    showLoginModel: false
  },
  mutations: {
    login(state, provider) {
      if (provider) {
        console.log('获取用户信息', provider);
        state.is_login = true;
        state.token = provider.token || '';
        state.userInfo = provider;
      } else {
        state.token = '';
        state.is_login = false;
        state.userInfo = {};
      }
    },
    logout(state) {
      state.is_login = false;
      state.token = '';
      state.userInfo = {};
    },
    getToken(state) {
      let token = cache.get('token') || '';
      // console.log("查看Cookie中的Token",token)
      if (token) {
        state.is_login = true;
        state.token = token;
        state.userInfo = cache.get('userInfo');
      }
    },
    setMenu(state, provider) {
      state.menus = provider;
    },
    setLoginModel(state, data) {
      state.showLoginModel = data;
    }
  },
  actions: {
    layout({ commit }) {
      commit('logout');
    }
  }
};

export default apply;
