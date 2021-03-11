<template>
  <div class="goods">
    <img :src="imgSrc" alt="" :style='imgSize'/>
    <div class="goods-name">{{ goodsName }}</div>
    <div v-if="goodsPrice" class="goods-price">￥{{ goodsPrice }}</div>
  </div>
</template>

<script>
export default {
  name: "goods",
  props: {
    imgSrc: String,
    goodsName: String,
    goodsPrice: String,
    imgSize: String
  },
};
</script>

<style lang="less" scoped>
.goods {
  img {
    width: 100%;
  }
  .goods-price {
    color: red;
  }
  .goods-name,
  .goods-price {
    text-align: center;
    font-size: 0.4rem;
  }
}
</style>
