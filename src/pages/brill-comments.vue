<template>
  <div class="brill-comments">
    <div class="head-body" @click="hideHandler">
      <my-header :url="'#/news-detail/'+$route.params.id" class="header">
        <span slot="middle">精彩跟帖</span>
      </my-header>
      <div class="comments-list">
        <van-list v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >

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
              <span class="btn-reply"
               :data-id="comment.id"
               :data-name="comment.user.nickname"
                @click="replyAscUser"
              >
                回复
              </span>
            </div>
          </div>
          <rec-comment v-if="comment.parent"
            :user-name="comment.parent.user.nickname"
            :content="comment.parent.content"
            :parent="comment.parent.parent"
            :cur-id="comment.parent.id"
            @click="replyDesHandler"
          >
          </rec-comment>
          <div class="comment-content">
            <span>{{comment.content}}</span>
          </div>
        </div>

        </van-list>
      </div>
    </div>
    <my-footer :is-writing="Writing"
      :parent-id="parentId"
      :parent-name="parentName"
      @writing="showWriting"
      @submit="submitHandler"
    >
    </my-footer>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import myFooter from '@/components/my-footer.vue'
import recComment from '@/components/recur-comment.vue'
import { getCommentsById } from '@/api/articles.js'
import Vue from 'vue'
import { List } from 'vant'
Vue.use(List)

export default {
  components: {
    myHeader,
    recComment,
    myFooter
  },
  data () {
    return {
      Writing: false,
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      comments: [],
      parentId: '',
      parentName: ''
    }
  },
  mounted () {
    this.pageIndex = 1
    this.comments = []
    this.init()
  },
  methods: {
    async init () {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      let rsp = await getCommentsById(this.$route.params.id, params)
      if (rsp.data.data.length > 0) {
        if (rsp.status + '' === '200') {
          let temp = rsp.data.data.map(element => {
            let baseURL = localStorage.getItem('dh_base_URL')
            if (element.user.head_img) {
              element.user.head_img = baseURL + element.user.head_img
            } else {
              element.user.head_img = './default_avatar.png'
            }
            return element
          })
          this.comments.push(...temp)
        }
        this.loading = false
        this.finished = false
      } else {
        console.log(this.comments)
        this.loading = false
        this.finished = true
      }
    },
    hideHandler (event) {
      if (!event.target.classList.contains('btn-reply')) {
        this.Writing = false
        this.parentName = ''
      }
    },
    replyAscUser (event) {
      this.parentId = event.target.dataset.id
      this.parentName = event.target.dataset.name
      this.Writing = true
    },
    replyDesHandler (data) {
      this.parentId = data.id
      this.parentName = data.name
      this.Writing = true
    },
    submitHandler () {
      this.pageIndex = 1
      this.comments = []
      this.init()
    },
    showWriting (to) {
      this.Writing = to
    },
    onLoad () {
      this.pageIndex++
      this.init()
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
