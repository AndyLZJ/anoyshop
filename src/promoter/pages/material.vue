<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-sticky">
      <view class="he-search he-card">
        <input type="text" class="he-input" v-model="content" :focus="showInput" @blur="blurInput"/>
        <button
          v-if="!showInput"
          @click="openInput"
          class="cu-btn he-button flex align-center justify-start">
          <text class="iconfont iconsearchbar_search"/>
          <text>输入商品名称搜索</text>
        </button>
      </view>
      <view class="he-switch flex">
        <view
          class="flex-sub"
          id="he-switch--0"
          :class="{ active: currentIndex === 0 }"
          @click="clickTab(0)">
          全部
        </view>
        <view
          class="flex-sub"
          id="he-switch--1"
          :class="{ active: currentIndex === 1 }"
          @click="clickTab(1)">
          图片
        </view>
        <view
          class="flex-sub"
          id="he-switch--2"
          :class="{ active: currentIndex === 2 }"
          @click="clickTab(2)">
          视频
        </view>
        <view class="he-line" :style="[tabBarStyle]"/>
      </view>
    </view>
    <view class="he-list">
      <view class="he-item" v-for="(item, index) in list" :key="index">
        <view :class="[{ 'he-line-4': !item.unfold }, 'content']">
          {{ item.content }}
          <template v-if="item.too_long">
            <view class="block" v-if="!item.unfold">
              &nbsp;&nbsp;&nbsp;...&nbsp;
              <button class="cu-btn" @click="expandCollapse(item)">展开</button>
            </view>
            <button class="cu-btn unfold" @click="expandCollapse(item)">收起</button>
          </template>
        </view>
        <!-- 图片 -->
        <view class="he-images flex flex-wrap" v-if="item.type === 1">
          <he-image
            class="he-img"
            :image-style="{ borderRadius: '8rpx' }"
            :width="218"
            :height="218"
            v-for="(image, key) in item.pic_list"
            :key="key"
            :src="image"
          />
        </view>
        <!-- 视频 -->
        <view class="he-video" v-else-if="item.type === 2">
          <listVideo
            :index="item.id"
            v-model="videoCurrent"
            :src="item.video_list.url"
            :poster="item.video_cover"
          />
        </view>
        <view class="flex he-footer align-center justify-between">
          <view>
            <button class="cu-btn he-jump">查看商品</button>
            <text class="he-share--count">分享{{ item.share_count }}</text>
          </view>
          <view>
            <button class="cu-btn he-btn" @click="hairpin(item)">一键发圈</button>
            <button class="cu-btn he-btn" @click="routerCreateDynamic">发动态</button>
          </view>
        </view>
      </view>
      <he-load-more
        v-if="list.length > 0"
        :margin-top="39"
        :margin-bottom="39"
        :status="loadStatus"/>
      <view class="safe-area-inset-bottom"/>
    </view>
    <he-no-content-yet v-if="isNothing" text="暂未相关素材"/>
    <he-save-loading title="正在保存图片…" v-model="loading"/>
  </view>
</template>

<script>
import heNoContentYet from './../../components/he-no-content-yet.vue';
import heLoadMore from './../../components/he-load-more.vue';
import heSaveLoading from './../../components/he-save-loading.vue';
import listVideo from './components/video.vue';
import {promotermaterial} from '../api';

