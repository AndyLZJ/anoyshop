<template>
  <view class="he-page-content" :data-theme="theme" :class="loading ? 'flex justify-center align-center' : ''">
    <he-loading size="50" mode="flower" v-if="loading"></he-loading>
    <template v-else>
      <template v-if="status === 0">
        <he-rich @tap="routerApply" v-if="content" :content="content" :preview-img="false" :lazy-load="true"></he-rich>
      </template>
      <view v-else-if="status === 1" class="he-result--box flex flex-direction align-center">
        <image class="he-image" :src="ipAddress + '/promoter/stop-appley.png'"></image>
        <text class="he-text">来晚了，商家已暂停招募</text>
        <button class="cu-btn he-go-btn" @click="routerIndex">去逛逛</button>
      </view>
    </template>
  </view>
</template>

<script>
import { recruit } from '../api';
import heRich from './../../components/he-html/he-html.vue';
import heLoading from '../../components/he-loading.vue';

export default {
  name: 'recruit',
  components: {
    heRich,
    heLoading
  },
  data() {
    return {
      content: '',
      finishRead: false,
      status: 0,
      loading: true
    };
  },
  mounted() {
    recruit().then(response => {
      uni.setNavigationBarTitle({
        title: response.title
      });
      this.content = response.content;
      this.loading = false;
    });
  },
  // 页面滚动到底部 可以跳转
  onReachBottom() {
    this.finishRead = true;
  },
  methods: {
    routerApply() {
      if (this.finishRead) {
        uni.navigateTo({
          url: '/promoter/pages/apply'
        });
      }
    },
    // 跳转到首页
    routerIndex() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import './../main.less';

.he-result--box {
  padding-top: 160px;
  .he-image {
    width: 317px;
    height: 320px;
  }
  .he-text {
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 34px;
  }
  .he-go-btn {
    height: 80px;
    @include background_color('background_color');
    border-radius: 40px;
    padding: 26px 80px;
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #ffffff;
    margin-top: 45px;
  }
}
</style>
