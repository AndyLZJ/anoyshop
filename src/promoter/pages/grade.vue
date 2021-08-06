<template>
  <view class="he-page-content">
    <image :src="ipAddress + '/promoter/grade-background.png'" class="grade-background"></image>
    <view class="avatar-box">
      <image :src="ipAddress + '/promoter/grade-avatar-wheat.png'" class="avatar-wheat"></image>
      <he-image
        class="avatar-image"
        :image-style="{
          borderRadius: '50%'
        }"
        :height="120"
        :width="120"
      ></he-image>
    </view>
    <view class="grade-name">初级分销商</view>
    <view class="grade-banner">
      <swiper @change="change" previous-margin="56rpx" :style="{ height: '100%' }" next-margin="56rpx">
        <swiper-item class="he-swiper-item" v-for="(item, index) in list" :key="index">
          <view
            class="he-list-wrap"
            :style="{
              transform: hCurrent !== index ? 'scaleY(0.8)' : 'scaleY(1)',
              margin: hCurrent !== index ? '0 24rpx' : 0,
              height: '100%'
            }"
          >
            <view class="wrap--head">
              <text class="iconfont iconfenxiaozhuangshi"></text>
              <text class="head-title">{{ item.title }}</text>
              <text class="iconfont iconfenxiaozhuangshi"></text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="he-card">
      <view class="card-head">
        <text class="head-title">{{ detail.title }}</text>
        <text class="head-condition">满足全部条件升级</text>
      </view>
      <view class="card-item">
        <view class="item-title">当前下线数</view>
        <view class="progress-bar">
          <view :style="[ratioStyle(detail, 'a')]" class="progress-ratio"></view>
        </view>
        <view class="flex justify-between item-footer">
          <text>已达521人</text>
          <text>1000人</text>
        </view>
      </view>
      <view class="card-item">
        <view class="item-title">累计销售金额</view>
        <view class="progress-bar">
          <view :style="[ratioStyle(detail, 'b')]" class="progress-ratio"></view>
        </view>
        <view class="flex justify-between item-footer">
          <text>已达￥148.23</text>
          <text>￥1000.00</text>
        </view>
      </view>
      <view class="card-item">
        <view class="item-title">当前下线数</view>
        <view class="progress-bar">
          <view :style="[ratioStyle(detail, 'c')]" class="progress-ratio"></view>
        </view>
        <view class="flex justify-between item-footer">
          <text>已达￥765.52</text>
          <text>￥1000.00</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'grade',
  data() {
    return {
      hCurrent: 0,
      list: [
        {
          title: '初级分销商',
          a: 10,
          b: 12,
          c: 0
        },
        {
          title: '中级分销商',
          a: 30,
          b: 50,
          c: 100
        },
        {
          title: '高级分销商',
          a: 11,
          b: 100,
          c: 0
        },
        {
          title: '王者级分销商',
          a: 11,
          b: 80,
          c: 8
        },
        {
          title: '钻石级分销商',
          a: 50,
          b: 100,
          c: 51
        }
      ]
    };
  },
  computed: {
    ratioStyle() {
      return (detail, key) => {
        return {
          width: detail[key] + '%'
        };
      };
    },
    detail({ list, hCurrent }) {
      return list[hCurrent];
    }
  },
  methods: {
    change(e) {
      this.hCurrent = e.detail.current;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../main.less';

.grade-background {
  width: 750px;
  height: 480px;
  position: absolute;
  top: 0;
  z-index: 0;
}

.avatar-box {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);

  .avatar-wheat {
    width: 100%;
    height: 100%;
  }

  .avatar-image {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.grade-name {
  font-size: 32px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #ffffff;
  position: relative;
  z-index: 10;
  text-align: center;
  line-height: 40px;
  margin-top: 208px;
}

.grade-banner {
  height: 350px;
  margin-top: 40px;
  position: relative;
  z-index: 10;

  .he-swiper-item {
  }

  .he-list-wrap {
    transition: all 0.2s;
    background: #f9efe6;
    border-radius: 16px;
    padding: 40px 56px 0 56px;
    .wrap--head {
      color: #a06640;
      text-align: center;
      .iconfenxiaozhuangshi:last-child {
        transform: rotateY(180deg);
        display: inline-block;
      }
    }
    .head-title {
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      margin: 0 15px;
    }
  }

  .iconfenxiaozhuangshi {
    font-size: 28px;
  }
}

.he-card {
  margin: 47px 20px 0 20px;
  padding: 40px 40px 8px 40px;
  .card-head {
    height: 48px;
    line-height: 48px;
    @extend .font-family-sc;
    font-weight: 500;
    margin-bottom: 32px;
    .head-title {
      color: #222222;
      font-size: 32px;
    }
    .head-condition {
      font-size: 24px;
      color: #999999;
      margin-left: 15px;
    }
  }
  .card-item {
    margin-bottom: 40px;
    .item-title {
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #666666;
      line-height: 48px;
    }
    .item-footer {
      font-size: 24px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #666666;
      line-height: 40px;
    }
  }
  .progress-bar {
    width: 630px;
    height: 16px;
    background: #f3e0d2;
    border-radius: 8px;
    margin: 16px 0;
    .progress-ratio {
      width: 0;
      height: 16px;
      background: #c9875e;
      border-radius: 8px;
      transition-duration: 0.5s;
    }
  }
}
</style>
