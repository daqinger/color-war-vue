<!-- 最初版本  websocket 连接 -->
<template>
  <div class="container">
    <div class="block">
      <!-- <span class="demonstration">Color Picker</span> -->

      <el-color-picker
        @active-change="pickerColor"
        @change="realChange"
        v-model="color"
      ></el-color-picker>
      <!-- <el-button @click="refreshDate">点击刷新</el-button> -->
      <!-- number:{{ number }} -->
    </div>
    <div class="holder" v-for="index1 of 20" :key="index1">
      <div
        v-for="index2 of 20"
        :key="index2"
        class="box"
        :style="'background-color:' + colors[index1 * 1 - 1][index2 * 1 - 1]"
        :positionX="index1 - 1"
        :positionY="index2 - 1"
        @click="clickBox($event)"
        @mouseover="holding($event)"
        @mouseleave="leave($event)"
      ></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 接收消息
import { createSocket } from "@/utils/websocket";

// const getsocketData = (e) => {
//   // 创建接收消息函数
//   let refreshList = e && e.detail.data;
//   refreshList = JSON.parse(refreshList);
//   console.log("refreshList:", refreshList);
//   for (let i = 0; i < refreshList.length; i++) {
//     let x = refreshList[i].positionX;
//     let y = refreshList[i].positionY;
//     let colorValue = refreshList[i].colorValue;
//     // 更新数据
//     this.$set(this.colors[x], y, colorValue);
//   }
// };

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      color: "#409EFF",
      colors: null,
      positionX: "",
      positionY: "",
      tempColor: "",
      lock: "",
      worker: null,
      number: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getsocketData(e) {
      // 创建接收消息函数
      let refreshList = e && e.detail.data;
      refreshList = JSON.parse(refreshList);
      console.log("refreshList:", refreshList);
      for (let i = 0; i < refreshList.length; i++) {
        let x = refreshList[i].positionX;
        let y = refreshList[i].positionY;
        let colorValue = refreshList[i].colorValue;
        // 更新数据
        this.$set(this.colors[x], y, colorValue);
      }
    },
    clickBox(e) {
      var x = e.target.getAttribute("positionX");
      var y = e.target.getAttribute("positionY");

      // 又点击了另一个
      if (this.lock != "") {
        // 先还原之前的颜色
        this.$set(this.colors[this.positionX], this.positionY, this.lock);
      }

      this.positionX = x;
      this.positionY = y;

      this.lock = this.tempColor;
      this.$set(this.colors[x], y, "#409EFF");
    },
    holding(e) {
      var x = e.target.getAttribute("positionX");
      var y = e.target.getAttribute("positionY");
      this.tempColor = this.colors[x][y];

      // 没有有锁定颜色  鼠标悬浮变色
      if (this.lock == "") {
        // 更新数据
        this.$set(this.colors[x], y, "#BEDDFC");
      }
      //不然什么都不做
    },
    leave(e) {
      var x = e.target.getAttribute("positionX");
      var y = e.target.getAttribute("positionY");

      // 如果没有锁定 离开变色
      if (this.lock == "") {
        this.colors[x][y] = this.tempColor;
      }
    },
    pickerColor(value) {
      this.colors[this.positionX][this.positionY] = value;
      this.color = value;
      this.lock = "";
    },
    refreshDate() {
      this.$http({
        url: this.$http.adornUrl("/gettempcolor"),
        method: "GET",
        data: null,
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // 更新列表
          const refreshList = data.data;
          console.log("refreshList:", refreshList);
          for (let i = 0; i < refreshList.length; i++) {
            let x = refreshList[i].positionX;
            let y = refreshList[i].positionY;
            let colorValue = refreshList[i].colorValue;
            // 更新数据
            this.$set(this.colors[x], y, colorValue);
          }

          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    realChange() {
      // 向后端发送消息
      if (this.color == null || this.color == "") {
        console.log("非法请求...");
        //还原颜色
        this.$set(this.colors[this.positionX], this.positionY, this.lock);
        this.lock = "";
      } else {
        console.log(
          "发送这些消息:",
          this.positionX,
          this.positionY,
          this.color
        );

        this.$http({
          url: this.$http.adornUrl("/save"),
          method: "POST",
          data: {
            positionX: this.positionX,
            positionY: this.positionY,
            colorValue: this.color,
          },
        }).then(({ data }) => {
          console.log("save:", data);
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    createSocket();
    // 注册监听事件
    window.addEventListener("onmessageWS", this.getsocketData);

    this.colors = Array(20)
      .fill("#ffffff")
      .map((x) => Array(20).fill("#ffffff"));
    // 发送请求
    this.$http({
      url: this.$http.adornUrl("/getallcolor"),
      method: "GET",
      data: null,
    }).then(({ data }) => {
      console.log("getAllColor:", data);
      if (data && data.code === 0) {
        this.colors = data.data;
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1500,
        });
      } else {
        this.$message.error(data.msg);
      }
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    // 在需要的时候卸载监听事件，比如离开页面
    window.removeEventListener("onmessageWS", this.getsocketData);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* 引入公共css类 */

.container {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 240, 240);
}

.holder {
  width: 1000px;
  height: 50px;
  margin: 0 auto;
}
.box {
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 0;
  padding: 0;
}
</style>