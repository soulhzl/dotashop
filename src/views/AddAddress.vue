<template>
  <div class="addaddress">
    <van-nav-bar title="添加地址" left-arrow @click-left="backRoute" />
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :show-delete="showDelete"
      :search-result="searchResult"
      @save="saveMess"
      @delete="deleteMess"
    />
  </div>
</template>

<script>
import { Notify } from "vant";
import url from "@/serviceAPI.config.js";
import areaList from "@/assets/area.js";
import mixins from "@/common/util.js";
export default {
  name: "AddAddress",
  mixins: [mixins],
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      showDelete: false,
      index: 0,
      item: {},
    };
  },
  methods: {
    async saveMess(content) {
      // 第几条数据
      let idNum = this.$store.getters.address.length;
      if (this.$route.params.operate) {
        idNum = this.index;
      }
      idNum++;
      // 将地址信息存储进数据库
      const addressDetail = {
        _id: this.$store.getters.user.id,
        id: idNum,
        name: content.name,
        tel: content.tel,
        address:
          content.city + " " + content.county + " " + content.addressDetail,
      };
      const res = await this.$axios.post(url.saveAddress, {
        user: addressDetail,
      });
      if (res.data.code == 1 && res.data.msg.ok == 1) {
        this.$store.dispatch("updateAddress", {
          addressDetail,
          operate: this.$route.params.operate,
          index: idNum,
        });
        Notify({
          message: "保存成功",
          duration: 1000,
          background: "#1989fa",
        });
        this.$router.push("address");
      }
    },
    async deleteMess() {
      // 删除地址
			const addressDetail = {
				_id: this.$store.getters.user.id,
				deleteid: this.index
			}

			const res = await this.$axios.post(url.saveAddress, {user: addressDetail})
			if (res.data.code == 1) {
				this.$store.dispatch('updateAddress', {operate: "delete", index: this.index})
				Notify({
					message: '删除成功',
					duration: 1000,
					background: '#1989fa'
				});
				this.$router.push('address')
			}
    },
  },
  activated(){
		// 判断从哪个接口进来
		if (this.$route.params.operate) {
			let {index, item} = this.$route.params
			this.showDelete = true
			this.index = index
			this.item = item
		}
	},
	async mounted(){
		if (!this.$store.getters.address || !this.$store.getters.address.length) {
			// 获取地址列表
			let res = await this.$axios.post(url.getAddressList, {id: this.$store.getters.user.id})
			if (res.data.code == 1 && res.data.msg) {
				this.$store.dispatch('updateAddress', {addressDetail: res.data.msg})
			}
		}
	}
};
</script>

<style lang="less" scoped>
</style>
