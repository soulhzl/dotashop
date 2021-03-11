<template>
  <div class="notfound">
    <div class="svg-wrapper">
      <span class="iconfont svg-404">&#xe603;</span>
      <span class="iconfont svg-ku">&#xe617;</span>
      <router-link tag="div" to="index"
        ><span class="iconfont svg-back">&#xe62b;</span></router-link
      >
      <p class="notfound-tip">抱歉！您所访问的页面不存在！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="less" scoped>
.notfound {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: linear-gradient(#dcb5ff, #ffe66f);
  .svg-wrapper {
    position: relative;
    .svg-404 {
      position: absolute;
      top: 3rem;
      right: 0rem;
      font-size: 5rem;
    }
    .svg-ku {
      position: absolute;
      top: 7rem;
      left: 0.5rem;
      font-size: 6rem;
    }
    .svg-back {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
    }
    .notfound-tip {
      position: absolute;
      top: 15rem;
      left: 1.5rem;
      color: #4f4f4f;
      font-size: 0.5rem;
    }
  }
}
</style>
