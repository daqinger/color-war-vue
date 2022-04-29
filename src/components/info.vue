<template>
  <div class="mod-home">
    <div class="header-info">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <h3>项目介绍</h3>
        </div>
        <div class="text item">颜色大战</div>
        <div class="text item">
          在2017年4月1日愚人节,社交网站Reddit发布了一个全球性社会实验:每个用户每隔5分钟可以在一个1000x1000像素的画布上绘制一个色块..<el-link
            target="_blank"
            type="primary"
            href="https://www.bilibili.com/video/av71160863?from=search&seid=14889639180811676751&spm_id_from=333.337.0.0"
            >相关视频连接</el-link
          >
        </div>
        <div class="text item">基于上面的创意，便有了此项目.</div>
        <div class="text item">
          本站的UI框架使用的是:
          <el-link
            target="_blank"
            type="primary"
            href="https://element.eleme.cn/#/zh-CN"
            >Element UI.</el-link
          >
        </div>
        <div class="text item">
          因为我是个穷鬼，阿里云服务器就买了30天，所以本网站的过期时间是4.10
          预计打算测试稳定后,于今年愚人节正式上线, 提供 800*800画布.
        </div>
      </el-card>

      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <h3>异常汇报/修改意见</h3>
        </div>
        <div class="text item">
          网站正处于公测状态，如果有异常请联系作者 -- 微信:hobwarts
          (霍格沃兹hogwarts 的 g 转180°).
        </div>
        <div class="text item">
          正常且能实现的需求都会尽量满足哟~ 除了涉及玩法的要求.
        </div>
      </el-card>

      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <h3>作者</h3>
        </div>
        <div class="text item">
          <el-link
            href="https://blog.csdn.net/baidu_41860619?spm=3001.5343"
            target="_blank"
            >博客地址
            https://blog.csdn.net/baidu_41860619?spm=3001.5343.</el-link
          >
        </div>
        <!-- <div class="text item">移动电话：13222240503</div>

        <div class="text item">固定电话：61705</div> -->
      </el-card>
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <h3>更新日志</h3>
        </div>
        <el-timeline>
                  <el-timeline-item timestamp="2021.03.12" placement="top">
            <el-card>
              <h4>低端的手机适配版</h4>
              <p>将操作栏放到上面，不遮画面了。</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2021.03.12" placement="top">
            <el-card>
              <h4>网络带宽不够，试试40*40*100</h4>
              <p>太糟糕了......又是本地好好的线上跑不了！</p>
            </el-card>
          </el-timeline-item>

          <el-timeline-item timestamp="2021.03.12" placement="top">
            <el-card>
              <h4>
                将画布提升至
                40*40*400,目前64万个像素格子;增加项目说明页面,优化选色步骤.
              </h4>
              <p>今天风和日丽，是个敲代码的好日子</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2021.03.10" placement="top">
            <el-card>
              <h4>将redis存储总数据换成mongodb.</h4>
              <p>出现了莫名其妙丢失全部数据的情况..对不起我强哥.</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2022.03.09" placement="top">
            <el-card>
              <h4>网站正式上线.</h4>
              <p>40*40*16的一个小型画布.</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>

    <!-- <div class="block"> -->
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.mod-home {
  line-height: 1.5;

  background-color: rgb(247, 250, 223);
}
.header-info {
  margin-left: 50px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.mod-home .el-card {
  width: 78%;
}
/* .header-info{
 
} */
.header-info .el-card {
  margin-bottom: 30px;
}
</style>

