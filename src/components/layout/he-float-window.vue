<template>
  <view v-if="showModal" :style="[bottomStyle]" class="he-float flex flex-direction align-end" @click.stop.prevent="() => {}">
    <view v-if="isOpen && list.length >= 4" class="box flex flex-wrap">
      <template v-for="(item, index) in list">
        <!-- #ifdef H5 -->
        <he-open-launch-weapp :key="index" v-if="item.index === 11" :username="item.link.param.wechat.appId"
                              :path="item.link.param.wechat.path">
          <view class="item flex flex-direction align-center" :key="index">
            <image :src="item.img"></image>
            <view class="name">{{ item.name }}</view>
          </view>
        </he-open-launch-weapp>
        <view @click.stop="handleCheck(item.link)" v-else-if="item.link.value === 'tell'" class="item flex flex-direction align-center" :key="index">
          <image :src="item.img"></image>
          <view class="name">{{ item.name }}</view>
        </view>
        <view @click.stop="handleCheck(item.link)" v-else class="item flex flex-direction align-center" :key="index">
          <image :src="item.img"></image>
          <view class="name">{{ item.name }}</view>
        </view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view v-if="item.link.value === 'tell'" class="item flex flex-direction align-center" :key="index">
          <image :src="item.img"></image>
          <view class="name">{{ item.name }}</view>
          <button open-type="contact" class="cu-btn button"></button>
        </view>
        <view v-else @click.stop="handleCheck(item.link)" class="item flex flex-direction align-center" :key="index">
          <image :src="item.img"></image>
          <view class="name">{{ item.name }}</view>
        </view>
        <!-- #endif -->
      </template>
    </view>
    <template v-if="isOpen && list.length < 4">
      <view @click.stop="handleCheck(item.link)" class="row-link" v-for="(item, index) in list" :key="index">
        <image :src="item.img"></image>
      </view>
    </template>
    <view class="open-close" v-if="list.length >= 3">
      <image @click="setOpen()" :src="isOpen ? floatWindow.stowedState : floatWindow.expandedState"/>
    </view>
  </view>
</template>

<script>
//#ifdef H5
import heOpenLaunchWeapp from './../he-open-launch-weapp.vue';
//#endif
import {mapGetters} from 'vuex';

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
  //#ifdef H5
  components: {
    heOpenLaunchWeapp
  },
  //#endif
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
        bottom: this.bottom + 148 + 'rpx'
      };
      return style;
    }
  },
  mounted() {
    const index = this.floatWindow.pages.findIndex(item => {
      return item === this.pagesUrl;
    });
    let platform = '';
    // #ifdef H5
    platform = 'wechat';
    // #endif
    // #ifdef MP-WEIXIN
    platform = 'applet';
    // #endif
    const platformIndex = this.floatWindow.channel.findIndex(item => item === platform);
    this.showModal = index > -1 && this.floatWindow.status !== 0 && platformIndex > -1;
    if (this.floatWindow.status === 1) {
      this.floatWindow.button.forEach(item => {
        if (item === 'index' && this.pagesUrl !== 'index') {
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
            link: {
              value: 'tell'
            },
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
        } else if (item === 'backPage' && this.pagesUrl !== 'index') {
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
      if (item.value === 'backPage') {
        if (getCurrentPages().length > 1) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
          });
          uni.navigateBack({
            delta: 1,
          });
        }
      } else if (item.value === 'toTop') {
        wx.pageScrollTo({
          scrollTop: 0
        });
      } else if (item.value === 'tell') {
        uni.makePhoneCall({
          phoneNumber: this.storeSetting.contact.phone.value
        });
      } else {
        this.$h.MPageNavigate(item);
      }
    },
    setOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.he-float {
  position: fixed;
  z-index: 1000;
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
      position: relative;
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

.button {
  background: transparent;
  padding: 0;
  margin-left: 0;
  border: none;
  outline: none;
  line-height: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

