<template>
  <view class="he-page-content">
    <image class="header-bg" :src="rank.bg_url"></image>
    <view class="body">
      <view class="latitude flex align-end" v-if="rankingDimension.length > 1">
        <view
          class="flex-sub item"
          :style="[latitudeStyle(index)]"
          @click="switchLatitude(item)"
          :class="{ active: item.value === latitude.value }"
          v-for="(item, index) in rankingDimension"
          >{{ item.name }}</view
        >
      </view>
      <view class="when flex justify-around">
        <view class="when-item flex-sub" @click="switchWhen(1)" :class="[{ active: when === 1 }]">今日</view>
        <view class="when-item flex-sub" @click="switchWhen(2)" :class="[{ active: when === 2 }]">昨日</view>
        <view class="when-item flex-sub" @click="switchWhen(3)" :class="[{ active: when === 3 }]">本月</view>
        <view class="when-item flex-sub" @click="switchWhen(4)" :class="[{ active: when === 4 }]">汇总</view>
      </view>
      <view class="rank-yourself flex">
        <view class="title"
          >我的
          <br />
          排名</view
        >
        <he-image
          :width="80"
          :height="80"
          :image-style="{
            borderRadius: '50%'
          }"
        ></he-image>
        <view class="content">
          <view class="name">法外狂徒张三</view>
          <view class="info">
            <text>累计佣金:￥56.29</text>
            <text>排名: 4</text>
          </view>
        </view>
      </view>
      <view class="table">
        <view class="table-head flex">
          <view class="col">排名</view>
          <view class="col">用户</view>
          <view class="col">累计佣金</view>
        </view>
        <view class="table-body">
          <view class="row flex" v-for="(item, index) in 50" :key="index">
            <view class="col" :class="[index < 2 ? 'flex align-center justify-center' : '']">
              <template v-if="index > 2">{{ index + 1 }}</template>
              <template v-else>
                <image class="rank-place" :src="index | rankIconFilter(ipAddress)"></image>
              </template>
            </view>
            <view class="col flex align-center">
              <view class="avatar flex align-center justify-center" :style="[avatarStyle(index)]">
                <he-image
                  :image-style="{
                    borderRadius: '50%'
                  }"
                  :width="80"
                  :height="80"
                ></he-image>
              </view>
              <view class="name">侯靖靖</view></view
            >
            <view class="col number">￥1482.62</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'leaderboard',
  data() {
    return {
      hCurrent: 1,
      when: 1,
      latitude: ''
    };
  },
  computed: {
    ...mapGetters({
      rank: 'setting/getPromoterRank'
    }),
    avatarStyle() {
      let style = {};
      return index => {
        if (index === 0) {
          style.backgroundColor = '#FFE692';
        } else if (index === 1) {
          style.backgroundColor = '#BEC1D1';
        } else if (index === 2) {
          style.backgroundColor = '#FAB56F';
        } else {
          style.backgroundColor = 'transparent';
        }
        return style;
      };
    },
    rankingDimension({ rank }) {
      const list = rank.ranking_dimension.map(item => {
        console.log(item);
        if (item === 'total_bonus') {
          return {
            name: '累计佣金',
            value: item
          };
        } else if (item === 'total_money') {
          return {
            name: '累计销售金额',
            value: item
          };
        } else if (item === 'all_children') {
          return {
            name: '当前下线',
            value: item
          };
        }
      });
      return list;
    },
    latitudeStyle({ latitude }) {
      return index => {
        const key = this.rankingDimension.findIndex(item => {
          if (item.value === latitude.value) {
            return item;
          }
        });
        const style = {};
        if ((key === 1 && index === 0) || (key === 2 && index === 1)) {
          style.borderBottomRightRadius = '16rpx';
        }
        return style;
      };
    }
  },
  mounted() {
    console.log(this.rank);
    this.latitude = this.rankingDimension[0];
  },
  methods: {
    switchWhen(when) {
      this.when = when;
    },
    switchLatitude(item) {
      this.latitude = item;
    }
  },
  filters: {
    rankIconFilter: function (rank, ipAddress) {
      let str = '';
      if (rank === 0) {
        str = 'first';
      } else if (rank === 1) {
        str = 'second';
      } else if (rank === 2) {
        str = 'third';
      }
      return ipAddress + '/' + str + '-place.png';
    }
  }
};
</script>

<style scoped lang="less">
@import '../main.less';

.he-page-content {
  background-color: orange;
}

.header-bg {
  width: 750px;
  height: 400px;
  position: sticky;
  top: 0;
  display: block;
}

.body {
  width: 750px;
  // height: 1400px;
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;
  margin-top: -88px;
  position: relative;
  z-index: 10;
  // 解决父子元素margin-top失效问题
  &::before {
    display: block;
    content: ' ';
    overflow: hidden;
  }
  .latitude {
    height: 70px;
    background-color: #ffffff;
    .item {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      background-color: #4267b4;
      &.active {
        background-color: #ffffff;
        height: 88px;
        border-radius: 16px 16px 0 0;

        color: #222222;
        & + .item {
          // background: bor;
          border-bottom-left-radius: 16px;
        }
      }
    }
  }
  .when {
    margin: 32px 32px 40px 32px;
    width: 686px;
    height: 72px;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    overflow: hidden;
    .when-item {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 70px;
      text-align: center;
      background-color: #f5f5f5;
      &:not(:last-child) {
        border-right: 1px solid #e5e5e5;
      }
      &.active {
        background: #ffffff;
      }
    }
  }
  .rank-yourself {
    width: 686px;
    // height: 140px;
    background: #ffffff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
    border-radius: 16px;
    margin: 0 32px 48px 32px;
    padding: 32px 30px;
    .title {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-right: 25px;
    }
    .content {
      margin-left: 32px;
      .name {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 48px;
      }
      .info {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 32px;
        text:first-child {
          margin-right: 15px;
        }
      }
    }
  }

  .table {
    padding: 0 32px;
  }
  .table-head {
    height: 64px;
    line-height: 64px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-bottom: 24px;
  }
  .col {
    // background-color: red;
    &:first-child {
      width: 96px;
      text-align: center;
    }
    &:nth-child(2) {
      width: 320px;
      padding-left: 23px;
    }
    &:last-child {
      width: 238px;
      text-align: right;
      padding-right: 22px;
    }
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
  .table-body {
    .row {
      height: 88px;
      line-height: 88px;
      margin-bottom: 32px;
      .rank-place {
        width: 56px;
        height: 56px;
      }
      .avatar {
        width: 84px;
        height: 84px;
        border-radius: 50%;
      }
      .name {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 21px;
      }
      .number {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
  }
}
</style>
