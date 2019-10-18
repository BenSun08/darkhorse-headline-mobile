<template>
  <div class="news-detail">
    <my-header :url="fromPath" class="header">
      <img slot="left" src="../assets/components/header-logo.png" alt="">
      <my-button slot="right" size="small" type="btn-follow"
        :has-followed="news.has_follow"
        @click="followHandler"
      >
        {{news.has_follow? '已关注': '关注'}}
      </my-button>
    </my-header>
    <div class="pseudo-header"></div>
    <div class="news">
      <div class="news-title">
        <h3>{{news.title}}</h3>
      </div>
      <div class="news-info">
        <span class="author">{{news.user.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="date">2019-10-10</span>
      </div>
      <div class="news-content" v-html="news.content"
        v-if="news.type==1 || news.cover.length>=3"
      >
      </div>
      <div class="video-content" v-else>
        <video :src="news.content" controls
          :poster="news.cover[0]"
        >
        </video>
      </div>
      <div class="like-share">
        <div class="like">
          <my-button type="btn-like" size="small"
            :has-liked="news.has_like" @click="likeHandler"
          >
            <van-icon slot="img" name="good-job-o" />
            <span slot="default">&nbsp;&nbsp;&nbsp;{{news.like_length}}</span>
          </my-button>
        </div>
        <div class="share">
          <my-button type="btn-like" size="small">
            <img slot="img" src="../assets/components/wechat.png" alt="">
            <span slot="default">&nbsp;&nbsp;&nbsp;微信</span>
          </my-button>
        </div>
      </div>
    </div>
    <div class="brill-comments">
      <div class="comment-title">
        <h3>精彩跟帖</h3>
      </div>
    </div>
    <div class="footer">
      <div class="write-comment">
        <div class="text-block">
          <span>写跟帖</span>
        </div>
      </div>
      <div class="comments-num">
        <img src="../assets/news-detail/comments.png" alt="">
        <div class="number">
          <my-button type="btn-follow" :has-followed="false"
            size="x-small"
          >
            {{news.comment_length}}
          </my-button>
        </div>
      </div>
      <div class="favorite" @click="favoriteHandler"
        :class="{'has-stared': news.has_star}"
      >
        <van-icon name="star-o"></van-icon>
      </div>
      <div class="share-news">
        <img src="../assets/news-detail/share.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import myButton from '@/components/my-button.vue'
import { getArticleById, likeArticle, starArticle } from '@/api/articles.js'
import { unfollow, follow } from '@/api/users.js'
import Vue from 'vue'
import { Toast, Icon } from 'vant'
Vue.use(Icon)

export default {
  components: {
    myHeader,
    myButton
  },
  data () {
    return {
      fromPath: '',
      news: {
        cover: [],
        user: {
          nickname: ''
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    localStorage.setItem('from_path', '#' + from.path)
    next()
  },
  async mounted () {
    this.fromPath = localStorage.getItem('from_path')
    let rsp = await getArticleById(this.$route.params.id)
    if (rsp.status + '' === '200') {
      this.news = { ...rsp.data.data }
    }
    localStorage.removeItem('from_path')
  },
  methods: {
    async followHandler () {
      if (this.news.has_follow) {
        this.news.has_follow = false
        let rsp = await unfollow(this.news.user.id)
        if (rsp.status + '' === '200') {
          Toast.success(rsp.data.message)
        }
      } else {
        this.news.has_follow = true
        let rsp = await follow(this.news.user.id)
        if (rsp.status + '' === '200') {
          Toast.success(rsp.data.message)
        }
      }
    },
    async likeHandler () {
      this.news.has_like = !this.news.has_like
      if (this.news.has_like) this.news.like_length++
      else this.news.like_length--
      let rsp = await likeArticle(this.news.id)
      if (rsp.status + '' === '200') {
        Toast.success(rsp.data.message)
      }
    },
    async favoriteHandler () {
      this.news.has_star = !this.news.has_star
      let rsp = await starArticle(this.news.id)
      if (rsp.status + '' === '200') {
        Toast.success(rsp.data.message)
      }
    }
  }
}
</script>

<style lang="less">
@vw-ratio: 100/360vw;
.news-detail{
  .header{
    position: fixed;
  }
  .pseudo-header{
    width: 100%;
    height: 57*@vw-ratio;
  }
  .news{
    padding: 0 20px;
    border-bottom: solid 5px #e4e4e4;
    .news-title{
      h3{
        font-weight: bold;
        line-height: 20px;
        text-align: left;
      }
    }
    .news-info{
      display: flex;
      font-size: 12px;
      color: #868686;
      padding: 10px 0;
      margin-bottom: 16px;
    }
    .news-content{
      width: 100%;
      .content{
        width: 100%;
        img{
          width: 100%;
        }
        a
        ,p{
          color: #000000;
          text-align: left;
          font-size: 14px;
          line-height: 26px;
        }
      }
    }
    .like-share{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 80px;
      .like
      ,.share{
        width: 79*@vw-ratio;
      }
    }
  }
  .brill-comments{
    .comment-title{
      padding: 20px;
    }
  }
  .footer{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 8px;
    .write-comment{
      .text-block{
        width: 181*@vw-ratio;
        height: 31*@vw-ratio;
        border-radius: 31*@vw-ratio;
        background-color: #d7d7d7;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
          font-size: 13px;
          color: #333333;
          text-indent: 2em;
        }
      }
    }
    img{
      width: 23*@vw-ratio;
      height: 23*@vw-ratio;
    }
    i{
      font-size: 23*@vw-ratio;
    }
    .comments-num{
      position: relative;
      .number{
        position: absolute;
        left: 4*@vw-ratio;
        top: -7*@vw-ratio;
        width: 34*@vw-ratio;
      }
    }
  }
  .has-stared{
    color: #ff0000;
  }
}
</style>
