<template>
  <div class="member">
    <div class="member-wrapper">
      <img src="/dotashop/img/errorimg.png" alt="" />
      <div class="member-name">name</div>
    </div>
    <van-cell-group>
      <van-cell title="地址" is-link to="address" />
      <van-cell title="订单" is-link to="order" />
      <van-cell title="优惠卷" is-link to="ticket" />
      <van-cell title="设置" is-link to="setting" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Member",
};
</script>

<style lang="less" scoped>
.member-wrapper {
  text-align: center;
  margin: 2rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .member-name {
    font-size: 0.5rem;
    font-weight: bold;
  }
}
</style>
