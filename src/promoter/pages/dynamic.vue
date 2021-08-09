<template>
  <view class="he-page-content" :data-theme="theme">
    <view :style="[navbarStyle]" class="he-navbar he-navbar-fixed">
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <view :style="[navbarInnerStyle]">1</view>
    </view>
  </view>
</template>

<script>
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
menuButtonInfo = uni.getMenuButtonBoundingClientRect();

export default {
  name: 'dynamic',
  props: {
    background: {
      type: Object,
      default() {
        return {
          background: '#ffffff'
        };
      }
    }
  },
  data() {
    return {
      menuButtonInfo: menuButtonInfo,
      statusBarHeight: systemInfo.statusBarHeight
    };
  },
  computed: {
    navbarStyle() {
      let style = {
        // return
      };
      Object.assign(style, this.background);
      return style;
    },
    navbarInnerStyle() {
      let style = {};
      style.height = this.navbarHeight + 'px';
      // #ifdef MP-WEIXIN
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
      style.marginRight = rightButtonWidth + 'px';
      style.paddingTop = menuButtonInfo.top - this.statusBarHeight + 'px';
      // #endif
      console.log(menuButtonInfo);
      return style;
    },
    navbarHeight() {
      // #ifdef H5
      return this.height ? this.height : 44;
      // #endif
      // #ifdef MP-WEIXIN
      let height = systemInfo.platform == 'ios' ? 44 : 48;
      return this.height ? this.height : height;
      // #endif
    }
  }
};
</script>

<style scoped lang="less">
@import '../main.less';
.he-navbar {
  width: 100%;
  .he-navbar-fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 991;
  }
}
</style>
