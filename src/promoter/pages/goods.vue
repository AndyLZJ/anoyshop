<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-sticky">
      <view class="he-search he-card">
        <input type="text" class="he-input" v-model="search" :focus="showInput" @blur="blurInput" />
        <button class="cu-btn he-button flex align-center justify-start" @click="openInput" v-if="!showInput">
          <text class="iconfont iconsearchbar_search"></text>
          <text>输入商品名称搜索</text>
        </button>
      </view>
      <list-sort class="he-sort" first="佣金"></list-sort>
    </view>
    <view class="he-list">
      <view class="he-item flex" v-for="item in list" :key="item.id" @tap="navigateTo(item)">
        <he-image :width="240" :height="240" :src="item.slideshow[0]"></he-image>
        <view class="he-item__body flex flex-direction flex-sub">
          <view class="he-item__name he-line-2"
            >2020新款可盐可甜格子衬衫连衣裙港风套装女衣裙港风套装女复古chic两件套裙子夏</view
          >
          <view class="flex-sub"></view>
          <view class="he-item__footer flex justify-between align-center">
            <text class="he-item__price">¥1480.00</text>
            <button class="cu-btn he-commission">
              <text class="iconfont iconproductdetails_share"></text>
              <text>预计赚¥14.80</text>
            </button>
          </view>
        </view>
      </view>
    </view>
    <he-load-more v-if="list.length > 0" :status="loadStatus"></he-load-more>
    <he-no-content-yet v-if="isNothing" text="暂未找到相关商品"></he-no-content-yet>
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script>
import listSort from './../../components/list-sort.vue';
import heNoContentYet from './../../components/he-no-content-yet.vue';
import heLoadMore from './../../components/he-load-more.vue';

export default {
  name: 'goods',
  components: {
    listSort,
    heNoContentYet,
    heLoadMore
  },
  data() {
    return {
      showInput: false,
      search: '',
      list: [{}, {}, {}, {}],
      loadStatus: 'loadmore',
      isNothing: true
    };
  },
  methods: {
    blurInput() {
      if (this.$h.test.isEmpty(this.search)) {
        this.showInput = false;
      }
    },
    openInput() {
      this.showInput = !this.showInput;
      this.list = [];
    },
    navigateTo(item) {}
  }
};
</script>

<style scoped lang="scss">
@import './../main.less';

.he-sticky {
  position: sticky;
  top: 0;
  margin-bottom: 16px;
  z-index: 10;
}

.he-search {
  border-radius: 0;
  margin: 0;
  padding: 24px 32px;
  position: relative;
  .he-input {
    width: 100%;
    height: 64px;
    background: #f7f7f7;
    border-radius: 32px;
    padding-left: 32px;
  }
  .he-button {
    position: absolute;
    top: 50%;
    width: 686px;
    background: transparent;
    left: 64px;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 28px;
    padding: 0;
    @extend .font-family-sc;
    font-weight: 500;
    color: #999999;
    .iconsearchbar_search {
      font-size: 28px;
      margin-right: 16px;
    }
  }
}

.he-list {
  padding: 0 20px 0 20px;
  overflow: hidden;
  .he-item {
    width: 710px;
    background: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .he-item__body {
    padding-bottom: 32px;
    height: 240px;
  }
  .he-item__name {
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 400;
    color: #353535;
    line-height: 1.3;
    margin: 31px 25px 0 25px;
  }
  .he-item__footer {
    padding: 0 24px 0 25px;
  }
  .he-item__price {
    font-size: 32px;
    @extend .font-family-sc;
    font-weight: 400;
    @include font_color('font_color');
    line-height: 1.6;
  }
  .he-commission {
    background-color: transparent;
    border: 1px solid #ff7c24;
    border-radius: 24px;
    font-size: 24px;
    font-weight: 500;
    @extend .font-family-sc;
    color: #ff7c24;
    height: 48px;
    line-height: 46px;
    padding: 0 25px;
  }
  .iconproductdetails_share {
    font-size: 22px;
    margin-right: 8px;
  }
}
</style>
