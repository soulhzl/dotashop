<template>
  <div class="goodsmess">
    <div class="goods-area">
      <van-nav-bar title="商品" left-arrow @click-left="backRoute" />
      <div class="goods-info">
        <van-swipe loop>
          <van-swipe-item v-for="(swipeitem, k) in info.imgList" :key="k">
            <img :src="swipeitem" alt="" @click="scaleImg(k)" />
          </van-swipe-item>
        </van-swipe>
        <div class="goods-name">{{ info.name }}</div>
        <div class="goods-desc">{{ info.desc }}</div>
        <div class="goods-price">￥{{ info.price | fixedMoney }}</div>
      </div>
      <van-tabs swipeable sticky>
        <van-tab title="详情">
          <div v-for="(detailitem, k) in detailImgList" :key="k">
            <img :src="detailitem" alt="" />
          </div>
        </van-tab>
        <van-tab title="评论">
          <div>
            <div class="commet">好评度</div>
            <van-rate
              v-model="commet.value"
              :size="commet.starSize"
              color="#f44"
              void-icon="star"
              void-color="#eee"
              class="goods-star"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buyClick"
      />
    </van-goods-action>
    <van-sku
      v-model="sku.showBase"
      :sku="sku.sku"
      :goods="sku.goodsInfo"
      :goods-id="sku.id"
      :initial-sku="sku.initialSku"
      @buy-clicked="skuBuyClick"
      @add-cart="skuAddCart"
    />
  </div>
</template>

<script>
import { Notify, ImagePreview } from "vant";
import url from "@/serviceAPI.config.js";
import mixins from "@/common/util.js";
export default {
  name: "GoodsMess",
  mixins: [mixins],
  data() {
    return {
      info: {
        imgList: [],
        name: "",
        desc: "",
        price: 0,
      },
      detailImgList: [],
      commet: {
        value: 0,
        starSize: 0,
      },
      sku: {
        bgimg: "",
        num: 1,
        id: "",
        showBase: false,
        goodsInfo: {},
        sku: {},
        initialSku: {},
      },
    };
  },
  methods: {
    saveCart(selectedNum) {
      // 将商品加入购物车
      let cartInfo = localStorage.cart ? JSON.parse(localStorage.cart) : {};
      if (this.sku.id) {
        if (!cartInfo[this.sku.id]) {
          cartInfo[this.sku.id] = {
            img: this.sku.bgimg,
            desc: this.info.desc,
            price: this.info.price,
            name: this.info.name,
            num: this.sku.num,
            id: this.sku.id,
          };
        } else {
          cartInfo[this.sku.id].num = cartInfo[this.sku.id].num + 1;
        }
        if (selectedNum) {
          cartInfo[this.sku.id].num = selectedNum;
        }

        localStorage.cart = JSON.stringify(cartInfo);

        Notify({
          message: "已加入购物车",
          duration: 1000,
          background: "#1989fa",
        });
      } else {
        Notify({
          message: "无此商品",
          duration: 1000,
        });
      }
    },
    toCart() {
      // 跳转至购物车
      this.$router.push("cart");
    },
    addCart() {
      this.saveCart();
    },
    buyClick() {
      this.sku.showBase = !this.sku.showBase;
    },
    skuAddCart(data) {
      this.saveCart(data.selectedNum);
    },
    skuBuyClick(data) {
      console.log(data);
    },
    scaleImg(index) {
      ImagePreview({
        images: this.info.imgList,
        startPosition: index,
      });
    },
  },
  async created() {
    localStorage.goodsname = this.$route.params.name
      ? this.$route.params.name
      : localStorage.goodsname;
    // 设置星星大小
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    this.commet.starSize = 0.4 * fontSize;
    // 获取指定商品信息
    const res = await this.$axios.post(url.getGoodsInfo, {
      name: localStorage.goodsname,
    });
    if (res.data.code == 1) {
      const data = res.data.msg;
      this.info.imgList = data.imgList;
      this.info.name = data.name;
      this.info.desc = data.desc;
      this.info.price = data.price;
      this.commet.value = data.commet;
      this.detailImgList = data.detailImgList;
      this.sku.id = data._id;
      this.sku.bgimg = data.bgimg;
      this.sku.goodsInfo = {
        title: this.info.name,
        picture: this.sku.bgimg,
      };
      this.sku.sku = {
        tree: [
          {
            k: "个体",
            v: [
              {
                id: "1",
                name: "个体",
              },
            ],
            k_s: "s1",
          },
        ],
        list: [
          {
            id: 2259,
            price: this.info.price * 100,
            s1: "1",
            stock_num: 9999,
          },
        ],
      };
      this.sku.initialSku = {
        s1: "1",
        selectedNum: 1,
      };
    } else {
      this.info.imgList = ["/dotashop/img/errorimg.png"];
      this.info.name = "";
      this.info.desc = "无法获取数据";
      this.info.price = 0;
      this.commet.value = 0;
      this.detailImgList = [];
      this.sku.bgimg = ["/dotashop/img/errorimg.png"];
      this.sku.id = "";
      this.sku.goodsInfo = {};
      this.sku.sku = {};
      this.sku.initialSku = {};
    }
  },
};
</script>

<style lang="less" scoped>
.goods-area {
  img {
    width: 100%;
  }
  .goods-info {
    .goods-name,
    .goods-desc,
    .goods-price {
      margin: 0.2rem 0.3rem;
      font-size: 0.5rem;
    }
    .goods-desc {
      font-size: 0.4rem;
      color: #9a9a9a;
    }
    .goods-price {
      color: red;
    }
  }
  .commet {
    display: inline-block;
    margin: 0.4rem;
    font-size: 0.4rem;
  }
}
</style>
