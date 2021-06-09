<!--
 * @Description: 
 * @Author: fjt
 * @Date: 2021-05-24 13:22:32
 * @LastEditTime: 2021-06-08 15:55:01
 * @LastEditors: fjt
-->
<script>
export default {
  globalData: {},
  onLaunch: function () {
    return new Promise(() => {
      let _this = this;
      // #ifdef H5
      _this.$h.setTabBarItem();
      _this.$wechat.init();
      // #endif
      // 获取设备设置
      this.$store.dispatch("setting/getSys");
      this.$store.dispatch("setting/getTabBar").then(function () {
        let index = _this.$store.getters["setting/getCartIndex"];
        let is_login = uni.getStorageSync("token");
        if (is_login) {
          _this.$store.dispatch("cart/getCartNumber").then((response) => {
            if (response !== 0) {
              uni.setTabBarBadge({
                index: index,
                text: response + "",
              });
            } else {
              uni.removeTabBarBadge({
                index: index,
              });
            }
          });
        }
      });
      this.$store.dispatch("setting/subscribe");
    });
  },
  onShow: function () {
    this.$store.dispatch("user/visit");
    // 获取商城设置
    this.$store.dispatch("setting/getSetting");
    // 获取主题色
    this.$store.dispatch("setting/getTheme");
    // #ifndef H5
    this.$store.dispatch("user/authLogin");
    // #endif
  },
  onHide: function () {},
};
</script>
<style lang="scss">
@import "colorui/main.css";
@import "colorui/icon.css";
@import "static/css/index.css";
@import "static/css/icon.css";

// #ifdef H5
uni-page-head {
  display: none;
}

uni-toast {
  z-index: 10078 !important;
}

uni-modal {
  z-index: 10078 !important;
}
// #endif
</style>