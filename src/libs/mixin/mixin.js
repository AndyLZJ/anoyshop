import { mapGetters } from 'vuex';

module.exports = {
  data() {
    return {
      ipAddress: 'https://qmxq.oss-cn-hangzhou.aliyuncs.com'
    };
  },
  computed: {
    // 店铺信息
    ...mapGetters('setting', {
      storeSetting: 'storeSetting',
      getBasicSetting: 'getBasicSetting',
      goodsSetting: 'goodsSetting',
      theme: 'getTheme',
      getTabBar: 'getTabBar',
      shareSetting: 'shareSetting',
      getSys: 'getSys'
    }),
    isLogin: function () {
      return this.$store.state.apply.is_login;
    },
    themeColor: function () {
      let theme = {
        red_theme: '#E60B30',
        purple_theme: '#8F2DF3',
        blue_theme: '#33A7FF',
        green_theme: '#1FC551',
        orange_theme: '#FF7F00',
        golden_theme: '#CAA45A'
      };
      return theme[this.theme];
    },
    isBarGoods: function () {
      if (!this.getTabBar) return;
      for (let i = 0; i < this.getTabBar.length; i++) {
        if (this.getTabBar[i].link.path === '/pages/goods/list') {
          return true;
        }
      }
      return false;
    }
  },
  onLoad(options) {
    // getRect挂载到$h上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$h.getRect = this.$hGetRect;
    console.log('获取加载页面的参数', options);
    //判断是否有用户要求记录
    if (options && options.task_uid) {
      console.log('执行需要邀请好友统计处理');
      if (this.isLogin && this.$store.state.apply.userInfo.id != options.task_uid) {
        this.$store
          .dispatch('plugins/onInvite', { UID: options.task_uid })
          .then(res => {
            console.log('统计邀请好友积分', res);
          })
          .catch(error => {
            console.log('统计邀请好友积分错误信息', error);
          });
      } else {
        console.log('不能邀请自己');
      }
    }
    console.log(this.shareSetting);
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $hGetRect(selector, all) {
      return new Promise(resolve => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
    // 报错跳转页面
    $toError: function (err) {
      let { data, status } = err;
      if (status === 422) {
        this.$h.toast(data[0].message);
      } else if (status === 403) {
        this.$h.toast(data.message);
      }
    },
    $shareAppMessage: function (args) {
      console.log(this.shareSetting);
      args = args || {
        title: this.shareSetting?.describe
          ? this.shareSetting?.describe
          : `欢迎光临${this.storeSetting?.name} 挑选好物`,
        path: '/pages/index/index',
        imageUrl: this.shareSetting.cover_img ? this.shareSetting?.cover_img : this.storeSetting?.logo
      };
      if (this.isLogin && args && args.path) {
        console.log('判断成功，需要添加分享链接');
        this.toTaskonShare();
        //处理统一传参问题
        if (args.path.indexOf('?') == -1) {
          console.log('有直接参数');
          args.path = args.path + '?task_uid=' + this.$store.state.apply.userInfo.id;
        } else {
          console.log('没有直接参数');
          args.path = args.path + '&task_uid=' + this.$store.state.apply.userInfo.id;
        }
      }
      console.log('打印分享链接', args.path);
      return args;
    },
    uniCopy: function ({ content, success, error }) {
      if (!content) return error('the content can not be blank');
      content = typeof content === 'string' ? content : content.toString();
      // #ifndef H5
      uni.setClipboardData({
        data: content,
        success: function () {
          success && success('Copy successfully');
          uni.showToast({
            title: '内容已复制',
            icon: 'none'
          });
        },
        fail: function () {
          error && error('Copy failed');
        }
      });
      // #endif

      // #ifdef H5
      if (!document.queryCommandSupported('copy')) {
        error && error('Browser does not support');
      }
      let textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.readOnly = 'readOnly';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, content.length);
      let result = document.execCommand('copy');
      if (result) {
        uni.showToast({
          title: '内容已复制',
          icon: 'none'
        });
        success && success('Copy successfully');
      } else {
        error && error('Copy failed');
      }
      textarea.remove();
      // #endif
    },
    // 设置缓存
    setStorageSync: function (key, data) {
      try {
        uni.setStorageSync(key, data);
      } catch (e) {
        console.error(e);
      }
    },
    // 获取缓存
    getStorageSync: function (key) {
      try {
        return uni.getStorageSync(key);
      } catch (e) {
        console.error(e);
      }
    },
    previewImage: function () {},
    toTaskonShare() {
      //用于延时测试数据
      setTimeout(res => {
        let task_status = this.$manifest('task', 'status');
        let that = this;
        if (task_status) {
          this.$store
            .dispatch('plugins/onShare')
            .then(res => {
              console.log('执行了分享转发公共合计', res);
            })
            .catch(error => {});
        }
      }, 1000);
    }
  },
  // #ifdef MP-WEIXIN
  onShareAppMessage() {
    return this.$shareAppMessage();
  },
  onShareTimeline() {
    return this.$shareAppMessage();
  },
  onAddToFavorites() {
    return {
      title: this.storeSetting.name,
      path: '/pages/index/index',
      imageUrl: this.storeSetting.logo
    };
  }
  // #endif
};
