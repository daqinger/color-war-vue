<!-- 简陋的操作说明 -->
<template>
  <div class="mod-home">
    <div class="header-info">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <h3>简陋的操作说明</h3>
        </div>

        <div class="text item">
          1.玩法：每人每次只能填一个格子（因为是想复现原来网站的创意，而不是一个画画网站）
        </div>
        <div class="text item">
          2.目前的设定：主页和分区更新时间是1分钟
          ，一个分区数据推送时间是30s，所以您画的格子刷新后在主页看不到，不要着急，那也许是还没更新
        </div>
        <div class="text item">
          3.注意事项：只有一点，，提交数据的契机只有打开选色板，点击确认后才会提交！！！！点击确认后才会提交！！！！点击确认后才会提交！！！！
        </div>
        <div class="text item">4.我写累了，该去享受这风和日丽的下午了.</div>
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

