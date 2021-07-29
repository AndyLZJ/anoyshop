<template>
  <view class="he-page-content" :data-theme="theme" :class="loading ? 'flex justify-center align-center' : ''">
    <he-loading size="50" mode="flower" v-if="loading"></he-loading>
    <template v-else>
      <template v-if="status === 0 || status === 1">
        <image :src="adsPictures" class="he-ads"></image>
        <view class="he-card he-condition flex flex-direction align-center">
          <view class="flex align-center he-top">
            <text class="iconfont iconwarning"></text>
            <text class="he-title">很遗憾，您暂未满足成为分销商的条件</text>
          </view>
          <view class="he-center">
            累计消费次数需达到
            <text class="he-hit">20</text>
            ，方可申请成为分销商
          </view>
          <view class="he-progress--bar">
            <view class="he-progress" :animation="animationProgress">
              <view class="he-slider"></view>
            </view>
          </view>
          <view class="he-bottom flex-sub flex justify-between align-center">
            <view
              >已消费
              <text class="he-hit">12</text>
              次
            </view>
            <view> 20 </view>
          </view>
          <button class="cu-btn he-btn" @click="routerIndex">去逛逛</button>
        </view>
        <view class="he-card he-form" v-if="status === 1">
          <view
            class="he-item he-hit"
            :style="[
              {
                lineHeight: isBeInvited ? '40rpx' : '80rpx'
              }
            ]"
          >
            欢迎加入【店铺名称】，请填写申请信息
            <view class="__br"></view>
            {{ isBeInvited ? '邀请人：行走的CD' : '' }}
          </view>
          <view class="he-item flex align-center">
            <view class="he-hit">姓名</view>
            <input type="text" placeholder="请输入真实姓名" />
          </view>
          <view class="he-item flex align-center">
            <view class="he-hit">手机号</view>
            <input type="text" placeholder="请输入手机号" />
          </view>
          <view class="he-item flex align-center">
            <view class="he-hit">性别</view>
            <input type="text" placeholder="请输入性别" />
          </view>
          <view class="he-item he-textarea flex align-start">
            <view class="he-hit">地址</view>
            <textarea :disable-default-padding="true" type="text" class="he-input" placeholder="请输入地址" />
          </view>
          <view class="he-protocol flex align-center" v-if="isAgreement">
            <he-radio class="he-radio" v-model="isAgree"></he-radio>
            <text @click="isAgree = !isAgree">已阅读且同意协议</text>
            <button class="cu-btn" @click="routerProtocol">《分销商协议》</button>
          </view>
          <button class="cu-btn he-submit" @click="submitApply">提交申请</button>
        </view>
      </template>
      <!-- 提交成功 -->
      <view v-else-if="status === 2" class="he-submit--box he-result--box flex flex-direction align-center">
        <image class="he-image" :src="ipAddress + '/promoter/apply-submit.png'"></image>
        <text class="he-text">申请提交成功，请耐心等待</text>
        <button class="cu-btn he-go-btn" @click="routerIndex">去逛逛</button>
      </view>
      <!-- 商家拒绝 -->
      <view v-else-if="status === 3" class="he-refuse--box he-result--box flex flex-direction align-center">
        <image class="he-image" :src="ipAddress + '/promoter/refuse-apply.png'"></image>
        <text class="he-text">不好意思，商家拒绝了您的申请</text>
        <text class="he-information--text">拒绝理由：暂时不招募新分销商了</text>
        <view>
          <button class="cu-btn he-left-btn" @click="applyAgain">再次申请</button>
          <button class="cu-btn he-go-btn" @click="routerIndex">去逛逛</button>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import heRadio from './../../components/he-radio.vue';
import heLoading from '../../components/he-loading.vue';
import { useAgreement } from '../api';

