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
              transform: uCurrent != index ? 'scaleY(0.8)' : 'scaleY(1)',
              margin: uCurrent != index ? '0 24rpx' : 0,
              height: '100%'
            }"
          >
            <view class="wrap--head">
              <text class="iconfont"></text>
              <text>初级分销商</text>
              <text></text>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="he-card"></view>
  </view>
</template>

<script>
export default {
  name: 'grade',
  data() {
    return {
      uCurrent: 0,
      list: ['red', 'blue', 'green', 'yellow']
    };
  },
  methods: {
    change(e) {
      this.uCurrent = e.detail.current;
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
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #a06640;
      text-align: center;
    }
  }
}
</style>