export default {
  name: 'material',
  components: {
    heNoContentYet,
    heLoadMore,
    heSaveLoading,
    listVideo
  },
  data() {
    return {
      content: '',
      scrollBarLeft: 0,
      showInput: false,
      barFirstTimeMove: true,
      tabQueryInfo: null,
      currentIndex: 0,
      tabWidth: 0,
      list: [],
      loadStatus: 'loadmore',
      isNothing: false,
      loading: false,
      page: {}
    };
  },
  computed: {
    tabBarStyle({barFirstTimeMove, scrollBarLeft}) {
      return {
        transform: `translate(${scrollBarLeft}px, -100%)`,
        'transition-duration': `${barFirstTimeMove ? 0 : '0.5s'}`
      };
    }
  },
  onLoad() {
    this.init();
  },
  methods: {
    init() {
      this.getTabRect();
      this.getList().then(() => {
        console.log('gbhsdyhsdh ')
        this.isNothing = this.list.length === 0;
      });
    },
    // 获取列表
    async getList() {
      try {
        const response = await promotermaterial(this.page.current, this.currentIndex, this.content)
        const {data, pagination} = response;
        data.forEach(item => {
          let line = uni.upx2px(686) * 4;
          if (line - uni.upx2px(30) * item.content.length < 0) {
            item.too_long = true;
            item.unfold = false;
          }
        });
        this.page = pagination;
        this.list = this.list.concat(data);
      } catch (e) {
        //  Don't do
      }
    },
    // 展开收起
    expandCollapse(item) {
      item.unfold = !item.unfold;
    },
    // input失去焦点搜索
    blurInput() {
      if (this.$h.test.isEmpty(this.content)) {
        this.showInput = false;
      }
      this.page.current = 1;
      this.getList();
    },
    // 打开input搜索
    openInput() {
      this.showInput = !this.showInput;
      this.list = [];
    },
    // 点击tab
    clickTab(index) {
      this.currentIndex = index;
      this.page.current = 1;
      this.scrollByIndex();
      this.list = [];
      this.getList().then(() => {
        this.isNothing = this.list.length === 0;
      });
    },
    // 查询tab的布局信息
    getTabRect() {
      let query = uni.createSelectorQuery().in(this);
      for (let i = 0; i < 3; i++) {
        query.select(`#he-switch--${i}`).fields({
          size: true,
          rect: true
        });
      }
      query.exec(
        function (res) {
          this.tabQueryInfo = res;
          this.scrollByIndex();
        }.bind(this)
      );
    },
    // tab滚动动画
    scrollByIndex() {
      let tabInfo = this.tabQueryInfo[this.currentIndex];
      if (!tabInfo) return;
      let left = tabInfo.left + uni.upx2px(228) / 2;
      this.scrollBarLeft = left - uni.upx2px(228) / 4;
      if (this.barFirstTimeMove === true) {
        setTimeout(() => {
          this.barFirstTimeMove = false;
        }, 100);
      }
    },
    // 去新建动态
    routerCreateDynamic() {
      uni.navigateTo({
        url: '/promoter/pages/create-dynamic'
      });
    },
    // 一键发圈
    hairpin(item) {
      const self = this;
      if (item.type === 1) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            self.loading = true;
            self.saveFile(item.pic_list);
          }
        });
      }
    },
    // 存文件
    saveFile(data) {
      const self = this;
      let images = JSON.parse(JSON.stringify(data));
      const image = images.splice(0, 1)[0];
      wx.downloadFile({
        url: image,
        success(response) {
          wx.saveImageToPhotosAlbum({
            filePath: response.tempFilePath,
            success() {
              if (images.length > 0) {
                self.saveFile(images);
              } else {
                self.loading = false;
                uni.showToast({
                  title: '文案已复制， 图片已保存',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail(error) {
              console.log(error);
            }
          });
        }
      });
    }
  },
  onReachBottom() {
    let _this = this;
    if (this.page.pageCount > this.page.current) {
      this.page.current++;
      this.loadStatus = 'loading';
      this.getList().then(() => {
        _this.loadStatus = 'loadmore';
      });
    } else {
      this.loadStatus = 'nomore';
    }
  }
};
</script>

<style scoped lang="scss">
@import '../main.less';

.he-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

.he-search {
  width: 750px;
  height: 112px;
  padding: 24px 32px;
  position: relative;
  margin-bottom: 0;

  .he-input {
    width: 686px;
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

.he-switch {
  padding: 0 32px;
  height: 114px;
  text-align: center;
  position: relative;
  background: #f5f5f5;

  .he-line {
    width: 52px;
    height: 4px;
    @include background_color('background_color');
    position: absolute;
    bottom: 24px;
  }

  .active {
    @include font_color('font_color');
  }

  .flex-sub {
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    line-height: 114px;
    transition-delay: 0.1s;
  }
}

.he-list {
  width: 750px;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  padding: 0 32px 0 32px;
  overflow: hidden;
}

.he-item {
  border-bottom: 1px solid #e5e5e5;
  padding: 45px 0 24px 0;

  .content {
    font-size: 30px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 40px;
    margin-bottom: 24px;
    word-break: break-all;
    position: relative;

    .block {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #ffffff;
    }

    .cu-btn {
      height: auto;
      padding: 0;
      @extend .font-family-sc;
      font-weight: 500;
      font-size: 30px;
      color: #3273ea;
      line-height: 40px;
      background-color: #ffffff;
    }

    .unfold {
      display: inline-block;
    }
  }

  .he-images {
    margin: 24px 0 8px 0;

    .he-img {
      margin-bottom: 16px;

      &:not(:nth-child(3n)) {
        margin-right: 16px;
      }
    }
  }

  .he-video {
    margin: 0 0 24px 0;
  }

  .he-footer {
    height: 80px;

    .he-jump {
      padding: 0;
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #3273ea;
      background-color: transparent;
    }

    .he-share--count {
      font-size: 28px;
      @extend .font-family-sc;
      font-weight: 500;
      color: #cccccc;
      margin-left: 24px;
    }

    .he-btn {
      font-size: 24px;
      font-weight: 500;
      @include font_color('font_color');
      @include border_color('border_color');
      @extend .font-family-sc;
      border: 1px solid transparent;
      background: #ffffff;
      border-radius: 28px;
      padding: 0 24px;
      height: 56px;
      line-height: 54px;

      &:nth-child(2) {
        margin-left: 16px;
      }
    }
  }
}
</style>
