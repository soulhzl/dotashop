<template>
  <div class="address">
    <van-nav-bar title="地址" left-arrow @click-left="backRoute" />
    <van-address-list
      v-model="chosenAddressId"
      :list="areaList"
      @add="addAddress"
      @edit="editAddress"
    />
  </div>
</template>

<script>
import url from '@/serviceAPI.config.js'
import mixins from "@/common/util.js";
export default {
  name: "Address",
  mixins: [mixins],
  data() {
    return {
      chosenAddressId: "1",
      areaList: [],
    };
  },
  methods: {
    addAddress() {
      this.$router.push('addaddress')
    },
    editAddress(item, index){
			this.$router.push({name: 'addaddress', params: {item, index, operate: 'edit'}})
		}
  },
  activated(){
		if (this.$store.getters.address) {
			this.areaList = this.$store.getters.address
		}
	},
  async mounted(){
		// 获取地址列表
		let res = await this.$axios.post(url.getAddressList, {id: this.$store.getters.user.id})
		if (res.data.code == 1 && res.data.msg) {
			this.areaList = res.data.msg.address
			this.$store.dispatch('updateAddress', {addressDetail: this.areaList})
		}
	}
};
</script>

<style lang="less" scoped>
</style>
