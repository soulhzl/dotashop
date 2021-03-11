<template>
  <div class="categorypage">
    <van-nav-bar title="详情" left-arrow @click-left="backRoute" />
    <div class="goods-wrapper">
      <van-row>
        <van-col span="12" v-for="(item, k) in nowgoodsList" :key="k">
          <router-link
            :to="{ name: 'goodsmess', params: { name: item.name } }"
            tag="div"
          >
            <goods
              :imgSrc="item.bgimg"
              :goodsName="item.name"
              :goodsPrice="item.price | fixedMoney"
            ></goods>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import goods from "../components/goods.vue";
import url from "@/serviceAPI.config.js";
import mixins from "@/common/util.js";
export default {
  name: "CategoryPage",
  mixins: [mixins],
  data() {
    return {
      nowgoodsList: [],
    };
  },
  components: {
    goods,
  },
  methods: {
    async getCategoryGoods() {
      // 保存路由参数
      localStorage.sort = this.$route.params.sort
        ? this.$route.params.sort
        : localStorage.sort;

      // 获取分类商品
      const res = await this.$axios.post(url.getCategoryGoods, {
        sort: localStorage.sort,
      });
      if (res.data.code == 1) {
        this.nowgoodsList = res.data.msg;
      } else {
        this.nowgoodsList = [];
      }
    },
  },
  created() {
    this.getCategoryGoods();
  },
};
</script>

<style lang="less" scoped>
</style>
