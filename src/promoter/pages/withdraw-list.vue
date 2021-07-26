<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-search">
      <view class="he-search--tabs flex" id="he-tab">
        <view class="flex-sub align-center flex justify-center" @tap="clickTab(0)">
          <text id="he-tab-item-0" :style="[tabItemStyle(0)]">全部</text>
        </view>
        <view class="flex-sub align-center flex justify-center" @tap="clickTab(1)">
          <text id="he-tab-item-1" :style="[tabItemStyle(1)]">待审核</text>
        </view>
        <view class="flex-sub align-center flex justify-center" @tap="clickTab(2)">
          <text id="he-tab-item-2" :style="[tabItemStyle(2)]">待打款</text>
        </view>
        <view class="flex-sub align-center flex justify-center" @tap="clickTab(3)">
          <text id="he-tab-item-3" :style="[tabItemStyle(3)]">已打款</text>
        </view>
        <view class="flex-sub align-center flex justify-center" @tap="clickTab(4)">
          <text id="he-tab-item-4" :style="[tabItemStyle(4)]">已拒绝</text>
        </view>
        <view class="he-tab--bar" :style="[tabBarStyle]"></view>
      </view>
    </view>
    <view class="he-time flex align-center justify-center" @click="isShowTime = !isShowTime">
      <text>2021年5月</text>
      <text class="iconfont iconarrow-down" :style="[arrowStyle]"></text>
    </view>
    <view v-for="item in 30" class="le-order--item">
      <view class="flex justify-between le-item--body">
        <view class="le-item--left flex flex-direction justify-between">
          <view class="le-title">自动到账微信零钱</view>
          <view class="le-assist">
            <view>支付宝账号：13520251021</view>
            <view>2021-05-28 10:35:28</view>
          </view>
        </view>
        <view class="le-item--right flex flex-direction align-end">
          <view class="le-sign">待审核</view>
          <view class="le-price">￥200.00</view>
          <view class="le-handling-free">手续费￥2.00</view>
        </view>
      </view>
      <view class="le-item--footer">
        拒绝理由：不支持银行打款不支持银行打款不支持银行打款不 支持银行打款不支持银行打款不支持银行打款
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'withdraw-list',
  data() {
    return {
      scrollBarLeft: 0,
      tabQueryInfo: null,
      currentIndex: 0,
      tabWidth: 0,
      parentLeft: 0,
      barFirstTimeMove: true,
      isShowTime: false
    };
  },
  computed: {
    tabBarStyle({ tabWidth, barFirstTimeMove, scrollBarLeft }) {
      return {
        width: `${tabWidth}px`,
        transform: `translate(${scrollBarLeft}px, -100%)`,
        'transition-duration': `${barFirstTimeMove ? 0 : '0.5s'}`
      };
    },
    tabItemStyle({ themeColor, currentIndex }) {
      return index => {
        let style = {
          'transition-duration': '0.5s'
        };
        if (index === currentIndex) {
          style.color = themeColor;
        }
        return style;
      };
    },
    arrowStyle({ isShowTime }) {
      let style = {};
      if (isShowTime) {
        style.transform = 'rotate(180deg)';
      }
      return style;
    }
  },
  methods: {
    async init() {
      let tabRect = await this.$hGetRect('#he-tab');
      this.parentLeft = tabRect.left;
      this.getTabRect();
    },
    clickTab(index) {
      this.currentIndex = index;
      this.scrollByIndex();
    },
    // 查询tab的布局信息
    getTabRect() {
      let query = uni.createSelectorQuery().in(this);
      for (let i = 0; i < 5; i++) {
        query.select(`#he-tab-item-${i}`).fields({
          size: true,
          rect: true
        });
      }
      query.exec(
        function (res) {
          this.tabQueryInfo = res;
          this.scrollByIndex();
        }.bind(this)
      );
    },
    scrollByIndex() {
      let tabInfo = this.tabQueryInfo[this.currentIndex];
      if (!tabInfo) return;
      this.tabWidth = tabInfo.width;
      let left = tabInfo.left + tabInfo.width / 2 - this.parentLeft;
      this.scrollBarLeft = left - this.tabWidth / 2;
      if (this.barFirstTimeMove === true) {
        setTimeout(() => {
          this.barFirstTimeMove = false;
        }, 100);
      }
    }
  },
  onLoad() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
@import '../main.less';

.he-page-content {
  padding: 0 20px;
}
.he-search {
  background-color: #f5f5f5;
  width: 750px;
  padding: 20px 0 0 0;
  position: sticky;
  top: 0;
}
.he-search--tabs {
  width: 710px;
  height: 96px;
  background: #ffffff;
  border-radius: 16px;
  position: relative;
}
.he-tab--bar {
  position: absolute;
  bottom: 0;
  height: 4px;
  @include background_color('background_color');
}
.he-time {
  margin: 24px 0;
  width: 710px;
  height: 56px;
  font-size: 28px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #999999;
  .iconarrow-down {
    font-size: 20px;
    margin-left: 8px;
    transition-duration: 0.2s;
  }
}
.le-order--item {
  padding: 24px;
  border-radius: 8px;
  background: #ffffff;
  margin-bottom: 16px;
}
.le-item--body {
  .le-title {
    font-size: 32px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 56px;
  }
  .le-assist {
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #999999;
    > view {
      line-height: 32px;
    }
  }
}
.le-item--right {
  .le-sign {
    width: 94px;
    border: 1px solid #e60b30;
    border-radius: 16px;
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #e60b30;
    line-height: 32px;
    padding: 0 10px;
  }
  .le-price {
    font-size: 36px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 48px;
  }
  .le-handling-free {
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #999999;
    line-height: 32px;
  }
}
.le-item--footer {
  border-top: 1px solid #e5e5e5;
  font-size: 24px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #999999;
  line-height: 32px;
  padding-top: 15px;
  margin-top: 15px;
}
</style>
