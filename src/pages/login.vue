<template>
  <div class="login">
    <div class="close">
      <img src="../assets/login/u338.png" alt="close">
    </div>
    <div class="logo">
      <img src="../assets/login/u339.png" alt="logo">
    </div>
    <div class="id-input">
      <my-input
        type="text"
        placeholder="请输入手机号码"
        :value="userData.username"
        @input="userNameHandler"
        :rules="/^1\d{10}$/"
        err_msg="请输入11位数字手机号码"
        ></my-input>
      <my-input
        type="password"
        placeholder="密码"
        :value="userData.password"
        @input="pwdHandler"
        ></my-input>
    </div>
    <div class="to-register">
      <span>没有账号？</span>
      <router-link to="/register">去注册</router-link>
    </div>
    <my-button text="登录" @click="loginHandler"></my-button>
  </div>
</template>

<script>
import myInput from '@/components/my-input.vue'
import myButton from '@/components/my-button.vue'
import { userLogin } from '@/api/users.js'

export default {
  components: {
    myInput,
    myButton
  },
  data () {
    return {
      userData: {
        username: '123456',
        password: '123456'
      }
    }
  },
  methods: {
    userNameHandler (userName) {
      this.userData.username = userName
    },
    pwdHandler (pwd) {
      this.userData.password = pwd
    },
    async loginHandler (event) {
      const rsp = await userLogin(this.userData)
      if (rsp.data.data && rsp.data.data.token) {
        localStorage.setItem('current_dh_user_id', rsp.data.data.user.id)
        localStorage.setItem('current_dh_user_token', rsp.data.data.token)
        location.href = '#/profile'
      }
    }
  }
}
</script>

<style lang="less">
@vw-ratio: 100/360vw;
  .login{
    padding: 24*@vw-ratio;
    .close{
      display: flex;
      justify-content: flex-start;
      img{
        width: 27*@vw-ratio;
        height: 27*@vw-ratio;
        cursor: pointer;
      }
    }
    .logo{
      margin: 8*@vw-ratio 0;
      img{
        width: 126*@vw-ratio;
        height: 126*@vw-ratio;
      }
    }
    .to-register{
      padding: 16*@vw-ratio;
      display: flex;
      justify-content: flex-end;
      a{
        text-decoration: none;
      }
    }
  }
</style>
