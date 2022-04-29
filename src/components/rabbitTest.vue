<!-- 测试使用rabbitmq连接的可行性  -->
<template>
  <div class="">hello~~~</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Stomp from "stompjs";
import {
  RABBITMQ_ADDRESS,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_EXCHANGE
} from "../../config/rabbitmq";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      client: Stomp.client(RABBITMQ_ADDRESS),
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onConnected() {
      // 订阅
      this.client.subscribe(RABBITMQ_EXCHANGE, this.responseCallback, this.onFailed);
    },
    onFailed(msg) {
      console.log("rabbitmq连接失败:" + msg);
    },
    //成功时的回调函数
    responseCallback(msg) {
      //接收消息的处理
      console.log("收到的消息:" + msg.body);
    },
    //连接
    connect() {
      const headers = {
        login: RABBITMQ_USERNAME,
        password: RABBITMQ_PASSWORD,
      };
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.connect();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
/* 引入公共css类 */
</style>