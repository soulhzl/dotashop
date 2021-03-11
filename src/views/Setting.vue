<template>
  <div class="setting">
    <van-nav-bar title="设置" left-arrow @click-left="backRoute" />

    <van-cell-group>
      <van-cell title="用户设置" is-link to="me" />
    </van-cell-group>
  </div>
</template>

<script>
import mixins from "@/common/util.js";
export default {
  name: "Setting",
  mixins: [mixins],
};
</script>

<style lang="less" scoped>
</style>
