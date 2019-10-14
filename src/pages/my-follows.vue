<template>
  <div class="my-follows">
    <my-header url="#/profile">我的关注</my-header>
    <div class="follows-list">
      <div class="follow" v-for="follow in followsList" :key="follow.id">
        <div class="follow-avatar">
          <img :src="follow.head_img" alt="">
        </div>
        <div class="follow-name">
          <span class="nickname">{{follow.nickname}}</span>
          <span class="date">{{follow.date | formatDate}}</span>
        </div>
        <div class="unfollow">
          <my-button type="info"
            size="middle">取消关注</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myButton from '@/components/my-button.vue'
import myHeader from '@/components/my-header.vue'
import { formatDate } from '@/utils/filters.js'
import { getMyFollows } from '@/api/users.js'

export default {
  components: {
    myButton,
    myHeader
  },
  data () {
    return {
      followsList: []
    }
  },
  async mounted () {
    let rsp = await getMyFollows()
    this.followsList = [...rsp.data.data]
    this.followsList.forEach(element => {
      element.date = new Date()
      if (!element.head_img) {
        element.head_img = './default_avatar.png'
      }
    })
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
.my-follows{
  .follows-list{
    margin-top: 20px;
    .follow{
      display: flex;
      align-items: center;
      height: 80*@vw-ratio;
      border-bottom: solid 1px #d7d7d7;
      padding-right: 20px;
      .follow-avatar{
        flex: 1;
        img{
          width: 40*@vw-ratio;
          height: 40*@vw-ratio;
        }
      }
      .follow-name{
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .nickname{
          font-size: 18px;
        }
        .date{
          font-size: 14px;
          color: #707070;
        }
      }
      .unfollow{
        flex: 1;
      }
    }
  }
}
</style>
