/*
 * @Description: 
 * @Author: fjt
 * @Date: 2021-06-05 10:25:41
 * @LastEditTime: 2021-06-05 11:36:02
 * @LastEditors: fjt
 */

const saveImage = (image) => {
    uni.downloadFile({
        url: image,
        success(response) {
            if (response.statusCode === 200) {
                uni.saveImageToPhotosAlbum({
                    filePath: response.tempFilePath,
                    success() {
                        uni.showToast({
                            title: '已保存到相册',
                            icon: "success",
                            duration: 2000
                        });
                    },
                    fail(err) {
                        console.log(err);
                    }
                });
                // 图片不存在
            } else {
            }
        }
    });
}
module.exports = {
    methods: {
        saveImageToPhotosAlbum: function (image) {
            uni.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.writePhotosAlbum']) {
                        saveImage(image);
                    } else if (!res.authSetting['scope.writePhotosAlbum']) {
                        uni.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success() {
                                saveImage(image);
                            },
                            fail(err) {
                                console.log(err);
                            },
                            complete(res) {
                                console.log(res);
                            }
                        });
                    }
                }
            })
        }
    }
}