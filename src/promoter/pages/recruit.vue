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
import { applyPromoter, recruit } from '../api';
import heRich from './../../components/he-html/he-html.vue';
import heLoading from '../../components/he-loading.vue';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('setting', {
      // 获取分销设置
      promoterSetting: 'getPromoter'
    })
  },
  mounted() {
    recruit().then(response => {
      uni.setNavigationBarTitle({
        title: response.title ? response.title : '招募令'
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
        const { conditions, need_apply } = this.promoterSetting;
        // need_apply 申请信息  0无需填写  1需填写
        // conditions.type 满足条件 1无条件  2累计消费金额  3累计消费次数  4购买任意商品   5购买指定商品
        if (conditions.type === 1 && !need_apply) {
          console.log('无需条件');
          // 申请分销商
          applyPromoter().then(() => {
            // 跳转分销中心
            uni.navigateTo({
              url: '/promoter/pages/index'
            });
          });
        } else {
          uni.navigateTo({
            url: '/promoter/pages/apply'
          });
        }
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