export default {
  name: 'apply',
  components: {
    heRadio,
    heLoading
  },
  data() {
    return {
      loading: true,
      isBeInvited: false,
      isAgree: false,
      status: 0,
      // 是否启用分销协议
      isAgreement: 0,
      animationProgress: null
    };
  },
  computed: {
    adsPictures({ ipAddress }) {
      return ipAddress + '/promoter/join-us.png';
    }
  },
  mounted() {
    // 是否启用分销协议
    useAgreement().then(response => {
      this.isAgreement = response;
      this.loading = false;
    });
    this.progressAnimation();
  },
  methods: {
    routerProtocol() {
      uni.navigateTo({
        url: '/promoter/pages/protocol'
      });
    },
    // 跳转到首页
    routerIndex() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    // 再次申请
    applyAgain() {
      this.status = 1;
    },
    // 提交申请
    submitApply() {
      this.status = 2;
    },
    // 进度条动画
    progressAnimation() {
      console.log('12');
      let pieceAnimation = uni.createAnimation({
        duration: 500,
        timingFunction: 'ease-in',
        delay: 250
      });
      pieceAnimation.width('40%').step();
      this.animationProgress = pieceAnimation.export();
    }
  }
};
</script>

<style scoped lang="scss">
@import './../main.less';

.he-page-content {
  overflow: hidden;
}
.he-ads {
  width: 100%;
  height: 360px;
}
.he-card {
  margin: 24px 20px 46px 20px;
}

.he-condition {
  padding: 72px 0 80px 0;
  background-color: #fff;
  .he-progress--bar {
    margin-top: 56px;
    margin-bottom: 16px;
    width: 560px;
    height: 16px;
    background: #fef3f4;
    border-radius: 8px;
    .he-slider {
      width: 40px;
      height: 40px;
      @include background_color('background_color');
      border: 8px solid #ffffff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      position: absolute;
      right: 0;
      transform: translateY(-12px);
    }
    .he-progress {
      border-radius: 8px;
      height: 16px;
      width: 0;
      position: relative;
      @include background_color('background_color');
    }
  }
  .he-top {
    margin-bottom: 24px;
  }
  .he-title {
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 36px;
  }
  .iconwarning,
  .iconsuccess {
    font-size: 40px;
    margin-right: 16px;
  }
  .iconwarning {
    color: #fbad15;
  }
  .iconsuccess {
    color: #53c41a;
  }
  .he-center {
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #666666;
    line-height: 36px;
  }
  .he-hit {
    @include font_color('font_color');
  }
  .he-btn {
    width: 400px;
    height: 80px;
    margin-top: 80px;
    border-radius: 40px;
    @include background_color('background_color');
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #ffffff;
  }
  .he-bottom {
    width: 560px;
    height: 40px;
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #666666;
  }
}

.he-form {
  padding: 16px 25px 40px 25px;
  overflow: hidden;
  .he-hit {
    font-size: 26px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
  }
  .he-item {
    border-bottom: 1px solid #e5e5e5;
    height: 100px;
    &:first-child {
      height: auto;
      min-height: 80px;
    }
    .he-hit {
      width: 155px;
    }
  }
  .he-textarea {
    padding-top: 37px;
    height: auto;
    .he-input {
      height: 150px;
    }
  }
  .he-protocol {
    margin: 32px 0 0 0;
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #999999;
    .cu-btn {
      padding: 0;
      background-color: transparent;
      height: auto;
      font-size: 24px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #1890ff;
    }
    .he-radio/deep/ {
      display: inline-block;
      margin-right: 9px;
      .he-radio {
        width: 24px;
        height: 24px;
      }
      .he-select {
        font-size: 15px;
      }
    }
  }
  .he-submit {
    @include background_color('background_color');
    height: 80px;
    border-radius: 40px;
    width: 100%;
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #ffffff;
    margin-top: 40px;
  }
}

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

.he-refuse--box {
  .he-information--text {
    font-size: 24px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #999999;
    line-height: 34px;
    margin-top: 8px;
  }
  .cu-btn {
    &:first-child {
      margin-right: 20px;
      height: 80px;
      border: 1px solid #e60b30;
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #e60b30;
      border-radius: 40px;
      background-color: transparent;
      padding: 26px 64px;
    }
    &:last-child {
      margin-left: 20px;
    }
  }
}
</style>
