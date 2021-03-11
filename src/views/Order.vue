<template>
  <div class="order">
    <van-nav-bar title="订单" left-arrow @click-left="backRoute" />

    <div>
      <van-card
        v-for="(item, k) in orderList"
        :key="k"
        num="2"
        :price="item.price | fixedMoney"
        :desc="item.desc"
        :title="item.title"
        :thumb="item.img"
      />
    </div>
  </div>
</template>

<script>
import mixins from "@/common/util.js";
export default {
  name: "Order",
  mixins: [mixins],
  data() {
    return {
      orderList: [
        {
          img: "/dotashop/img/good-1.jpg",
          price: 2,
          desc: "描述1",
          title: "标题1",
        },
        {
          img: "/dotashop/img/good-2.jpg",
          price: 3,
          desc: "描述2",
          title: "标题2",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
