<template>
  <div class="category">
    <van-nav-bar title="分类" />
    <van-row>
      <van-col
        span="12"
        class="category-area"
        v-for="(item, k) in categoryList"
        :key="k"
      >
        <router-link
          :to="{ name: 'categorypage', params: { sort: item.name } }"
          tag="div"
        >
          <goods
            :imgSrc="item.img"
            :goodsName="item.name"
            imgSize="width: 80%;"
          ></goods>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import goods from "../components/goods.vue";
import url from "@/serviceAPI.config.js";
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
    };
  },
  components: {
    goods,
  },
  async mounted() {
    // 初始化分类
    let res = await this.$axios.get(url.home);
    let data = res.data.data;
    this.categoryList = data.categoryList;
  },
};
</script>

<style lang="less" scoped>
.category-area {
  margin-top: 0.5rem;
  text-align: center;
}
</style>
