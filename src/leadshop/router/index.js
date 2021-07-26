import Vue from 'vue';

const env = process.env.VUE_APP_PLATFORM;

import UniRouteGuards from './lib';

//加载vuex
import store from '../store';

Vue.use(UniRouteGuards);

const initRouter = (routerMap = {}, isCustom = false) => {
  const router = new UniRouteGuards();
  let whiteList = routerMap.whiteList || [];
  let loginPage = routerMap.loginPage || '';

  // 路由全局拦截器 在这里处理登录、授权等相关操作
  router.beforeEach((to, from, next) => {
    try {
      console.log('to', to);
      // 开启$store
      const $store = store();
      // 开启$Cloud
      const $heshop = router.app.$heshop;
      // 执行Token处理
      $store.commit('apply/getToken');
      // 自定义模式不加载默认
      if (whiteList.length === 0) {
        if (isCustom) {
          // 设置白名单
          whiteList = $heshop.AppConfig.whiteList || [];
        } else {
          // 设置白名单
          whiteList = DefaultWhite.concat($heshop.AppConfig.whiteList || []);
        }
      }
      if (loginPage) {
        //判断用户是否登陆
        if ($store.getters.token) {
          if (to.path == loginPage) {
            console.log('我已登录，执行跳转', 1);
            next('/');
          } else {
            console.log('我已登录，执行跳转', to);
            next();
          }
        } else {
          //处理白名单配置
          if (whiteList.includes(to.path)) {
            // 在免登录白名单，直接进入
            next();
          } else {
            let toPath = '/';
            if (to.path !== loginPage) {
              toPath = to.fullPath;
              next({
                path: loginPage,
                query: {
                  redirect: toPath
                },
                method: 'navigateTo'
              });
            } else {
              next();
            }
          }
        }
      } else {
        next();
      }
    } catch (error) {
      console.log('路由错误信息', error);
    }
  });

  // 路由后置拦截器
  router.afterEach(to => {
    // console.log("路由后置拦截器拦截", to)
  });

  // 路由跳转出错处理
  router.onError(function (e) {
    console.log('错误：', e.message || '路由跳转失败');
  });
};
export default initRouter;
