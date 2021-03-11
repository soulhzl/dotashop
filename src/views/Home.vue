<template>
  <div class="home">
    <!-- 搜索栏 -->
    <div class="search-area">
      <van-row>
        <van-col span="3"
          ><img src="../assets/images/logo.png" alt="" @click="clearSearch"
        /></van-col>
        <van-col span="5"
          ><img src="../assets/images/shop.png" alt="" @click="clearSearch"
        /></van-col>
        <van-col span="13"
          ><van-field
            left-icon="search"
            class="search-input"
            v-model="searchValue"
            placeholder="请输入搜索内容"
            @input="inputSearch"
        /></van-col>
        <van-col span="2"
          ><router-link to="member"
            ><van-icon name="contact" class="search-user" /></router-link
        ></van-col>
      </van-row>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result" v-if="searchList.length">
      <div class="search-title">搜索结果如下：</div>
      <van-row>
        <van-col span="12" v-for="(item, k) in searchList" :key="k">
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
    <!-- 轮播区域 -->
    <div class="swipe-area">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        :show-indicators="false"
        loop
      >
        <van-swipe-item v-for="(swiperitem, k) in swipeImgList" :key="k">
          <router-link
            :to="{ name: 'goodsmess', params: { name: swiperitem.name } }"
            ><img :src="swiperitem.img" alt=""
          /></router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 新品销售 -->
    <div class="newgoods-area">
      <div class="new-title">新品销售</div>
      <van-swipe :loop="false" :width="swiperWidth" :show-indicators="false">
        <van-swipe-item v-for="(newItem, k) in carouselList" :key="k">
          <router-link
            :to="{ name: 'goodsmess', params: { name: newItem.name } }"
            ><img :src="newItem.img" alt=""
          /></router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 近期销售 -->
    <div class="nowgoods-area">
      <div class="now-title">近期销售</div>
      <van-row>
        <van-col span="12" v-for="(nowgoodsItem, k) in nowgoodsList" :key="k">
          <router-link
            :to="{ name: 'goodsmess', params: { name: nowgoodsItem.name } }"
            tag="div"
          >
            <goods
              :imgSrc="nowgoodsItem.img"
              :goodsName="nowgoodsItem.name"
              :goodsPrice="nowgoodsItem.price | fixedMoney"
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
  name: "Home",
  mixins: [mixins],
  components: {
    goods,
  },
  data() {
    return {
      searchValue: "",
      scrollTop: 0,
      swipeImgList: [],
      carouselList: [],
      nowgoodsList: [],
      searchList: [],
    };
  },
  computed: {
    swiperWidth() {
      return window.innerWidth / 3;
    },
  },
  async mounted() {
    // 初始化首页信息
    const res = await this.$axios(url.home);
    const data = res.data.data;
    this.swipeImgList = data.swipeImgList;
    this.carouselList = data.carouselList;
    this.nowgoodsList = data.nowgoodsList;
  },
  beforeRouteLeave(to, from, next) {
    // 记录页面滚动位置
    this.scrollTop = document.getElementById("app").scrollTop;
    next();
  },
  beforeRouteEnter(to, from, next) {
    // 回到记录的滚动位置处
    next((vm) => {
      document.getElementById("app").scrollTop = vm.scrollTop;
    });
  },
  methods: {
    clearSearch() {
      // 清空搜索内容
      this.searchValue = "";
      this.searchList = [];
    },
    async inputSearch() {
      // 查询搜索的内容
      if (this.searchValue) {
        const res = await this.$axios.post(url.getSearchList, {
          search: this.searchValue,
        });
        if (res.data.code == 1 && res.data.msg.length > 0) {
          this.searchList = res.data.msg;
        } else {
          this.searchList = [];
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-area {
  overflow: hidden;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background-color: #e32332;
  img {
    width: 80%;
  }
  .search-input {
    margin-top: 0.05rem;
    padding: 0.1rem 0.3rem;
  }
  .search-user {
    margin-left: 0.2rem;
    font-size: 0.7rem;
    color: white;
  }
}
.search-result {
  position: fixed;
  overflow: scroll;
  z-index: 1;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  .search-title {
    margin: 0.2rem;
    font-size: 0.4rem;
    color: grey;
  }
}
.swipe-area {
  img {
    width: 100%;
  }
}
.newgoods-area,
.nowgoods-area {
  margin-top: -0.25rem;
}
.new-title,
.now-title {
  overflow: hidden;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background-repeat: no-repeat;
  background-size: 100%;
  font-size: 0.4rem;
  font-weight: bold;
  text-align: center;
  color: #648cde;
}
.newgoods-area {
  .new-title {
    background-image: url("../assets/images/bg-1.jpg");
  }
  img {
    width: 100%;
  }
}
.nowgoods-area {
  .now-title {
    background-image: url("../assets/images/bg-2.jpg");
  }
}
</style>
