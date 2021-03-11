<template>
  <div class="index">
    <router-view class="index-wrapper"/>
    <van-tabbar route v-model='active'>
      <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
			<van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
			<van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
			<van-tabbar-item icon="user-o" to="/member">会员</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Index",
  data(){
    return {
      active: 0
    }
  }
};
</script>

<style lang="less" scoped>
.index-wrapper{
	margin-bottom: 50px;
}
</style>
