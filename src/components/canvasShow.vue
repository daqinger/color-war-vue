<!--本来想更完善的主页，后来想想还是算了，没什么人用  -->
<template>
  <div class="container" v-loading="loading">
    <canvas id="canvas"></canvas>
    <!-- <div class="buttom">
      <div class="holder">
        <el-slider v-model="value" :step="10" :marks="marks" show-stops disabled>
        </el-slider>
      </div>
    </div> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//  var canvas = document.getElementById("mycanvas")

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: 100,
      loading: true,
      marks: {
        0: "0 min",
        10: "10 min",
        20: "20 min",
        100: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "Latest"),
        },
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initCanvas() {
      // const loading = this.$loading({
      //     lock: true,
      //     text: '首页渲染中',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });

      var canvas = document.getElementById("canvas");
      canvas.width = 400;
      canvas.height = 400;
      // 绘制在Canvas上
      var context = canvas.getContext("2d");
      var imagedata = context.createImageData(400, 400);
      this.$http({
        url: this.$http.adornUrl("/getcolorforhome"),
        method: "GET",
        data: null,
      }).then(({ data }) => {
        console.log("getAllColor:", data);
        data = data.data;

        // 给对应坐标位置的数据设置色值为绿色
        for (var x = 0; x < data.length; x++) {
          for (var y = 0; y < data[x].length; y++) {
            // debugger;
            var index = 4 * (x * 400 + y);
            var color = data[x][y].substr(1);
            // 变为绿色，色值依次是0, 128, 0, 256
            imagedata.data[index] = parseInt(color.substr(0, 2), 16);
            imagedata.data[index + 1] = parseInt(color.substr(2, 2), 16);
            imagedata.data[index + 2] = parseInt(color.substr(4, 2), 16);
            imagedata.data[index + 3] = 256;
          }
        }

        // 再重绘
        context.putImageData(imagedata, 0, 0);

        this.loading = false;
      });
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initCanvas();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.container {
  text-align: center;
}
/* 引入公共css类 */
.buttom {
  width: 100%;
  position: absolute;
  bottom: 50px;
}
.holder {
  /* position: absolute;
  bottom: 100px; */
  width: 1000px;
  margin: 0 auto;
}
</style>