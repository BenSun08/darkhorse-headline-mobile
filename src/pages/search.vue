<template>
  <div class="search">
    <div class="header">
      <div class="header-left">
        <van-icon name="arrow-left" class="search-icon" @click="$router.push('/')"/>
      </div>
      <div class="header-middle">
        <van-icon name="search"></van-icon>
        <input type="text" :value="params.keyword"
          @change="enterSearch" @input="inputHandler">
      </div>
      <div class="header-right">
        <span @click="searchHandler">搜索</span>
      </div>
    </div>
    <div class="history">
      <div class="history-title">
        <h3>历史记录</h3>
      </div>
      <div class="history-list">
        <span v-for="(history,index) in historyList"
          :key="index" @click="searchHistory">
          {{history}}
        </span>
      </div>
    </div>
    <div class="results-list">
      <news-cell
        v-for="result in resultsList"
        :key="result.id" :type="result.type"
        :cover="result.cover" :article-id="result.id"
      >
        <p slot="title">{{result.title}}</p>
        <span slot="author">{{result.user.nickname}}&nbsp;</span>
        <span slot="comments">{{result.comments.length+"跟帖"}}</span>
      </news-cell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { getSearches } from '@/api/articles.js'
import newsCell from '@/components/news-cell.vue'
Vue.use(Icon)

export default {
  components: {
    newsCell
  },
  mounted () {
    this.historyList = JSON.parse(localStorage.getItem('search_history')) || []
  },
  data () {
    return {
      params: {
        keyword: ''
      },
      resultsList: [],
      historyList: []
    }
  },
  methods: {
    /* not handle yet ------------------------------------------------------------ */
    inputHandler (event) {
      this.params.keyword = event.target.value.trim()
      // getRecommends(this.params)
      //   .then((rsp) => {
      //     if (rsp.status + '' === '200') {
      //       console.log(rsp)
      //       this.resultsList = [...rsp.data.data]
      //     }
      //   })
    },
    /* not handle yet ------------------------------------------------------------ */
    enterSearch () {
      this.searchHandler()
    },
    searchHandler () {
      getSearches(this.params)
        .then((rsp) => {
          if (rsp.status + '' === '200') {
            this.resultsList = [...rsp.data.data]
            if (this.params.keyword !== '') {
              let history = localStorage.getItem('search_history')
              let historyList = JSON.parse(history) || []
              if (historyList.findIndex(element => element === this.params.keyword) === -1) {
                historyList.push(this.params.keyword)
                localStorage.setItem('search_history', JSON.stringify(historyList))
              }
              this.params.keyword = ''
              this.historyList = JSON.parse(localStorage.getItem('search_history'))
            }
          }
        })
    },
    searchHistory (event) {
      this.params.keyword = event.target.innerText
      this.searchHandler()
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.search{
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 360*@vw-ratio;
    height: 38*@vw-ratio;
    margin: 10px 0;
    padding: 0 20px;
    .header-middle{
      position: relative;
      i{
        position: absolute;
        left: 12*@vw-ratio;
        top: 12*@vw-ratio;
      }
      input{
        width: 258*@vw-ratio;
        height: 38*@vw-ratio;
        border-radius: 38*@vw-ratio;
        outline: none;
        border: solid 1px #d7d7d7;
        background-color: #f2f2f2;
        text-indent: 3em;
        font-size: 12px;
      }
    }
    .header-right{
      font-size: 14px;
    }
  }
  .history{
    padding: 10px 20px;
    border-bottom: solid 1px #d7d7d7;
    .history-title{
      font-size: 14px;
      font-weight: bold;
      text-align: left;
    }
    .history-list{
      display: flex;
      flex-wrap: wrap;
      font-size: 12px;
      padding: 10px 0;
      span{
        background-color: #dddddd;
        padding: 5px;
        margin: 10px 18px 0 0;
      }
    }
  }
}
</style>
