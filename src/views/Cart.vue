<template>
  <div class="cart">
    <van-nav-bar title="我的购物车" left-arrow @click-left="backRoute" />
    <div class="cart-area">
      <van-card
        v-for="(item, k) in cartList"
        :key="k"
        :num="item.num"
        :price="item.price | fixedMoney"
        :desc="item.desc"
        :title="item.title"
        :thumb="item.img"
      >
        <div slot="footer">
          <van-button size="mini" @click="subNum(item.id)">-</van-button>
          <van-button size="mini" @click="deleteGoods(item.id)"
            >删除</van-button
          >
          <van-button size="mini" @click="addNum(item.id)">+</van-button>
        </div>
      </van-card>
    </div>
    <van-submit-bar :price="totalPrice" button-text="提交订单" />
  </div>
</template>

<script>
import mixins from "@/common/util.js";
export default {
  name: "Cart",
  mixins: [mixins],
  data() {
    return {
      cartList: [],
      totalPrice: 0,
    };
  },
  methods: {
    subNum(id) {
      // 减商品数量
      if (this.cartList[id].num == 1) {
        this.deleteGoods(id);
      } else {
        this.cartList[id].num = this.cartList[id].num - 1;
        localStorage.cart = JSON.stringify(this.cartList);
        this.totalPrice -= this.cartList[id].price * 100;
      }
    },
    deleteGoods(id) {
      // 删除商品
      this.totalPrice -= this.cartList[id].num * this.cartList[id].price * 100;
      this.$delete(this.cartList, id);
      localStorage.cart = JSON.stringify(this.cartList);
    },
    addNum(id) {
      // 加商品数量
      this.cartList[id].num = this.cartList[id].num + 1;
      localStorage.cart = JSON.stringify(this.cartList);
      this.totalPrice += this.cartList[id].price * 100;
    },
    getGoodsInfo() {
      // 获取购物车列表
      let cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
      this.cartList = cart;

      this.caculateMoney();
    },
    caculateMoney() {
      // 计算总金额
      this.totalPrice = 0;
      for (let i in this.cartList) {
        this.totalPrice += this.cartList[i].num * this.cartList[i].price;
      }

      this.totalPrice *= 100;
    },
  },
  activated() {
    this.getGoodsInfo();
  },
  mounted() {
    this.getGoodsInfo();
  },
};
</script>

<style lang="less" scoped>
</style>
