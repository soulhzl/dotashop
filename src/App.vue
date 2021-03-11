<template>
  <div id="app">
    <keep-alive exclude="GoodsMess,CategoryPage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import JWTDecode from 'jwt-decode'
export default {
  mounted() {
    // 判断是否有token
    if (localStorage.eleToken) {
      // 将token解析
      const decoded = JWTDecode(localStorage.eleToken);
      this.$store.dispatch("setAuthenticated", decoded);
      this.$store.dispatch("setUser", decoded);
    }
  },
};
// 根据屏幕大小设置字体大小
document.addEventListener("DOMContentLoaded", () => {
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  const html = document.querySelector("html");
  html.style.fontSize = fontSize + "px";
});
</script>

<style lang="less">
html,
body,
#app {
  overflow: scroll;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
