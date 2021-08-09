const setting = {
  namespaced: true,
  state: {
    setting: {},
    location: {},
    sys: {},
    theme_color: 'red_theme', // red_theme purple_theme blue_theme green_theme orange_theme golden_theme
    tab_bar: {
      data: []
    },
    addressJson: [],
    subscribe: [],
    // 是否授权
    auth: false,
    isAuth: false
  },
  mutations: {
    setting(state, data) {
      state.setting = data;
    },
    setMenu(state, provider) {
      state.menus = provider;
    },
    setLocation(state, data) {
      state.location = data;
    },
    setSys(state, data) {
      state.sys = data;
    },
    theme(state, data) {
      state.theme_color = data;
    },
    tabBar: function (state, data) {
      state.tab_bar = data;
    },
    addressJson: function (state, data) {
      state.addressJson = data;
    },
    subscribe: function (state, data) {
      state.subscribe = data;
    },
    setAuth(state, data) {
      state.auth = data;
    },
    setIsAuth(state, data) {
      state.isAuth = data;
    }
  },
  getters: {
    storeSetting: function (state) {
      return state.setting.setting_collection && state.setting.setting_collection.store_setting;
    },
    goodsSetting: function (state) {
      return state.setting.setting_collection && state.setting.setting_collection.goods_setting;
    },
    tradeSetting: function (state) {
      return state.setting.setting_collection.trade_setting;
    },
    getLocation: function (state) {
      return state.location;
    },
    getPlatform: function (state) {
      return state.sys.platform;
    },
    getBasicSetting: function (state) {
      return state.setting.setting_collection && state.setting.setting_collection.basic_setting;
    },
    getTheme: function (state) {
      return state.theme_color;
    },
    getTabBar: function (state) {
      return state.tab_bar.data;
    },
    statusBarHeight: function (state) {
      return state.sys.statusBarHeight;
    },
    getNavBarHeight: function (state) {
      // #ifdef  H5
      return 44;
      // #endif
      // #ifndef H5
      return state.sys.platform === 'ios' ? 44 : 48;
      // #endif
    },
    addressJson: function (state) {
      return state.addressJson;
    },
    isProductsFeatured: function (state) {
      return state.setting.setting_collection.goods_setting.recommend_showpage.goodsinfo.value;
    },
    subscribe: function (state) {
      return state.subscribe;
    },
    getCartIndex: function (state) {
      let list = state.tab_bar.data;
      let index = -1;
      for (let i = 0; i < list.length; i++) {
        if (list[i].link.path === '/pages/cart/index') {
          index = i;
        }
      }
      return index;
    },
    getPicLimit: function (state) {
      let limit = state.setting.storage_limit.pic_limit;
      return limit * 1024 * 1024;
    },
    shareSetting: function (state) {
      return state.setting.setting_collection && state.setting.setting_collection.share_setting;
    },
    getSys: function (state) {
      return state.sys;
    },
    getOpeningad: function (state) {
      return state.setting.openingad;
    },
    // 获取分销设置
    getPromoter: function (state) {
      return state.setting.promoter_setting;
    },
    getCopyright(state) {
      return state.setting.copyright_information;
    }
  },
  actions: {
    getSetting: function ({ commit }) {
      let $heshop = this._vm.$heshop;
      let $storageKey = this._vm.$storageKey;
      if (uni.getStorageSync($storageKey.setting)) {
        commit('setting', uni.getStorageSync($storageKey.setting));
      }
      $heshop
        .setting('get')
        .then(function (res) {
          commit('setting', res);
          console.log(res);
          uni.setStorageSync($storageKey.setting, res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    resetting: function ({ dispatch }) {
      let $storageKey = this._vm.$storageKey;
      uni.removeStorageSync($storageKey.setting);
      dispatch('getSetting');
    },
    getLocation: function ({ commit }) {
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          commit('setLocation', res);
        }
      });
    },
    getSys: function ({ commit }) {
      uni.getSystemInfo({
        success: function (res) {
          commit('setSys', res);
        }
      });
    },
    getTheme: function ({ commit }) {
      let $heshop = this._vm.$heshop;
      let $storageKey = this._vm.$storageKey;
      if (uni.getStorageSync($storageKey.theme_color)) {
        commit('theme', uni.getStorageSync($storageKey.theme_color));
      } else {
        $heshop
          .fitment('post', {
            keyword: 'themeColor'
          })
          .then(function (res) {
            commit('theme', res.content);
            uni.setStorageSync($storageKey.theme_color, res.content);
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    },
    getTabBar: function ({ commit }) {
      return new Promise((resolve, reject) => {
        let $heshop = this._vm.$heshop;
        let $storageKey = this._vm.$storageKey;
        if (uni.getStorageSync($storageKey.tab_bar)) {
          commit('tabBar', uni.getStorageSync($storageKey.tab_bar));
          resolve();
        } else {
          $heshop
            .fitment('post', {
              keyword: 'tabbar'
            })
            .then(function (res) {
              let data = JSON.parse(res.content);
              commit('tabBar', data);
              uni.setStorageSync($storageKey.tab_bar, data);
              resolve();
            })
            .catch(function (err) {
              console.error(err);
              reject();
            });
        }
      });
    },
    getAddress: function ({ commit }) {
      let $heshop = this._vm.$heshop;
      let $storageKey = this._vm.$storageKey;
      if (uni.getStorageSync($storageKey.address_json)) {
        commit('addressJson', uni.getStorageSync($storageKey.address_json));
      } else {
        $heshop
          .search(
            'post',
            { include: 'setting' },
            {
              keyword: 'addressjson',
              content_key: ''
            }
          )
          .then(function (res) {
            commit('addressJson', res);
            uni.setStorageSync($storageKey.address_json, res);
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    },
    subscribe: function ({ commit }) {
      let $heshop = this._vm.$heshop;
      $heshop.subscribe('get').then(function (response) {
        console.log('response-subscribe', response);
        commit('subscribe', response);
      });
    },
    getAuth({ commit }) {
      let $heshop = this._vm.$heshop;
      $heshop.cloud('get').then(response => {
        console.log(response);
        commit('setAuth', response);
        commit('setIsAuth', true);
      });
    }
  }
};

export default setting;
