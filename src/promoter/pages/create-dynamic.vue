<template>
  <view class="he-page-content" :data-theme="theme">
    <view class="he-card content">
      <textarea
        :value="content"
        placeholder="请输入动态内容"
        class="he-textarea"
        :maxlength="200"
        :disable-default-padding="true"
        :hold-keyboard="true"
        @input="setTextarea"
      />
      <view class="he-area__num">{{ content.length }}/200</view>
    </view>
    <view class="he-card image">
      <view class="he-top">
        <text class="he-title">添加图片</text>
        <text class="he-number">({{ pic_list.length }}/9)</text>
      </view>
      <view class="he-bottom">
        <he-upload-image
          :sizeType="['compressed']"
          @on-remove="removeImage"
          @on-uploaded="uploaded"
          :max-count="9"
          ref="uploadImage"
          :max-size="getPicLimit"
        />
      </view>
    </view>
    <view class="he-card goods flex justify-between align-center" @click="routerDynamicGoods">
      <view class="flex flex-sub">
        <template v-if="$h.test.isEmpty(link.param)">
          <text class="iconfont iconpersonalcenter_add"></text>
          <text class="add-goods">添加商品</text>
        </template>
        <template v-else>
          <he-image :image-style="{
          borderRadius: '8rpx'
        }" :width="100" :height="100" :src="link.param.slideshow[0]"></he-image>
          <view class="item-content flex flex-direction justify-center">
            <view class="item-name he-line-1">{{ link.param.name }}</view>
            <view class="item-price">￥{{ link.param.price }}</view>
          </view>
          <view class="flex-sub item-change">更改</view>
        </template>
      </view>
      <text class="iconfont iconbtn_arrow"></text>
    </view>
    <button class="cu-btn publish-dynamic" :disabled="submitDisabled" @click="publishDynamic">发布动态</button>
    <view class="safe-area-inset-bottom"/>
  </view>
</template>

<script>
import heUploadImage from './../../components/he-upload-image.vue';
import {mapGetters} from 'vuex';
import {dynamicDetail, dynamicEdit, publishDynamic} from '../api.js';

export default {
  name: 'create-dynamic',
  components: {
    heUploadImage
  },
  data() {
    return {
      content: '',
      pic_list: [],
      link: {
        param: null
      },
      id: null,
    };
  },
  computed: {
    ...mapGetters('setting', {
      getPicLimit: 'getPicLimit'
    }),
    submitDisabled({content, $h}) {
      return $h.test.isEmpty(content);
    }
  },
  methods: {
    // 删除图片
    removeImage: function (index) {
      this.pic_list.slice(index, 1);
      this.$delete(this.pic_list, index);
      // console.log(this.pic_list);
    },
    // 添加图片回调赋值
    uploaded: function (list) {
      this.pic_list = list.map(function (item) {
        return item.response;
      });
    },
    async publishDynamic() {
      try {
        if (this.id) {
          await dynamicEdit(this.id, {content: this.content, pic_list: this.pic_list, link: this.link});
          uni.navigateBack({
            delta: 1
          });
        } else {
          await publishDynamic({content: this.content, pic_list: this.pic_list, link: this.link});
          uni.navigateBack({
            delta: 1
          });
        }
      } catch (e) {
        //  Don't do
      }
    },
    setTextarea(event) {
      let str = event.detail.value;
      if (str.length > 200) {
        str = str.substring(0, 200);
      }
      this.content = str;
    },
    routerDynamicGoods() {
      uni.navigateTo({
        url: '/promoter/pages/dynamic-goods'
      });
    }
  },
  onShow() {
    this.link = uni.getStorageSync(this.$storageKey.dynamic_goods);
    uni.removeStorageSync(this.$storageKey.dynamic_goods);
  },
  async onLoad(option) {
    if (option.id) {
      try {
        this.id = option.id;
        const {content, pic_list, link} = await dynamicDetail(option.id);
        this.content = content;
        this.pic_list = pic_list;
        this.link = JSON.parse(link);
        this.$refs.uploadImage.lists = pic_list.map(item => {
          return {
            url: item
          }
        });
        console.log(this.link)
      } catch (e) {

      }
    } else if (option.data) {
      console.log(JSON.parse(option.data));
      const {pic_list, content, type, video_cover, video_list} = JSON.parse(option.data);
      this.content = content;
      if (type === 1) {
        this.$refs.uploadImage.lists = pic_list.map(item => {
          return {
            url: item
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import './../main.less';

.he-page-content {
  padding: 20px;
}

.content {
  padding: 24px;

  .he-textarea {
    width: 662px;
    height: 280px;
  }

  .he-area__num {
    font-size: 24px;
    font-weight: 500;
    @extend .font-family-sc;
    color: #999999;
    line-height: 1.1;
    text-align: right;
  }
}

.image {
  padding: 0 0 24px 24px;

  .he-top {
    height: 72px;
    @extend .font-family-sc;
    line-height: 72px;
    font-size: 26px;
    font-weight: 500;

    .he-title {
      color: #222222;
    }

    .he-number {
      color: #999999;
      margin-left: 15px;
    }
  }
}

.goods {
  padding: 24px;

  .iconpersonalcenter_add {
    font-size: 28px;
    color: #d7d7d7;
    margin-right: 18px;
  }

  .iconbtn_arrow {
    font-size: 20px;
    color: #bebebe;
  }

  .add-goods {
    font-size: 28px;
    @extend .font-family-sc;
    font-weight: 500;
    color: #222222;
    line-height: 36px;
  }
}

.item-content {
  width: 420px;
  height: 100px;
  margin-left: 24px;
}

.item-name {
  font-size: 26px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #222222;
  line-height: 48px;
}

.item-price {
  font-size: 22px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #999999;
  line-height: 40px;
}

.item-change {
  height: 100px;
  line-height: 100px;
  font-size: 22px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #999999;
  padding-left: 45px;
}

.publish-dynamic {
  margin-top: 80px;
  width: 100%;
  height: 80px;
  font-size: 28px;
  @extend .font-family-sc;
  font-weight: 500;
  color: #ffffff;
  border-radius: 40px;
  @include background_color('background_color');

  &[disabled] {
    background: #cccccc !important;
    color: #ffffff;
  }
}
</style>
