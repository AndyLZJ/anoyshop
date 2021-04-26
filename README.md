## 本周更新计划【20210420-20210423】
 **[点击查看本周更新计划](https://forum.leadshop.vip/thread/63)** 

## 更新历史
 **[点击查看V1.0.1更新内容](https://forum.leadshop.vip/thread/57)** 

 **Leadshop微信交流群** 

![微信交流群](https://images.gitee.com/uploads/images/2021/0423/141626_6e2da520_7426632.png "微信交流群.png")


 **qq交流群号：849894135** 

## 运行环境

# Leadshop微商城

## 论坛交流
地址:https://forum.leadshop.vip/

## 体验后台
地址:https://demo.leadshop.vip

账号:18888888888

密码:123456

## 运行环境

Linux+Nginx+PHP7.4+MySQL(5.6|5.7)

## 项目介绍
Leadshop是一款提供持续更新迭代服务的免费商城系统，旨在打造极致的用户体验！

Leadshop由浙江禾成云计算有限公司研发，主要面向中小型企业，助力搭建电商平台，并提供专业的技术支持。免费提供长期更新服务，应用涉及可视化装修、促销转化、裂变分销、用户精细化管理、数据分析等多个维度，追求极致体验，全面赋能商家，为商家创造价值。


## 主要特性
Leadshop 开源系统，基于Yii2开发，支持composer，优化核心，减少依赖，基于全新的架构思想和命名空间
* 基于命名空间和PSR-4规范，加入PHP7新特性
* 核心功能模块化，方便开发和维护
* 强化路由功能，采用RESTful接口标准
* 灵活创建模型控制器，易于扩展开发
* 配置文件可分离，方便管理
* 重写的自动验证和完成
* 简化扩展机制，提升开发速度
* API支持完善，方便二次开发
* 内置WeChat微信开发框架，微信接入更加快捷，简单
* 使用ORM自动创建表结构，提升开发速度
* 支持数据库结构、数据、模板在线缓存清除，提升用户体验
* 客户端完善的交互效果和动画，提升用户端视觉体验
* 支持在线一键安装，方便快捷。
* 可视化DIY店铺装修，方便、快捷、直观，可以随心所欲装扮自己的店铺
* 高效的笛卡尔乘积运算，8000条规格秒加载
* 拟态Windows文件夹的素材管理结构，操作更熟悉随心


## 开源无加密
基于Apache License 2.0开源协议，前后端代码开源无加密，支持二次开发，支持商用。

## 核心技术
前端技术栈 ES6、vue、vuex、vue-router、vue-cli、axios、element-ui、uni-app

后端技术栈 Yii2、Jwt、Mysql、Easy-SMS

## 接口标准
采用标准RESTful API ，高效的API阅读性，具有扩展性强、结构清晰的特点

## 数据交互
采用JSON API 标准，用以定义客户端如何获取与修改资源，以及服务器如何响应对应请求。高效实现的同时，无需牺牲可读性、灵活性和可发现性

## 认证方式
目前所有的接口使用 Oauth2 Password 方式，也就是 JWT Authorization Bearer header 进认证。支持扩语言扩展，多平台扩展。

## 数据表格导出
采用高性能的 js-xlsx数据导出，易于扩展，兼容性强。


接口文档：http://www.leadshop.vip/api.html


## 页面展示
![展示图](/readme/images/1.png)
![展示图](/readme/images/2.png)
![展示图](/readme/images/3.png)
![展示图](/readme/images/4.png)
![展示图](/readme/images/5.png)
![展示图](/readme/images/合成.mp4)
![展示图](/readme/images/6.png)
![展示图](/readme/images/合成2.mp4)
![展示图](/readme/images/7.png)
![展示图](/readme/images/8.png)
![展示图](/readme/images/9.png)
![展示图](/readme/images/10.png)
![展示图](/readme/images/11.png)
![展示图](/readme/images/12.png)
![展示图](/readme/images/13.png)


## 安装

### 一键安装
1.上传你的代码

2.项目目录设置755权限

3.设置伪静态规则(nginx 推荐使用)
```
location / {
    try_files $uri $uri/ /index.php$is_args$args;
}
```

注:如果使用Apache环境 需要在.htaccess 中添加
```
 SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```
否则会导致OAuth登录模式获取不到Authorization

4.设置代码执行目录为/server/web

5.在浏览器中输入你的域名或IP

( 例如：www.yourdomain.com/install )，安装程序会自动执行安装。期间系统会提醒你输入数据库信息以完成安装。

6.检查php禁用函数列表,symlink函数不能被禁用，否则后台页面无法访问。

7.后台访问地址：
域名/leadshop/panel/index

8.公众号首页访问地址：
域名/h5

### 重新安装
1. 清除数据库
2. 删除/server/install.lock 文件

## 目录说明
```
├─admin                             // 后台前端项目          
│  ├─public                       
│  └─src                          
│      ├─assets
│      │  ├─icons
│      │  └─images
│      ├─components
│      ├─lib
│      │  └─function
│      ├─mixins
│      ├─pages
│      │  ├─channel                        // 渠道
│      │  ├─error
│      │  ├─gallery
│      │  ├─goods                          // 商品
│      │  ├─login                          // 登入
│      │  ├─order                          // 订单
│      │  ├─package                        // 装修组件
│      │  ├─pages                          // 微页面
│      │  ├─panel                          // 首页
│      │  ├─setup                          // 设置
│      │  ├─store                          // 店铺
│      │  ├─tabbar                         // 底部导航
│      │  └─users                          // 用户
│      ├─plugins
│      ├─router
│      ├─store
│      ├─theme
│      │  └─fonts
│      └─utils
├─applet                                 //小程序项目                       
│  ├─public
│  ├─src
│  │  ├─colorui                          // CSS样式
│  │  │  └─components
│  │  ├─components
│  │  │  ├─goods-list                   // 商品列表
│  │  │  ├─he-html                      // 富文本
│  │  │  │  └─node
│  │  │  └─lime-painter
│  │  ├─libs
│  │  │  ├─function                    // 工具函数
│  │  │  └─mixin
│  │  ├─pages
│  │  │  ├─cart                        // 购物车页
│  │  │  ├─categories                  // 分类页
│  │  │  ├─fitment                     // 装修组件
│  │  │  ├─goods                       // 商品页
│  │  │  ├─greet
│  │  │  ├─index                       // 首页
│  │  │  ├─order                       // 订单页
│  │  │  ├─other                       // 其他页
│  │  │  ├─page                        // 微页面
│  │  │  └─user                        // 个人中心页
│  │  ├─static                         // 静态资源
│  │  │  ├─css
│  │  │  ├─h5                           // H5资源
│  │  │  ├─images
│  │  │  └─mp-weixin                    // 小程序资源
│  │  ├─store                           // vuex
│  │  └─utils
│  └─we7
├─install                               //安装程序
│  ├─public
│  └─src
│      ├─assets
│      │  └─css
│      └─components
└─server                                //后台接口项目
    ├─api                               //后台接口
    ├─app                               //客户端（微信小程序，公众号）
    ├─applet                            //打包后的微信小程序源码包
    ├─components                        //通用组件
    ├─config                            //配置文件目录
    ├─controllers                       //控制器
    ├─datamodel                         //模型
    ├─forms                             
    │  └─install
    ├─modules                           //模块     
    ├─stores                            //应用配置文件
    ├─system                            //系统核心目录
    │  ├─common
    │  ├─config
    │  ├─phpqrcode
    │  └─wechat
    ├─vendor                            //依赖
    ├─views
    │  ├─layouts
    │  └─site
    └─web
        ├─assets
        ├─h5                            //公众号编译包目录，其中index.php不可删除
        ├─install  
        ├─leadshop                      //后台编译包目录
        ├─static                        //静态文件
        ├─temp
        └─upload                        //上传文件
```

## 打包 
>建议使用cnpm，cnpm安装： npm install cnpm -g --registry=https://registry.npm.taobao.org
### 后台页面打包发布
后台前端源文件目录/admin

打包步骤

1、安装依赖包
npm install

2、运行调试
npm run serve

3、打包发布
npm run build

4、打包后把/admin/dist/build内所有文件复制到站点/server/web/leadshop目录下

### 公众号打包发布
后台前端源文件目录/applet

打包步骤

1、安装依赖包
npm install

2、运行调试
npm run serve

3、打包发布
npm run build:h5

4、复制
打包后把/applet/dist/build/h5内所有文件复制到站点/server/web/h5目录下

### 小程序打包发布
后台前端源文件目录/applet

打包步骤

1、安装依赖包
npm install

2、运行调试
npm run serve

3、打包发布
npm run build:mp-weixin

4、复制
打包后把/applet/dist/build/mp-weixin 打包成zip，重命名为app.zip，并放入/server/applet目录下覆盖之前的app.zip

## 使用须知

1.允许用于个人学习、毕业设计、教学案例、公益事业;

2.支持企业/个人免费商业使用，但必须保留leadshop版权信息;

## 版权信息

Powered By Leadshop © 2021
