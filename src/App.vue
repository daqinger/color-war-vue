<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/battlefield">主战场</el-menu-item>
      <el-menu-item index="/phonefield">手机专区</el-menu-item>
      <el-menu-item index="/info">项目说明</el-menu-item>
      <el-menu-item index="/howtodo" >操作手册</el-menu-item>
      <el-menu-item index="5" disabled>登录/注册</el-menu-item>
      
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: rgb(206, 205, 205); */
  height: 1000px;
  background-color: rgb(247, 250, 223);
}
.el-menu {
  margin-bottom: 50px;
}
</style>
