<template>
  <div class="login">
    <img src="../assets/images/title.png" alt="" />
    <img src="../assets/images/shop.png" alt="" />
    <van-form @submit="submitLogin">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录/注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Notify } from "vant";
import url from "@/serviceAPI.config.js";
import JWTDecode from "jwt-decode";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async submitLogin() {
      if (this.username && this.password) {
        const res = await this.$axios.post(url.lorUser, {
          username: this.username,
          password: this.password,
        });
        const { data } = res;
        if (data.code == 1) {
          const { token } = data.msg;
          // 本地存储token
          localStorage.setItem("eleToken", token);
          const decoded = JWTDecode(token);
          // 将解析的token存进store
          this.$store.dispatch("setAuthenticated", decoded);
          this.$store.dispatch("setUser", decoded);
          Notify({
            message: data.msg.desc,
            duration: 1000,
            background: "#1989fa",
          });
          this.$router.push("/index");
        } else {
          Notify({
            message: data.msg,
            duration: 1000,
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-image: url("../assets/images/lorbg.jpg");
}

img{
  margin-bottom: 20px;
}

</style>
