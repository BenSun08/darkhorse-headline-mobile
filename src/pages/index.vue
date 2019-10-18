<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <img src="../assets/index/u6.png" alt="">
      </div>
      <div class="search">
        <div class="search-input">
          <img src="../assets/index/u8.png" alt="">
          <span>搜索新闻</span>
        </div>
      </div>
      <a class="profile" href="#/profile">
        <img src="../assets/index/u5.png" alt="">
      </a>
    </div>
    <van-tabs
      v-model="active"
      sticky animated swipeable
      @change="activeHandler"
    >
      <van-tab
        v-for="column in columnsList"
        :key="column.id" :title="column.name"
      >
        <van-loading type="spinner" color="#1989fa"
          size="24px" vertical v-if="column.colLoading"
        >
          加载中...
        </van-loading>
        <van-pull-refresh v-else
          v-model="column.isRefresh"
          @refresh="onRefresh"
        >
          <van-list
            v-model="column.loading" :finished="column.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="articles-list">
              <news-cell
                v-for="article in column.articlesList"
                :key="article.id" :type="article.type"
                :cover="article.cover" :article-id="article.id"
              >
                <p slot="title">{{article.title}}</p>
                <span slot="author">{{article.user.nickname}}&nbsp;</span>
                <span slot="comments">{{article.comment_length+"跟帖"}}</span>
              </news-cell>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, List, Loading, PullRefresh } from 'vant'
import { getColumnsList, getArticlesList } from '@/api/articles.js'
import newsCell from '@/components/news-cell.vue'
Vue.use(Tab).use(Tabs).use(List).use(Loading).use(PullRefresh)

export default {
  components: {
    newsCell
  },
  data () {
    return {
      pageSize: 4,
      active: 0,
      columnsList: []
    }
  },
  async mounted () {
    let rsp = await getColumnsList()
    this.columnsList = rsp.data.data.map(element => {
      return {
        ...element,
        colLoading: true,
        pageIndex: 1,
        pageSize: this.pageSize,
        articlesList: [],
        loading: false,
        finished: false,
        isRefresh: false
      }
    })
    this.activeHandler(this.active)
  },
  methods: {
    async activeHandler (index, title) {
      if (!this.columnsList[index].articlesList.length) {
        let { pageIndex, pageSize, id } = this.columnsList[index]
        let params = { pageIndex, pageSize, category: id }
        let rsp = await getArticlesList(params)
        if (rsp.status + '' === '200') {
          this.columnsList[index].articlesList = [...rsp.data.data]
          if (rsp.data.data.length < this.columnsList[index].pageSize) {
            this.columnsList[this.active].loading = false
            this.columnsList[this.active].finished = true
          } else {
            this.columnsList[this.active].loading = false
            this.columnsList[this.active].finished = false
          }
        }
      }
      setTimeout(() => {
        this.columnsList[this.active].colLoading = false
      }, 500)
    },
    onLoad () {
      let { pageIndex, pageSize, id, articlesList } = this.columnsList[this.active]
      if (pageIndex * pageSize > articlesList.length) {
        this.columnsList[this.active].loading = false
        this.columnsList[this.active].finished = true
        return
      }
      pageIndex++
      let params = { pageIndex, pageSize, category: id }
      setTimeout(() => {
        getArticlesList(params)
          .then(rsp => {
            if (rsp.status + '' === '200') {
              if (rsp.data.data.length) {
                this.columnsList[this.active].pageIndex++
                this.columnsList[this.active].articlesList.push(...rsp.data.data)
                this.columnsList[this.active].loading = false
                this.columnsList[this.active].finished = false
              } else {
                this.columnsList[this.active].loading = false
                this.columnsList[this.active].finished = true
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.columnsList[this.active].articlesList = []
        this.columnsList[this.active].pageIndex = 1
        this.columnsList[this.active].finished = false
        this.activeHandler(this.active)
        this.columnsList[this.active].isRefresh = false
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.index{
  .header{
    display: flex;
    align-items: center;
    width: 100%;
    height: 49*@vw-ratio;
    background-color: #ff0000;
    .logo{
      flex: 1;
      img{
        width: 54*@vw-ratio;
        height: 54*@vw-ratio;
      }
    }
    .search{
      flex: 3;
      .search-input{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 210*@vw-ratio;
        height: 34*@vw-ratio;
        background-color: #f97979;
        border-radius: 34*@vw-ratio;
        img{
          width: 18*@vw-ratio;
          height: 18*@vw-ratio;
        }
        span{
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .profile{
      flex: 1;
      img{
        width: 32*@vw-ratio;
        height: 32*@vw-ratio;
      }
    }
  }
}
</style>
