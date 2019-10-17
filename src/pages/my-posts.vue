<template>
  <div class="my-posts">
    <my-header url="#/profile" class="header">
      <span slot="middle">我的跟帖</span>
    </my-header>
    <div class="posts-list">
      <div class="post" v-for="post in postsList" :key="post.id">
        <div class="post-time">
          <span>2019-10-10 10:25</span>
        </div>
        <div class="comment-object" v-if="post.parent">
          <div class="object-name">
            <span>回复: {{post.parent.user.nickname}}</span>
          </div>
          <div class="object-post">
            <p>{{post.parent.content}}</p>
          </div>
        </div>
        <div class="comment">
          <p>{{post.content}}</p>
        </div>
        <router-link class="article" to="javascript:;">
          {{post.post.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import { getUserComments } from '@/api/users.js'

export default {
  components: {
    myHeader
  },
  data () {
    return {
      postsList: []
    }
  },
  async mounted () {
    let rsp = await getUserComments()
    this.postsList = [...rsp.data.data]
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.my-posts{
  .header{
    margin: 10px 0;
  }
  .posts-list{
    padding-top: 20px;
    .post{
      padding: 20px;
      border-bottom: solid 1px #d7d7d7;
      .post-time{
        display: flex;
        font-size: 14px;
        color: #a0a0a0;
      }
      .comment-object{
        margin: 10px 0 0;
        color: #929292;
        font-size: 13px;
        background-color: #e4e4e4;
        line-height: 24px;
        text-align: left;
        padding: 10px;
      }
      .comment{
        text-align: left;
        font-size: 14px;
        padding: 12px 0 22px;
      }
      .article{
        display: flex;
        font-size: 12px;
        color: #898989;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
