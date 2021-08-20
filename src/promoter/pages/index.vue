<template>
  <view class="he-page-content" :data-theme="theme" :class="loading ? 'flex justify-center align-center' : ''">
    <he-loading size="50" mode="flower" v-if="loading"></he-loading>
    <template v-else>
      <view class="he-head">
        <view class="he-head--content flex">
          <view class="he-head--left flex align-center flex-sub">
            <he-image
              :src="userInfo.avatar"
              :image-style="{ borderRadius: '50%' }"
              class="he-image"
              :width="80"
              :height="80"
            ></he-image>
            <view class="he-head--info">
              <view class="he-name">{{ userInfo.nickname }}</view>
              <view class="he-shop">{{ storeSetting.name }}</view>
            </view>
          </view>
          <view class="he-head--right flex">
            <view class="he-router" @click="routerDynamic">
              <view class="iconfont icondistribution_dynamic"></view>
              <view>动态</view>
            </view>
            <view class="he-router" @click="routerLeaderboard" v-if="rank.enable">
              <view class="iconfont icondistribution_list"></view>
              <view>榜单</view>
            </view>
          </view>
        </view>
      </view>
      <view class="he-body">
        <view class="he-card he-level flex justify-between">
          <view class="he-level--left">
            <view class="he-title">分销等级：{{ detail.level_name }}</view>
            <view class="he-progress">
              <view :style="[progressStyle]" class="he-progress--rate"></view>
            </view>
            <view class="he-prompt">
              升级至{{ detail.next_level.name }}，还需{{
                detail.next_level.lack.condition
              }}{{ detail.next_level.lack.lack_num }}
            </view>
          </view>
          <view class="he-level--right flex align-center justify-center">
            <button class="cu-btn" @click="routerGrade">升级</button>
          </view>
        </view>
        <view class="he-card he-view">
          <view class="charts-box">
            <canvas style="width: 100%; height: 384rpx" canvas-id="he-view" id="he-view"></canvas>
          </view>
          <view class="flex he-data-top">
            <view class="basis-df he-data--item">
              <view class="he-data--title">
                <text class="he-dots he-purple"></text>
                <text>已提现佣金</text>
              </view>
              <view class="he-data--number">¥{{ detail.is_withdrawal }}</view>
            </view>
            <view class="basis-df he-data--item">
              <view class="he-data--title">
                <text class="he-dots he-blue"></text>
                <text>待结算佣金</text>
              </view>
              <view class="he-data--number">¥{{ detail.wait_account }}</view>
            </view>
          </view>
          <view class="flex justify-between align-center he-data-bottom">
            <view class="basis-df he-data--item">
              <view class="he-data--title">
                <text class="he-dots he-orange"></text>
                <text>待提现佣金</text>
              </view>
              <view class="he-data--number">¥{{ detail.commission }}</view>
            </view>
            <button class="cu-btn to-withdraw" @click="routerWithDraw">去提现</button>
          </view>
        </view>
        <view class="he-card flex he-grand">
          <view class="flex-sub he-grand--item">
            <button class="flex cu-btn align-center justify-start" @click="routerOrder">
              <text>累计分销订单</text>
              <view class="iconfont iconbtn_arrow"></view>
            </button>
            <view class="he-grand--number"> {{ detail.promoter_order_number }}</view>
          </view>
          <view class="flex-sub he-grand--item">
            <button class="flex cu-btn align-center justify-start" @click="routerOffline">
              <text>累计下线人数</text>
              <view class="iconfont iconbtn_arrow"></view>
            </button>
            <view class="he-grand--number"> {{ detail.all_children }}</view>
          </view>
        </view>
        <!-- 分销商品 -->
        <view class="he-card he-goods">
          <view class="he-card--head flex justify-between">
            <text class="he-title">分销商品</text>
            <button class="he-more cu-btn flex align-center" @click="routerGoods">
              <text>更多商品</text>
              <text class="iconfont iconbtn_arrow"></text>
            </button>
          </view>
          <view class="he-good flex" @click="routerGoodsDetail">
            <he-image
              :image-style="{ borderRadius: '16px 0px 0px 16px' }"
              width="240"
              height="240"
              :src="good.slideshow[0]"
            ></he-image>
            <view class="he-good--content flex-sub flex flex-direction justify-between">
              <view class="he-good--name he-line-2">2020新款可盐可甜格子衬衫连衣裙港风套装女复古chic两件套裙子夏</view>
              <view class="">
                <view class="he-good--price">￥{{ good.price }}</view>
                <view class="he-good--share" @click.stop="shareGood">
                  <text class="iconfont iconproductdetails_share"/>
                  <text class="he-good--commission">预计赚¥{{ good.commission }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 推广赚钱 -->
        <view class="he-card he-promote">
          <view class="he-card--head">
            <text class="he-title">推广赚钱</text>
          </view>
          <view class="he-card--body flex flex-wrap">
            <button class="cu-btn basis-df flex justify-between" @click="promotionSpace">
              <view>
                <view class="he-title">推广空间</view>
                <view class="he-desc">专属动态空间</view>
              </view>
              <image class="he-image" :src="ipAddress + '/promoter-promotion-space.png'"/>
            </button>
            <button class="cu-btn basis-df flex justify-between" @click="routerMaterial">
              <view>
                <view class="he-title">推广素材</view>
                <view class="he-desc">便捷复制素材</view>
              </view>
              <image class="he-image" :src="ipAddress + '/promoter-promotion-material.png'"/>
            </button>
            <button class="cu-btn basis-df flex justify-between" @click="promotionShop">
              <view>
                <view class="he-title">推广店铺</view>
                <view class="he-desc">邀请逛店铺</view>
              </view>
              <image class="he-image" :src="ipAddress + '/promoter-promotion-shop.png'"></image>
            </button>
            <button class="cu-btn basis-df flex justify-between" @click="inviteDistributors">
              <view>
                <view class="he-title">邀请分销商</view>
                <view class="he-desc">邀请好友加入</view>
              </view>
              <image class="he-image" :src="ipAddress + '/promoter-invite-distributors.png'"></image>
            </button>
          </view>
        </view>
      </view>
      <down-grade v-model="isDowngrade" :level-name="detail.level_name" :is-up-down="detail.down_level_status"/>
      <he-share
        v-model="isShare"
        :is-promoter="isPromoter"
        @confirmPromoter="setPromoterMaterial"
        :post-data="postData"
      />
      <promotion-material :info="good" v-model="showPromotionMaterial"></promotion-material>
    </template>
  </view>
</template>

<script>
import {goods, personalCenter, receiveRecruitToken} from '../api';
import DownGrade from './components/downgrade.vue';
import heLoading from '../../components/he-loading.vue';
import heShare from './../../components/he-share.vue';
import promotionMaterial from './components/promotion-material.vue';
import {mapGetters} from 'vuex';

let systemInfo = uni.getSystemInfoSync();

export default {
  name: 'index',
  components: {
    DownGrade,
    heLoading,
    heShare,
    promotionMaterial
  },
  data() {
    return {
      good: {},
      loading: true,
      // 分销个人中心详情
      detail: {
        down_level_status: 0
      },
      progressStyle: {
        width: 0
      },
      isShare: false,
      shareType: 0, // 0 推广店铺 1 推广空间 2 邀请函
      isPromoter: false,
      showPromotionMaterial: false,
      postData: null,
      canvasWidth: systemInfo.windowWidth / 414,
    };
  },
  computed: {
    rate() {
      return {
        width: '50%'
      };
    },
    // 用户信息
    userInfo: function () {
      return this.$store.state.apply.userInfo;
    },
    ...mapGetters({
      rank: 'setting/getPromoterRank'
    }),
    shareData({shareType, ipAddress, $store, good}) {
      if (shareType === 1) {
        let imageUrl = '';
        // #ifndef H5
        imageUrl = `${ipAddress}/share-dynamic-space.png`
        // #endif
        // #ifdef H5
        imageUrl = `${ipAddress}/share-dynamic-space-icon.png`
        // #endif
        return {
          title: `${$store.state.apply.userInfo.nickname}的空间`,
          path: `/promoter/pages/dynamic?UID=${$store.state.apply.userInfo.id}`,
          imageUrl: imageUrl,
          // #ifdef H5
          desc: '尖端好物，尽在我的空间，欢迎常来逛逛'
          // #endif
        };
      } else if (shareType === 2) {
        let imageUrl = '';
        // #ifndef H5
        imageUrl = `${ipAddress}/share-join-promoter.png`
        // #endif
        // #ifdef H5
        imageUrl = `${ipAddress}/share-join-promoter-icon.png`
        // #endif
        return {
          title: `推广商品，赚佣金！`,
          path: `/promoter/pages/recruit`,
          imageUrl: imageUrl,
          // #ifdef H5
          desc: '欢迎加入我们的分销团队，一起赚佣金'
          // #endif
        };
      } else if (shareType === 3) {
        return {
          title: good.name,
          path: '/pages/goods/detail?id=' + good.id,
          imageUrl: good.slideshow[0]
        }
      }
    },
    // 升降级
    isDowngrade: {
      get({detail}) {
        return detail.down_level_status === -1 || detail.down_level_status === 1;
      },
      set(val) {
        if (!val) {
          this.detail.down_level_status = 0;
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      receiveRecruitToken();
      goods(
        1,
        {
          sort_value: 'DESC'
        },
        1
      ).then(response => {
        this.good = response.data[0];
      });
      // 分销商个人中心详情
      personalCenter().then(response => {
        this.detail = response;
        this.loading = false;
        let style = {
          width: '0'
        };
        // 计算进度条长度
        if (response.next_level) {
          // get_num 当前数量 all_num 总数
          const {all_num, get_num} = response.next_level.lack;
          style.width = `${(get_num / all_num) * 100}%`;
        }
        // 回调赋值 等渲染出来
        this.$nextTick(() => {
          this.progressStyle = style;
        });
        this.initCanvas();
      });
    },
    routerDynamic() {
      uni.navigateTo({
        url: `/promoter/pages/dynamic?UID=${this.$store.state.apply.userInfo.id}`
      });
    },
    routerLeaderboard() {
      uni.navigateTo({
        url: '/promoter/pages/leaderboard'
      });
    },
    routerGrade() {
      uni.navigateTo({
        url: '/promoter/pages/grade'
      });
    },
    routerOrder() {
      uni.navigateTo({
        url: '/promoter/pages/order'
      });
    },
    routerOffline() {
      uni.navigateTo({
        url: '/promoter/pages/offline'
      });
    },
    routerGoods() {
      uni.navigateTo({
        url: '/promoter/pages/goods'
      });
    },
    routerWithDraw() {
      uni.navigateTo({
        url: `/promoter/pages/withdraw?commission=${this.detail.commission}`
      });
    },
    routerMaterial() {
      uni.navigateTo({
        url: '/promoter/pages/material'
      });
    },
    routerGoodsDetail() {
      uni.navigateTo({
        url: `/pages/goods/detail?id=${this.good.id}`
      });
    },
    initCanvas() {
      const rem = this.canvasWidth;
      const {all_commission_amount, is_withdrawal, wait_account, commission} = this.detail;
      const commissionPercentage = commission/all_commission_amount;
      const isWithdrawalPercentage = is_withdrawal/all_commission_amount;
      const waitAccountPercentage = wait_account/all_commission_amount;
      console.log(commissionPercentage);
      console.log(isWithdrawalPercentage);
      console.log(waitAccountPercentage);
      const context = uni.createCanvasContext('he-view');
      context.beginPath();
      context.arc(177.5 * rem, 100 * rem, uni.upx2px(160), 0, 2 * Math.PI);
      context.setFillStyle('#FFFFFF');
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 5;
      context.shadowBlur = 15;
      context.shadowColor = 'rgba(0,0,0,0.1)';
      context.fill();
      context.beginPath();
      context.arc(177.5 * rem, 100 * rem, uni.upx2px(160), 0, Math.PI * 2 * commissionPercentage, false);
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.strokeStyle = '#FE9D51';
      context.stroke();
      context.beginPath();
      context.arc(177.5 * rem, 100 * rem, uni.upx2px(160), Math.PI * 2 * commissionPercentage, Math.PI * 2 * isWithdrawalPercentage, false);
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.strokeStyle = '#623CEB';
      context.stroke();
      context.beginPath();
      context.arc(177.5 * rem, 100 * rem, uni.upx2px(160), Math.PI * 2 * isWithdrawalPercentage, Math.PI * 2, false);
      context.lineWidth = 8;
      context.lineCap = 'round';
      context.strokeStyle = '#2379FC';
      context.stroke();
      context.setFontSize(uni.upx2px(22));
      context.textAlign = 'center';
      context.setFillStyle('#666666');
      context.fillText('累计佣金', 177.5 * rem, 90 * rem);
      context.setFontSize(uni.upx2px(52));
      context.setFillStyle('#222222');
      context.font = 'normal bold DIN';
      context.fillText(all_commission_amount, 177.5 * rem, 120 * rem);
      context.draw();
    },
    // 推广空间
    promotionSpace() {
      this.shareType = 1;
      // #ifdef H5
      this.$wechat.updateShareData(this.shareData);
      // #endif
      this.isShare = true;
      this.postData = {
        zoom: 1
      }
    },
    // 推广店铺
    promotionShop() {
      this.shareType = 0;
      // #ifdef H5
      this.$wechat.updateShareData(this.$shareData);
      // #endif
      this.isPromoter = false;
      this.isShare = true;
      this.postData = {
        store: 1
      }
    },
    // 邀请分销商
    inviteDistributors() {
      this.shareType = 2;
      // #ifdef H5
      this.$wechat.updateShareData(this.shareData);
      // #endif
      this.isPromoter = false;
      this.isShare = true;
      this.postData = {
        invitation: 1
      }
    },
    // 商品分享
    shareGood() {
      this.shareType = 3;
      // #ifdef H5
      this.$wechat.updateShareData(this.shareData);
      // #endif
      this.isPromoter = true;
      this.isShare = true;
    },
    // 设置分销推广
    setPromoterMaterial() {
      this.showPromotionMaterial = true;
    }
  },
  // #ifdef H5
  beforeDestroy() {
    this.$wechat.updateShareData(this.$shareAppMessage());
  },
  // #endif
  // #ifndef H5
  onShareAppMessage(event) {
    if (event.from === 'button') {
      return this.$shareAppMessage(this.shareData);
    } else {
      return this.$shareAppMessage(this.$shareData);
    }
  },
  onShareTimeline(event) {
    if (event.from === 'button') {
      return this.$shareAppMessage(this.shareData);
    } else {
      return this.$shareAppMessage(this.$shareData);
    }
  }
  // #endif
};
</script>

<style scoped lang="less">
@import '../main.less';

.he-page-content {
  padding-bottom: 38px;
}

.he-head {
  width: 750px;
  height: 240px;
  background: #433b60;
  overflow: hidden;

  .he-head--content {
    height: 80px;
    margin-top: 48px;
    padding: 0 40px 0 28px;
    color: #ffffff;

    .he-image {
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .he-head--info:extend(.font-family-sc) {
    margin-left: 24px;

    .he-name {
      line-height: 40px;
      font-weight: 500;
      font-size: 28px;
    }

    .he-shop {
      font-size: 22px;
      font-weight: 400;
      line-height: 40px;
    }
  }

  .he-router:extend(.font-family-sc) {
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;

    .iconfont {
      font-size: 48px;
    }

    &:last-child {
      margin-left: 48px;
    }
  }
}

.he-body {
  margin-top: -64px;
  width: 750px;
  padding: 0 20px;
}

.he-level {
  background: #f9efe6;
  padding: 0;

  .he-level--left {
    padding: 24px 0 24px 32px;

    .he-title:extend(.font-family-sc) {
      font-size: 28px;
      font-weight: 500;
      color: #a06640;
      line-height: 40px;
    }

    .he-prompt:extend(.font-family-sc) {
      font-size: 22px;
      font-weight: 400;
      color: #a06640;
      line-height: 32px;
    }
  }

  .he-level--right {
    width: 160px;

    .cu-btn:extend(.font-family-sc) {
      width: 96px;
      height: 48px;
      border: 1px solid #a06640;
      border-radius: 24px;
      font-size: 24px;
      font-weight: 500;
      color: #a06640;
      padding: 0;
      background-color: transparent;
    }
  }

  .he-progress {
    width: 400px;
    height: 8px;
    border-radius: 4px;
    background-color: #f3e0d2;
    margin: 16px 0 8px 0;
    overflow: hidden;
  }

  .he-progress--rate {
    height: 8px;
    width: 0;
    border-radius: 4px;
    background: linear-gradient(270deg, #c58057 0%, #e4ae82 100%);
    transition-duration: 0.5s;
  }
}

.he-view {
  .he-data--item {
    font-weight: 500;
    padding-bottom: 8px;
  }

  .he-data-top {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 32px;

    .he-data--item {
      &:first-child {
        border-right: 1px solid #e5e5e5;
      }

      &:last-child {
        padding-left: 32px;
      }
    }
  }

  .he-data-bottom {
    padding-top: 24px;
  }

  .to-withdraw:extend(.font-family-sc) {
    width: 120px;
    height: 48px;
    border: 2px solid #e60b30;
    border-radius: 24px;
    font-size: 24px;
    font-weight: 500;
    color: #e60b30;
    background: transparent;
    padding: 0;
  }

  .he-data--title:extend(.font-family-sc) {
    font-size: 22px;
    color: #666666;
    line-height: 48px;
  }

  .he-data--number {
    font-size: 36px;
    font-family: DIN;
    font-weight: 500;
    color: #222222;
    line-height: 32px;
    padding-left: 32px;
  }

  .he-dots {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 16px;

    &.he-purple {
      background: #623ceb;
    }

    &.he-blue {
      background: #2379fc;
    }

    &.he-orange {
      background: #FE9D51;
    }
  }
}

.charts-box {
  height: 384px;
}

.he-grand {
  .he-grand--item {
    padding-bottom: 8px;

    .cu-btn:extend(.font-family-sc) {
      line-height: 48px;
      font-size: 22px;
      font-weight: 500;
      color: #666666;
      background-color: #ffffff;
      padding: 0;

      .iconbtn_arrow {
        margin-left: 14px;
      }
    }

    &:first-child {
      border-right: 1px solid #e5e5e5;
    }

    &:last-child {
      padding-left: 36px;
    }

    .he-grand--number:extend(.font-family-din) {
      font-size: 36px;
      font-weight: 500;
      color: #222222;
      line-height: 32px;
    }
  }
}

.he-card--head {
  line-height: 64px;
}

.he-title:extend(.font-family-sc) {
  font-size: 28px;
  font-weight: 500;
  color: #333333;
}

.he-goods {
  padding-top: 16px;

  .he-more:extend(.font-family-sc) {
    font-weight: 500;
    font-size: 22px;
    color: #999999;
    padding: 0;
    background: #ffffff;
  }

  .iconbtn_arrow {
    margin-left: 12px;
  }

  .he-good {
    width: 646px;
    height: 240px;
    background: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 16px;
  }

  .he-good--content:extend(.font-family-sc) {
    padding: 24px;
  }

  .he-good--name {
    font-size: 28px;
    font-weight: 500;
    color: #222222;
    line-height: 36px;
  }

  .he-good--price {
    font-size: 28px;
    font-weight: 500;
    color: #e60b30;
    line-height: 32px;
  }

  .he-good--share {
    display: inline-block;
    padding: 0 25px;
    border-radius: 24px;
    border: 2px solid #ff7c24;
    line-height: 46px;
    margin-top: 24px;
  }

  .iconproductdetails_share {
    color: #ff7c24;
    font-size: 22px;
    margin-right: 8px;
  }

  .he-good--commission:extend(.font-family-sc) {
    font-size: 24px;
    font-weight: 500;
    color: #ff7c24;
  }
}

.he-promote {
  .he-card--body {
    margin-top: 16px;
  }

  .basis-df {
    height: 104px;
    border-radius: 0;
    background-color: transparent;

    &:nth-child(1),
    &:nth-child(3) {
      border-right: 1px solid #e5e5e5;
      padding-right: 35px;
    }

    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid #e5e5e5;
    }

    &:nth-child(2),
    &:nth-child(4) {
      padding-left: 35px;
    }

    &:nth-child(3),
    &:nth-child(4) {
      padding-top: 24px;
    }

    .he-title:extend(.font-family-sc) {
      font-size: 28px;
      font-weight: 500;
      color: #222222;
      line-height: 48px;
    }

    .he-desc:extend(.font-family-sc) {
      font-size: 22px;
      font-weight: 400;
      color: #999999;
    }

    .he-image {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
