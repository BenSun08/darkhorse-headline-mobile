<template>
  <div class="news-detail">
    <div class="head-body" @click="isWriting=false">
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
    </div>
    <div class="my-footer">
      <div class="pseudo-footer"
        :class="{'normal-height': !isWriting, 'writing-height': isWriting}"
      >
      </div>
      <div class="footer" v-if="!isWriting">
        <div class="write-comment">
          <div class="text-block" @click="isWriting=true">
            <span>写跟帖</span>
          </div>
        </div>
        <div class="comments-num" @click="$router.push('/brill-comments/'+news.id)">
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
      <div class="writing-footer" v-else>
        <div class="comment-text">
          <textarea autofocus
            cols="30" rows="10" :placeholder="'回复: @'+news.user.nickname"
            v-model="tempComment"
          >
          </textarea>
        </div>
        <div class="submit-container">
          <div class="submit">
            <my-button type="btn-follow" :has-followed="false"
              size="small" @click="submitHandler"
            >
              发送
            </my-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import myButton from '@/components/my-button.vue'
import { getArticleById, likeArticle, starArticle, postComment } from '@/api/articles.js'
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
      isWriting: false,
      tempComment: '',
      heights: ['60*@vw-ratio', '113*@vw-ratio'],
      news: {
        cover: [],
        user: {
          nickname: ''
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'index' || from.name === 'my-favorites') {
      localStorage.setItem('from_path', '#' + from.path)
    }
    next()
  },
  mounted () {
    this.fromPath = localStorage.getItem('from_path')
    getArticleById(this.$route.params.id)
      .then(rsp => {
        if (rsp.status + '' === '200') {
          this.news = { ...rsp.data.data }
        }
      })
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
    },
    async submitHandler () {
      let data = { content: this.tempComment }
      let rsp = await postComment(this.news.id, data)
      if (rsp.status + '' === '200') {
        Toast.success(rsp.data.message)
        this.tempComment = ''
        this.isWriting = false
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
  .pseudo-footer{
    width: 360*@vw-ratio;
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 8px;
    width: 360*@vw-ratio;
    height: 60*@vw-ratio;
    background-color: #f2f2f2;
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
  .writing-footer{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    box-sizing: border-box;
    width: 360*@vw-ratio;
    padding: 10px 4px 10px 10px;
    background-color: #f2f2f2;
    .comment-text{
      textarea{
        box-sizing: border-box;
        width: 261*@vw-ratio;
        height: 90*@vw-ratio;
        background-color: #d7d7d7;
        border: none;
        border-radius: 14px;
        font-size: 15px;
        line-height: 18px;
        padding: 14px;
      }
    }
    .submit-container{
      .submit{
        width: 59*@vw-ratio;
      }
    }
  }
  .has-stared{
    color: #ff0000;
  }
  .normal-height{
    height: 60*@vw-ratio;
  }
  .writing-height{
    height: 113*@vw-ratio;
  }
}
</style>
