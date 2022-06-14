# color-war
> 介绍

在2017年4月1日愚人节,社交网站Reddit发布了一个全球性社会实验:每个用户每隔5分钟可以在一个1000x1000像素的画布上绘制一个色块... [相关视频连接](https://www.bilibili.com/video/av71160863?from=search&seid=14889639180811676751&spm_id_from=333.337.0.0)

基于上面的创意，便有了此项目。

前端采用 VUE+ [Element UI](https://element.eleme.cn/#/zh-CN)

> 简陋的操作说明

1. 玩法：每人每次只能填一个格子（因为是想复现原来网站的创意，而不是一个画画网站）

2. 目前的设定：主页和分区更新时间是1分钟 ，一个分区数据推送时间是30s，所以您画的格子刷新后在主页看不到，不要着急，那也许是还没更新

3. 注意事项：只有一点，，提交数据的契机只有打开选色板，点击确认后才会提交！！！！点击确认后才会提交！！！！点击确认后才会提交！！！！

### 项目截图

> 项目首页，目前是400*400 像素，可随时扩展

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/4.png)

> 主战场

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/3.png)

> 移动端适配

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/5.png)

> 项目上线的时候，网友们(同学、家人)的优秀作品合集

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/6.jpg)

> 最终样子

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/7.png)

> 定时任务截图

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/1.png)

> 定时任务执行情况截图

![images](https://read-me.oss-cn-hangzhou.aliyuncs.com/project/color-war/2.png)

> 构建方法

如果您只是想本地运行，在安装node.js 和 vue的前提下，只需执行以下两步：

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

如果您想将其打包放到nginx等服务器，打包命令如下:
``` bash
# build for production with minification
npm run build

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
