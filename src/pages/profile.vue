<template>
  <div class="profile">
    <router-link to="/edit-profile">
      <div class="basic-info">
        <div class="basic-left">
          <!-- <img src="../assets/profile/u80.png" alt=""> -->
          <img :src="userProfile.head_img" alt="" ref="avatar">
        </div>
        <div class="basic-right">
          <div class="right-content">
            <div class="right-top">
              <img src="../assets/profile/u243.png" alt="">
              <span class="nickname">{{userProfile.nickname}}</span><br>
            </div>
            <div class="right-bottom">
              <span class="date">{{ userProfile.date | formatDate}}</span>
            </div>
          </div>
          <div class="to-icon">
            <img src="../assets/profile/u227.png" alt="">
          </div>
        </div>
      </div>
    </router-link>
    <div class="more-info">
      <list-item url="#/my-follows">
        <span slot="option">我的关注</span>
        <span slot="description">关注的用户</span>
      </list-item>
      <list-item url="#/my-posts">
        <span slot="option">我的跟帖</span>
        <span slot="description">跟帖/回复</span>
      </list-item>
      <list-item url="#/my-favorites">
        <span slot="option">我的收藏</span>
        <span slot="description">文章/视频</span>
      </list-item>
      <list-item url="#/settings">
        <span slot="option">设置</span>
      </list-item>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/list-item.vue'
import { getUserProfile } from '@/api/users.js'
import { formatDate } from '@/utils/filters.js'
import { Toast } from 'vant'

export default {
  components: {
    listItem
  },
  data () {
    return {
      userProfile: {
        date: new Date()
      }
    }
  },
  async mounted () {
    let currentId = localStorage.getItem('current_dh_user_id')
    if (currentId) {
      const rsp = await getUserProfile(currentId)
      this.userProfile = {
        ...this.userProfile,
        ...rsp.data.data
      }
      if (this.userProfile.head_img) {
        this.userProfile.head_img = localStorage.getItem('dh_base_URL') + this.userProfile.head_img
      } else {
        this.userProfile.head_img = './default_avatar.png'
      }
    } else {
      Toast.fail('用户登录超时')
      setTimeout(() => {
        location.href = '#/login'
      }, 1000)
    }
  },
  filters: {
    formatDate (value) {
      return formatDate(value)
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.profile{
  .basic-info{
    width: 100%;
    height: 130*@vw-ratio;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    border-bottom: solid 5*@vw-ratio #e4e4e4;
    .basic-left{
      flex: 1;
      img{
        width: 70*@vw-ratio;
        height: 70*@vw-ratio;
        border-radius: 50%;
      }
    }
    .basic-right{
      height: 48*@vw-ratio;
      flex: 2;
      display: flex;
      justify-content: space-between;
      .right-content{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .right-top{
          display: flex;
          justify-content: flex-start;
          img{
            width: 18*@vw-ratio;
            height: 18*@vw-ratio;
            border-radius: 50%;
          }
          .nickname{
            margin-left: 5px;
            color: black;
            line-height: 18px;
            font-size: 18px;
          }
        }
        .right-bottom{
          display: flex;
          justify-content: flex-start;
          .date{
            color: #a0a0a0;
            font-size: 14px;
          }
        }
      }
      .to-icon{
        display: flex;
        align-items: center;
        padding-right: 10px;
        img{
          width: 17*@vw-ratio;
          height: 17*@vw-ratio;
        }
      }
    }
  }
  .more-info{
    padding-left: 20px;
  }
}
</style>
