<template>
  <div class="brill-comments">
    <div class="head-body" @click="Writing=false">
      <my-header :url="'#/news-detail/'+$route.params.id" class="header">
        <span slot="middle">精彩跟帖</span>
      </my-header>
      <div class="comments-list">
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <div class="user-info">
            <div class="avatar">
              <img :src="comment.user.head_img" alt="">
            </div>
            <div class="user-name">
              <span class="name">{{comment.user.nickname}}</span>
              <span class="time">2小时前</span>
            </div>
            <div class="reply">
              <span>回复</span>
            </div>
          </div>
          <rec-comment v-if="comment.parent"
            :user-name="comment.parent.user.nickname"
            :content="comment.parent.content"
            :parent="comment.parent.parent"
            :cur-id="comment.parent.id"
            @click="replyHandler"
          ></rec-comment>
          <div class="comment-content">
            <span>{{comment.content}}</span>
          </div>
        </div>
      </div>
    </div>
    <my-footer v-model="Writing"></my-footer>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import myFooter from '@/components/my-footer.vue'
import recComment from '@/components/recur-comment.vue'
import { getCommentsById } from '@/api/articles.js'

export default {
  components: {
    myHeader,
    recComment,
    myFooter
  },
  data () {
    return {
      Writing: false,
      comments: [
        {
          user: {
            nickname: '',
            head_img: ''
          }
        }
      ]
    }
  },
  async mounted () {
    let rsp = await getCommentsById(this.$route.params.id)
    if (rsp.status + '' === '200') {
      this.comments = rsp.data.data.map(element => {
        let baseURL = localStorage.getItem('dh_base_URL')
        if (element.user.head_img) {
          element.user.head_img = baseURL + element.user.head_img
        } else {
          element.user.head_img = './default_avatar.png'
        }
        return element
      })
      console.log(this.comments)
    }
  },
  methods: {
    replyHandler (parentId) {
      console.log(parentId)
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.brill-comments{
  .header{
    padding: 10px 20px;
  }
  .comments-list{
    .comment{
      padding: 10px 20px;
      border-bottom: solid 1px #e4e4e4;
      .user-info{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        .avatar{
          display: flex;
          justify-content: flex-end;
          img{
            width: 35*@vw-ratio;
            height: 35*@vw-ratio;
            border-radius: 50%;
          }
        }
        .user-name{
          width: 244*@vw-ratio;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          .name{
            font-size: 16px;
          }
          .time{
            font-size: 12px;
            color: #707070;
          }
        }
        .reply{
          font-size: 12px;
          color: #707070;
        }
      }
      .comment-content{
        display: flex;
        padding-top: 10px;
      }
    }
  }
}
</style>
