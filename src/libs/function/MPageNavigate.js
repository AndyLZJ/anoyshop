function MPageNavigate(item) {
    if (item.extend) {
        if (item.index == 2) {
            uni.navigateTo({
                url: item.path + '?id=' + item.param.id
            });
        }
        if (item.index == 7) {
            uni.navigateTo({
                url: item.path + '?id=' + item.param.id
            });
        }
        if (item.index == 3) {
            uni.navigateTo({
                url: item.path + '?group=' + item.param.id + '&goods_show=' + item.param.goods_show + '&name=' + item.param.name
            });
        }
        // #ifndef H5
        if (item.index === 10) {
            const roomId = [item.param.roomid];
            wx.navigateTo({
                url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}`
            });
        }
        // #endif
    } else {
        if (!item || item.length === 0) return;
        if ([3, 4, 5, 1].indexOf(item.index) == -1) {
            uni.navigateTo({
                url: item.path,
                fail: function(res) {
                    uni.switchTab({
                        url: item.path
                    });
                }
            });
        } else {
            uni.switchTab({
                url: item.path,
                fail: function(res) {
                    uni.navigateTo({
                        url: item.path
                    });
                }
            });
        }
    }
}

export default MPageNavigate;
