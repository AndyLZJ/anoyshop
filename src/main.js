import Vue from "vue";
import App from "./App";
import Heshop from "@heshop/heshop.uni";
import Vuex from "vuex";
import store from "./store";
import getters from "./store/getters";

import hView from "./libs/index.js";

import uniCopy from "./libs/function/uniCopy.js";
import utils from "./utils/index.js";
import zIndex from "./utils/zIndex";
import storageKey from "./utils/storageKey.js";
import leIcon from './colorui/components/le-icon.vue'
import resourceUrl from "./libs/function/resourceUrl";

import heImage from "./components/he-image.vue";

// #ifndef H5
import siteinfo from "siteInfo";
// #endif
// #ifdef H5
import VueLazyload from "vue-lazyload";
import WeChat from "./static/h5/js/wechat.js";
// #endif


Vue.component('he-image', heImage);
Vue.component('le-icon', leIcon);

Vue.use(hView);

Vue.use(Vuex);
// #ifdef H5
Vue.use(VueLazyload);
// #endif
Vue.config.productionTip = false;

App.mpType = 'app';

const AppURL = siteinfo.siteroot ? resourceUrl("entry/wxapp/yii", siteinfo) : siteinfo.AppURL;

let AppType = "weapp";
// #ifdef H5
AppType = "wechat";

Vue.prototype.$pageURL = siteinfo.siteroot ? resourceUrl("entry/wxapp/index", siteinfo, true) : siteinfo.AppURL;

// #endif

Vue.prototype.$heshop = Heshop.connect({
    AppURL: AppURL,
    AppName: "leadmall",
    AppType: AppType,
    AppID: "98c08c25f8136d590c",
    AppSecret: "3AYpU16dZ1CY7ejqvrE39B351vanLJVD",
    AppConfig: {
        loginReset: "/app/leadmall/reset",
    },
    redLoadFun: function() {
        Vue.prototype.$store.commit('apply/logout');
        uni.reLaunch({ url: '/pages/user/login' });
    },
    ErrorFun: function(error) {
        let status = error.response.status;
        if ([403, 401, 422].indexOf(status) == -1) {
            uni.showModal({
                title: '网络错误',
                cancelText: "复制错误",
                confirmText: "刷新页面",
                content: '网络开小差了,请刷新页面重试~',
                success: function(res) {
                    if (res.confirm) {
                        //#ifdef H5
                        location.reload();
                        //#endif
                        //#ifndef H5
                        let _page = getCurrentPages()[getCurrentPages().length - 1];
                        let _route = _page.route;
                        if (_page.options) {
                            let _q = "?";
                            for (let _k in _page.options) {
                                let _v = _page.options[_k];
                                _q += _k + "=" + _v + "&";
                            }
                            _route = _page.route + _q;
                        }
                        uni.reLaunch({ url: "/" + _route });
                        //#endif
                    } else if (res.cancel) {
                        uniCopy({ content: JSON.stringify(error.response.data) })
                    }
                }
            });
        }
    }
});

Vue.prototype.$utils = utils;
Vue.prototype.$zIndex = zIndex;
Vue.prototype.$storageKey = storageKey;

// #ifdef H5
Vue.prototype.$wechat = WeChat;
Vue.config.ignoredElements.push("wx-open-subscribe");
// #endif

const app = new Vue({
    store: Heshop.store(store, getters),
    router: Heshop.router({
        whiteList: [
            "/",
            "/pages/index/ad",
            "/pages/index/index",
            "/pages/other/error",
            "/pages/page/index",
            "/pages/goods/detail",
            "/pages/goods/search",
            "/pages/goods/search-list",
            "/pages/user/index",
            "/pages/categories/index",
            "/pages/goods/list",
            "/pages/goods/evaluation",
            "/pages/goods/search-list",
            "/pages/index/demo",
            "/pages/user/bind-phone",
            "/pages/other/logisticsCompany",
            "/pages/coupon/detail",
        ],
        loginPage: "/pages/user/login"
    }),
    ...App
});

// #ifdef H5
window.app = app;
// #endif
app.$mount()