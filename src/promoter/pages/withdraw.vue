<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-title">待提现佣金</view>
    <view class="he-cash--withdrawal">￥251.02</view>
    <button class="cu-btn he-router--detail flex align-center" @click="routerWithDrawList">
      <text>提现明细</text>
      <text class="iconfont iconbtn_arrow"></text>
    </button>
    <view class="he-card flex justify-between align-center he-method">
      <text class="he-title--line">提现方式</text>
      <button class="cu-btn flex align-center he-method--select" v-if="!form.method">
        <text>请选择提现方式</text>
        <text class="iconfont iconbtn_arrow"></text>
      </button>
      <text v-else class="he-title--line">提现到支付宝</text>
    </view>
    <view class="he-card he-form">
      <view class="he-form--item flex align-center">
        <label class="he-title--line">姓名</label>
        <input placeholder-class="he-placeholder--class" type="text" class="flex-sub" placeholder="请填写姓名" />
      </view>
      <view class="he-form--item flex align-center">
        <label class="he-title--line">微信号</label>
        <input placeholder-class="he-placeholder--class" type="text" class="flex-sub" placeholder="请填写微信号" />
      </view>
      <view class="he-form--item flex align-center">
        <label class="he-title--line">支付宝账号</label>
        <input placeholder-class="he-placeholder--class" type="text" class="flex-sub" placeholder="请填写支付宝账号" />
      </view>
      <view class="he-form--item flex align-center">
        <label class="he-title--line">开户行</label>
        <input placeholder-class="he-placeholder--class" type="text" class="flex-sub" placeholder="请填写开户行" />
      </view>
      <view class="he-form--item flex align-center">
        <label class="he-title--line">银行账号</label>
        <input placeholder-class="he-placeholder--class" type="text" class="flex-sub" placeholder="请填写银行账号" />
      </view>
    </view>
    <view class="he-card he-amount">
      <view class="he-title--line"> 提现金额 </view>
      <view class="flex he-price" @click="isKeyborad = true">
        <view class="he-price--number">
          {{ form.price }}
          <text v-if="isKeyborad" class="he-focus">|</text>
        </view>
      </view>
      <view class="he-error--message">输入金额超过每日最高提现金额</view>
      <view class="he-price--prompt"> 最低提现金额￥100.00，每日最高提现金额￥10000.00， 提现手续费2% </view>
    </view>
    <button class="cu-btn he-withdraw--submit">提现</button>
    <number-keyborad v-model="isKeyborad" :digital.sync="form.price" />
  </view>
</template>

<script>
import numberKeyborad from '../../components/keyboard/number-keyborad.vue';

export default {
  name: 'withdraw',
  components: {
    numberKeyborad
  },
  data() {
    return {
      form: {
        method: '',
        price: '123.12'
      },
      isKeyborad: false
    };
  },
  methods: {
    routerWithDrawList() {
      uni.navigateTo({
        url: '/promoter/pages/withdraw-list'
      });
    },
    changeInput(e) {
      console.log(e);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../main.less';
.iconbtn_arrow {
  font-size: 20px;
  margin-left: 8px;
}
.he-text--center {
  text-align: center;
}
.he-title {
  font-size: 28px;
  font-weight: 500;
  color: #999999;
  line-height: 48px;
  margin-bottom: 8px;
  @extend .font-family-sc, .he-text--center;
}
.he-cash--withdrawal {
  font-size: 56px;
  font-weight: bold;
  color: #222222;
  line-height: 56px;
  margin-bottom: 16px;
  @extend .font-family-sc, .he-text--center;
}
.he-router--detail {
  font-size: 28px;
  font-weight: 500;
  color: #999999;
  height: 48px;
  background: transparent;
  margin-bottom: 48px;
  @extend .font-family-sc;
  .iconbtn_arrow {
    color: #bebebe;
  }
}

.he-page-content {
  background: #f5f5f5;
  padding: 48px 20px 50px 20px;
}
.he-title--line {
  font-size: 26px;
  font-weight: 500;
  color: #222222;
  @extend .font-family-sc;
}

.he-method {
  padding: 38px 25px;
  .iconbtn_arrow {
    color: #cccccc;
  }
}

.he-method--select {
  padding: 0;
  height: 30px;
  font-size: 26px;
  font-weight: 500;
  color: #cccccc;
  @extend .font-family-sc;
  background: transparent;
}

.he-form {
  padding: 16px 24px;
  .he-form--item {
    height: 100px;

    &:not(:last-child) {
      border-bottom: 1px solid #e5e5e5;
    }
    .he-title--line {
      width: 156px;
    }
  }
}

.he-amount {
  padding: 16px 24px 24px 24px;
  .he-title--line {
    line-height: 80px;
  }
  .he-price {
    color: #222222;
    line-height: 120px;
    border-bottom: 1px solid #e5e5e5;
    @extend .font-family-sc;
  }
  .he-price--number {
    font-size: 88px;
    font-weight: bold;
    display: table-cell;
    vertical-align: bottom;
    @extend .font-family-sc;
    &:before {
      content: '￥';
      font-size: 60px;
      font-weight: 500;
      margin-right: 16px;
    }
  }
  .he-amount--footer {
    //padding-top: 24px;
  }
  .he-error--message {
    font-size: 26px;
    font-weight: 500;
    color: #f5212d;
    line-height: 32px;
    margin-top: 26px;
    @extend .font-family-sc;
  }
  .he-price--prompt {
    font-size: 26px;
    font-weight: 500;
    color: #999999;
    line-height: 32px;
    margin-top: 26px;
    @extend .font-family-sc;
  }
}

.he-withdraw--submit {
  width: 100%;
  height: 80px;
  @extend .font-family-sc;
  @include background_color('background_color');
  border-radius: 40px;
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 64px;
}

.he-focus {
  animation: focus 1.2s infinite;
  display: inline-block;
  transform: scaleX(0.3);
  color: #4e6ef2;
}

@keyframes focus {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
