<template>
  <view class="he-page-content">
    <view class="header">
      <view class="header-switch">
        <view class="switch-item flex-sub" :class="{ active: hCurrent === 1 }" @click="hCurrent = 1"></view>
        <view class="switch-item flex-sub" :class="{ active: hCurrent === 2 }" @click="hCurrent = 2"></view>
        <view class="switch-item flex-sub" :class="{ active: hCurrent === 3 }" @click="hCurrent = 3"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'leaderboard',
  data() {
    return {
      hCurrent: 1
    };
  }
};
</script>

<style scoped lang="less">
@import '../main.less';

.he-page-content {
  background-color: orange;
}

.header {
  width: 750px;
  height: 400px;
  background-color: red;
  position: relative;

  .header-switch {
    width: 750px;
    height: 80px;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    background-color: #ffffff;

    .switch-item {
      height: 100%;
      background: #4267b4;
    }

    .switch-item.active {
      width: 250px;
      background-color: #ffffff;
      height: 88px;
      border-radius: 0 16px 0 0;
    }

    .switch-item:nth-child(2) {
      border-radius: 0 0 0 16px;
    }
  }
}
</style>
