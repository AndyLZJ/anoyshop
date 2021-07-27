<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-search">
      <view class="flex he-switch">
        <view class="flex-sub" :class="{ active: searchNum === 0 }" @click="switchTime(0)">全部</view>
        <view class="flex-sub" :class="{ active: searchNum === 1 }" @click="switchTime(1)">今日</view>
        <view class="flex-sub" :class="{ active: searchNum === 2 }" @click="switchTime(2)">昨日</view>
        <view class="flex-sub" :class="{ active: searchNum === 3 }" @click="switchTime(3)">本月</view>
      </view>
      <button class="cu-btn he-customize flex align-center justify-between" @click="routerTimePeriod">
        <text>自定义</text>
        <text class="iconfont iconbtn_arrow"></text>
      </button>
    </view>
    <view class="he-body">
      <view class="he-order--total">共4笔订单</view>
      <view class="flex justify-between he-total">
        <view class="he-price--total">
          <text class="he-label">待结算佣金</text>
          <text class="he-value">￥36.00</text>
        </view>
        <view class="he-price--total">
          <text class="he-label">已结算佣金</text>
          <text class="he-value">￥72.00</text>
        </view>
      </view>
      <view class="he-order--item he-card" v-for="item in 30">
        <view class="flex justify-between align-start">
          <view class="flex flex-direction">
            <view class="he-user flex align-center">
              <he-image
                :image-style="{
                  borderRadius: '50%'
                }"
                width="48"
                height="48"
                src=""
              ></he-image>
              <text class="he-user--name">周方方</text>
            </view>
            <text class="he-order--sn">订单号:osn265463213611</text>
          </view>
          <view class="he-sign"> 待结算 </view>
        </view>
        <view class="he-item--footer flex justify-between">
          <view class="he-item--price">
            <text class="he-label">商品金额:</text>
            <text class="he-value">￥180.00</text>
          </view>
          <view class="he-item--price">
            <text class="he-label">商品佣金:</text>
            <text class="he-value">￥18.00</text>
          </view>
        </view>
      </view>
    </view>
    <he-load-more v-if="list.length > 0" :status="loadStatus"></he-load-more>
    <he-no-content-yet
      v-if="isNothing"
      :image="ipAddress + '/order-background-empty.png'"
      text="暂无相关订单"
    ></he-no-content-yet>
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script>
import heLoadMore from './../../components/he-load-more.vue';
import heNoContentYet from './../../components/he-no-content-yet.vue';

export default {
  name: 'order',
  components: {
    heLoadMore,
    heNoContentYet
  },
  data() {
    return {
      searchNum: 0,
      loadStatus: 'loadmore',
      list: [{}],
      isNothing: true
    };
  },
  methods: {
    switchTime(num) {
      this.searchNum = num;
    },
    // 跳转到时间选择
    routerTimePeriod() {
      uni.navigateTo({
        url: '/pages/other/time-period'
      });
    }
  },
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
@import '../main.less';

.he-search {
  width: 750px;
  height: 244px;
  background: #ffffff;
  border-radius: 0 0 32px 32px;
  position: sticky;
  padding: 32px;
  top: 0;
  z-index: 10;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.04);
  .he-switch {
    height: 80px;
    .flex-sub {
      border-radius: 8px;
      background: #f5f5f5;
      line-height: 80px;
      text-align: center;
      font-size: 28px;
      @extend .font-family-sc;
      color: #262626;
      font-weight: 500;
      &:not(:last-child) {
        margin-right: 18px;
      }
      &.active {
        @include background_color('opacify_background_0');
        @include font_color('font_color');
      }
    }
  }
  .he-customize {
    height: 80px;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 26px 24px 26px 28px;
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #262626;
    margin-top: 20px;
    .iconbtn_arrow {
      font-size: 20px;
      color: #bebebe;
    }
  }
}

.he-body {
  padding: 0 20px;
}
.he-order--total {
  font-size: 28px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #999999;
  line-height: 48px;
  margin: 32px 12px 0 12px;
}
.he-total {
  padding: 0 12px;
  margin-bottom: 24px;
  .he-price--total:last-child {
    margin-right: 15px;
  }
}

.he-price--total {
  font-size: 28px;
  @extend .font-family-sc;
  font-weight: 500;
  line-height: 48px;
  .he-label {
    color: #999999;
  }
  .he-value {
    color: #262626;
  }
}
.he-order--item {
  width: 710px;
  border-radius: 8px;
  padding: 24px;
  .he-sign {
    font-size: 24px;
    font-weight: 500;
    @extend .font-family-sc;
    line-height: 32px;
    color: #e60b30;
    border: 1px solid #e60b30;
    padding: 0 10px;
    border-radius: 16px;
  }
}

.he-user {
  height: 56px;
}
.he-user--name {
  font-size: 28px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #222222;
  margin-left: 16px;
}
.he-order--sn {
  font-size: 24px;
  font-weight: 500;
  @extend .font-family-sc;
  color: #999999;
  line-height: 48px;
}
.he-item--footer {
  border-top: 1px solid #e5e5e5;
  padding-top: 16px;
  margin-top: 16px;
  .he-item--price {
    font-size: 24px;
    font-weight: 500;
    @extend .font-family-sc;
    line-height: 32px;
    &:last-child {
      .he-value {
        color: #e60b30;
      }
    }
  }
  .he-label {
    color: #999999;
  }
  .he-value {
    color: #222222;
  }
}
</style>
