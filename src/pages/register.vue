<template>
  <div class="register">
    <div class="close">
      <img src="../assets/login/u338.png" alt="close">
    </div>
    <div class="logo">
      <img src="../assets/login/u339.png" alt="logo">
    </div>
    <div class="id-input">
      <my-input
        type="text"
        placeholder="手机号码"
        :value="userData.username"
        @input="userNameHandler"
        :rules="/^1\d{10}$/"
        err_msg="请输入11位数字手机号码"
        ></my-input>
      <my-input
        type="text"
        placeholder="昵称"
        :value="userData.nickname"
        @input="nicknameHandler"
        ></my-input>
      <my-input
        type="password"
        placeholder="密码"
        :value="userData.password"
        @input="pwdHandler"
        ></my-input>
    </div>
    <div class="to-login">
      <span>有账号？</span>
      <router-link to="/login">去登录</router-link>
    </div>
    <my-button @click="registerHandler">注册</my-button>
  </div>
</template>

<script>
import myInput from '@/components/my-input.vue'
import myButton from '@/components/my-button.vue'
import { userRegister } from '@/api/users.js'
import { Toast } from 'vant'

export default {
  components: {
    myInput,
    myButton
  },
  data () {
    return {
      userData: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    userNameHandler (userName) {
      this.userData.username = userName
    },
    nicknameHandler (nickname) {
      this.userData.nickname = nickname
    },
    pwdHandler (pwd) {
      this.userData.password = pwd
    },
    async registerHandler (event) {
      const rsp = await userRegister(this.userData)
      if (rsp.data.statusCode && rsp.data.statusCode + '' !== '200') {
        Toast.fail(rsp.data.message)
      } else {
        Toast.success(rsp.data.message)
        setTimeout(() => {
          location.href = '#/login'
        }, 2000)
      }
    }
  }
}
</script>

<style lang="less">
@vw-ratio: 100/360vw;
  .register{
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
    .to-login{
      padding: 16*@vw-ratio;
      display: flex;
      justify-content: flex-end;
      a{
        text-decoration: none;
      }
    }
  }
</style>
