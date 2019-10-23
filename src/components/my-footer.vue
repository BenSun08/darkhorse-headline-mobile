<template>
  <div class="my-footer">
    <div class="pseudo-footer"
      :class="{'normal-height': !isWriting, 'writing-height': isWriting}"
    >
    </div>
    <div class="footer" v-if="!isWriting">
      <div class="write-comment">
        <div class="text-block" @click="Writing=true">
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
          cols="30" rows="10" :placeholder="'回复: @'+  replyObj"
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
</template>

<script>
import myButton from '@/components/my-button.vue'
import { getArticleById, starArticle, postComment } from '@/api/articles.js'
import Vue from 'vue'
import { Toast, Icon } from 'vant'

Vue.use(Icon)
export default {
  props: [
    'isWriting',
    'parentId',
    'parentName'
  ],
  components: {
    myButton
  },
  data () {
    return {
      Writing: this.isWriting,
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
  computed: {
    replyObj () {
      if (this.parentName) {
        return this.parentName
      } else {
        return this.news.user.nickname
      }
    }
  },
  watch: {
    isWriting (to, from) {
      this.Writing = to
    },
    Writing (to, from) {
      this.$emit('writing', to)
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getArticleById(this.$route.params.id)
        .then(rsp => {
          if (rsp.status + '' === '200') {
            this.news = { ...rsp.data.data }
          }
        })
    },
    async favoriteHandler () {
      this.news.has_star = !this.news.has_star
      let rsp = await starArticle(this.news.id)
      if (rsp.status + '' === '200') {
        Toast.success(rsp.data.message)
      }
    },
    async submitHandler () {
      let data = {}
      if (this.parentId) {
        data = {
          content: this.tempComment,
          parent_id: this.parentId
        }
      } else {
        data = { content: this.tempComment }
      }
      let rsp = await postComment(this.news.id, data)
      if (rsp.status + '' === '200') {
        Toast.success(rsp.data.message)
        this.tempComment = ''
        this.Writing = false
        this.$emit('submit')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.my-footer{
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
