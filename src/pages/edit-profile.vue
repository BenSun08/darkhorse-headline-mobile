<template>
  <div class="edit-profile">
    <my-header url="#/profile" class="header">
      <span slot="middle">编辑资料</span>
    </my-header>
    <div class="upload-avatar">
      <img :src="avatar" alt="">
      <van-uploader
        :before-read="beforeRead"
        :after-read="afterRead"
        />
    </div>
    <div class="info-list">
      <list-item url="javascript:;" @click="showNickName=!showNickName">
        <span slot="option">昵称</span>
        <span slot="description">{{userProfile.nickname}}</span>
      </list-item>
      <van-dialog
        v-model="showNickName" title="修改昵称"
        show-cancel-button
        :before-close="validNickname"
        >
        <van-field :value="userProfile.nickname" required label="昵称"
          ref="nickname" placeholder="请输入昵称"
          />
      </van-dialog>
      <list-item url="javascript:;" @click="showPwd=!showPwd">
        <span slot="option">密码</span>
        <span slot="description">******</span>
      </list-item>
      <van-dialog
        v-model="showPwd" title="修改密码"
        show-cancel-button
        :before-close="validPwd"
        >
        <van-field required label="原密码" type="password"
          ref="orgPwd" placeholder="请输入原密码"
          />
        <van-field required label="新密码" type="password"
          ref="newPwd" placeholder="请输入新密码"
          />
      </van-dialog>
      <list-item url="javascript:;" @click="showGender=!showGender">
        <span slot="option">性别</span>
        <span slot="description">{{gender}}</span>
      </list-item>
      <van-popup v-model="showGender" position="bottom">
        <van-picker
          show-toolbar :columns="genders"
          :default-index="userProfile.gender"
          @cancel="showGender=false"
          @confirm="confirmGender"
          />
      </van-popup>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import listItem from '@/components/list-item.vue'
import { getUserProfile, updateUserProfile } from '@/api/users.js'
import { uploadAvatar } from '@/api/upload-files.js'
import { Toast, Uploader, Dialog, Field, Popup, Picker } from 'vant'
import Vue from 'vue'
Vue.use(Uploader).use(Dialog).use(Field).use(Popup).use(Picker)

export default {
  components: {
    myHeader,
    listItem
  },
  async mounted () {
    let currentId = localStorage.getItem('current_dh_user_id')
    if (currentId) {
      const rsp = await getUserProfile(currentId)
      this.userProfile.id = rsp.data.data.id
      this.userProfile.username = rsp.data.data.username
      this.userProfile.password = rsp.data.data.password
      this.userProfile.nickname = rsp.data.data.nickname
      this.userProfile.head_img = rsp.data.data.head_img
      this.userProfile.gender = rsp.data.data.gender
    } else {
      Toast.fail('用户登录超时')
      setTimeout(() => {
        location.href = '#/login'
      }, 1000)
    }
  },
  data () {
    return {
      userProfile: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        head_img: '',
        gender: ''
      },
      showNickName: false,
      validNickname: (action, done) => {
        let nicknameInputed = this.$refs.nickname.$refs.input.value
        if (action === 'confirm') {
          if (nicknameInputed.trim() === '') {
            Toast.fail('昵称不能为空')
            done(false)
          } else {
            this.userProfile.nickname = nicknameInputed
            this.updateProfile()
            done()
          }
        } else {
          done()
        }
      },
      showPwd: false,
      validPwd: (action, done) => {
        let orgPwdInputed = this.$refs.orgPwd.$refs.input.value
        let newPwdInputed = this.$refs.newPwd.$refs.input.value
        if (action === 'confirm') {
          if (this.userProfile.password !== orgPwdInputed) {
            Toast.fail('原密码输入错误')
            done(false)
          } else if (newPwdInputed.trim() === '') {
            Toast.fail('新密码不能为空')
            done(false)
          } else {
            this.userProfile.password = newPwdInputed
            this.updateProfile()
            done()
          }
        } else {
          done()
        }
      },
      showGender: false,
      genders: ['女', '男']
    }
  },
  computed: {
    avatar () {
      if (this.userProfile.head_img === '') {
        return './default_avatar.png'
      } else {
        return localStorage.getItem('dh_base_URL') + this.userProfile.head_img
      }
    },
    gender () {
      if (this.userProfile.gender + '' === '1') {
        return '男'
      } else {
        return '女'
      }
    }
  },
  methods: {
    async updateProfile () {
      let rsp = await updateUserProfile(this.userProfile.id, this.userProfile)
      Toast.success(rsp.data.message)
    },
    beforeRead (file) {
      if (!/^image/.test(file.type)) {
        Toast.fail('请上传图片格式的头像')
        return false
      }
      return true
    },
    async afterRead (file) {
      let formData = new FormData()
      formData.append('file', file.file)
      let rsp = await uploadAvatar(formData)
      this.userProfile.head_img = rsp.data.data.url
      this.updateProfile()
    },
    confirmGender (value, index) {
      this.userProfile.gender = index
      this.updateProfile()
      this.showGender = false
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.edit-profile{
  .header{
    margin: 10px 0;
  }
  .upload-avatar{
    position: relative;
    height: 120*@vw-ratio;
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 70*@vw-ratio;
      height: 70*@vw-ratio;
      border-radius: 50%
    }
    /deep/.van-uploader{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      opacity: 0;
    }
  }
  .info-list{
    padding-left: 20px;
  }
}
</style>
