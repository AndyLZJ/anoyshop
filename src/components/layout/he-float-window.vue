<template>
  <view v-if="showModal" :style="[bottomStyle]" class="he-float flex flex-direction align-end">
    <view v-if="isOpen && list.length >= 4" class="box flex flex-wrap">
      <template v-for="(item, index) in list">
        <!-- #ifdef H5 -->
        <he-open-launch-weapp :key="index" :username="item.link.param.wechat.appId" :path="item.link.param.wechat.path">
          <view class="item flex flex-direction align-center" :key="index">
            <image :src="item.img"></image>
            <view class="name">{{ item.name }}</view>
          </view>
        </he-open-launch-weapp>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view @click="handleCheck(item.link)" class="item flex flex-direction align-center" :key="index">
          <image :src="item.img"></image>
          <view class="name">{{ item.name }}</view>
        </view>
        <!-- #endif -->
      </template>
    </view>
    <template v-if="isOpen && list.length < 4">
      <view @click="handleCheck(item.link)" class="row-link" v-for="(item, index) in list" :key="index">
        <image :src="item.img"></image>
      </view>
    </template>
    <view class="open-close" v-if="list.length >= 3">
      <image @click="isOpen = !isOpen" :src="isOpen ? floatWindow.stowedState : floatWindow.expandedState" />
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    pagesUrl: {
      type: String,
      default: ''
    },
    bottom: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showModal: false,
      list: [],
      isOpen: false
    };
  },
  computed: {
    ...mapGetters('setting', {
      floatWindow: 'getFloatWindow'
    }),
    bottomStyle() {
      let style = {
        bottom: this.bottom + 48 + 'rpx'
      };
      return style;
    }
  },
  mounted() {
    const index = this.floatWindow.pages.findIndex(item => {
      return item === this.pagesUrl;
    });
    console.log(this.floatWindow);
    let platform = '';
    // #ifdef H5
    platform = 'wechat';
    // #endif
    // #ifdef MP-WEIXIN
    platform = 'applet';
    // #endif
    console.log(platform);
    const platformIndex = this.floatWindow.channel.findIndex(item => item === platform);
    console.log(platformIndex);
    this.showModal = index > -1 && this.floatWindow.status !== 0 && platformIndex > -1;
    if (this.floatWindow.status === 1) {
      this.floatWindow.button.forEach(item => {
        if (item === 'index') {
          this.list.push({
            img: this.floatWindow.buttonIcon.index,
            link: {
              extend: false,
              index: 0,
              path: '/pages/index/index'
            },
            name: '首页'
          });
        } else if (item === 'cart') {
          this.list.push({
            img: this.floatWindow.buttonIcon.cart,
            link: {
              extend: false,
              index: 4,
              path: '/pages/cart/index'
            },
            name: '购物车'
          });
        } else if (item === 'tell') {
          this.list.push({
            img: this.floatWindow.buttonIcon.tell,
            link: {},
            name: '联系客服'
          });
        } else if (item === 'personalCenter') {
          this.list.push({
            img: this.floatWindow.buttonIcon.personalCenter,
            link: {
              extend: false,
              index: 5,
              path: '/pages/user/index'
            },
            name: '个人中心'
          });
        } else if (item === 'toTop') {
          this.list.push({
            img: this.floatWindow.buttonIcon.toTop,
            link: {
              value: 'toTop'
            },
            name: '返回顶部'
          });
        } else if (item === 'backPage') {
          this.list.push({
            img: this.floatWindow.buttonIcon.backPage,
            link: {
              value: 'backPage'
            },
            name: '返回上页'
          });
        }
      });
    } else if (this.floatWindow.status === 2) {
      this.list = this.floatWindow.customize;
    }
    if (this.list.length < 3) {
      this.isOpen = true;
    }
  },
  methods: {
    handleCheck(item) {
      console.log(item);
      if (item.value === 'backPage') {
        uni.navigateBack({
          delta: 1
        });
      } else if (item.value === 'toTop') {
        wx.pageScrollTo({
          scrollTop: 0
        });
      } else {
        this.$h.MPageNavigate(item);
      }
    }
  },
  watch: {
    floatWindow: {
      handler(val) {
        console.log(val);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.he-float {
  position: fixed;
  z-index: 1000;
  bottom: 48px;
  right: 24px;
  .open-close {
    width: 88px;
    height: 88px;
  }
  image {
    width: 88px;
    height: 88px;
    display: block;
  }
  .row-link {
    margin-bottom: 16px;
  }
  .box {
    width: 424px;
    height: 362px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 40px;
    margin-bottom: 17px;
    padding: 32px 37px;
    .item {
      width: 96px;
      .name {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 15px;
      }
      &:not(:nth-child(3n)) {
        margin-right: 32px;
      }
    }
  }
}
</style>
