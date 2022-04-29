<!--主战场  -->
<template>
  <div class="container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select
            v-model="baseX"
            placeholder="选择区域横坐标"
            @change="onchangex"
          >
            <el-option
              v-for="item of 10"
              :key="item - 1"
              :label="item - 1"
              :value="item - 1"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="baseY"
            placeholder="选择区域纵坐标"
            @change="onchangey"
          >
            <el-option
              v-for="item of 10"
              :key="item - 1"
              :label="item - 1"
              :value="item - 1"
            >
            </el-option> </el-select
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-color-picker
            @active-change="pickerColor"
            @change="realChange"
            v-model="color"
          ></el-color-picker>
        </el-col>
        <el-col :span="12">
          <el-tag>{{ baseX }} - {{ baseY }} 号分区</el-tag>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24"> </el-col>
      </el-row>
    </el-card>
    <div class="holder" v-for="index1 of 40" :key="index1">
      <div
        v-for="index2 of 40"
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
// import { createSocket } from "@/utils/websocket";
import Stomp from "stompjs";
import {
  RABBITMQ_ADDRESS,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
} from "../../config/rabbitmq";

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
      client: null,
      rabbitExchange: "/exchange/color.exchange.0.0",
      baseX: 0,
      baseY: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onchange() {
      // 先断开当前连接
      this.client.disconnect();

      // 获取对应分区的数据
      this.getData(this.baseX, this.baseY);

      // 定义连接的交换机
      this.rabbitExchange =
        "/exchange/color.exchange." + this.baseX + "." + this.baseY;
      this.connect(); // 连接到rabbitmq
    },

    onchangex(value) {
      this.onchange();
    },
    onchangey(value) {
      this.onchange();
    },
    onConnected() {
      // 订阅
      this.client.subscribe(
        this.rabbitExchange,
        this.responseCallback,
        this.onFailed
      );
    },
    onFailed(msg) {
      console.log("rabbitmq连接失败:" + msg);
    },
    //成功时的回调函数
    responseCallback(msg) {
      //接收消息的处理
      console.log("收到的消息:" + msg.body);
      let refreshList = msg.body;
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
    //连接
    connect() {
      this.client = Stomp.client(RABBITMQ_ADDRESS);
      const headers = {
        login: RABBITMQ_USERNAME,
        password: RABBITMQ_PASSWORD,
      };
      this.client.connect(headers, this.onConnected, this.onFailed);
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
      // this.$set(this.colors[x], y, "#409EFF");
      this.$set(this.colors[x], y, this.color);
    },
    holding(e) {
      var x = e.target.getAttribute("positionX");
      var y = e.target.getAttribute("positionY");
      this.tempColor = this.colors[x][y];

      // 没有有锁定颜色  鼠标悬浮变色
      if (this.lock == "") {
        // 更新数据
        this.$set(this.colors[x], y, "#BEDDFC");
        // this.colors[x][y] = "#BEDDFC"
      }
      //不然什么都不做
    },
    leave(e) {
      var x = e.target.getAttribute("positionX");
      var y = e.target.getAttribute("positionY");

      // 如果没有锁定 离开变色
      if (this.lock == "") {
        // this.$set(this.colors[x], y, this.tempColor);
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
        this.$set(this.colors[this.positionX], this.positionY, this.color);
        this.lock = "";
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
            baseX: this.baseX,
            baseY: this.baseY,
          },
        }).then(({ data }) => {
          console.log("save:", data);
          if (data && data.code === 0) {
            this.$notify({
              title: "成功",
              message: "颜色选择成功！",
              type: "success",
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      }
    },
    getData(baseX, baseY) {
      this.$http({
        url: this.$http.adornUrl(
          "/getcolorforbattlefield/" + baseX + "/" + baseY
        ),
        method: "GET",
        data: null,
      }).then(({ data }) => {
        console.log("getAllColor:", data);
        if (data && data.code === 0) {
          this.colors = data.data;
          this.$message({
            message: "分区数据加载成功",
            type: "success",
            duration: 1500,
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.colors = Array(40)
      .fill("#ffffff")
      .map((x) => Array(40).fill("#ffffff"));
    // 发送请求
    this.getData(0, 0);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //挂载完成  搭载监听事件
    this.connect(); // 连接到rabbitmq
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    //卸载监听事件
    this.client.disconnect();
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* 引入公共css类 */

/* .container {
  width: 100%;
  height: 100%;
  
} */

.holder {
  width: 800px;
  height: 20px;
  margin: 0 auto;
}
.box {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.el-card {
  position: absolute;
  right: 20px;
  top: 200px;
  width: 300px;
}

.el-card .el-row {
  margin-top: 50px;
}
</style>