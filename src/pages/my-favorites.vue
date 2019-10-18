<template>
  <div class="my-favorites">
    <my-header url="#/profile" class="header">
      <span slot="middle">我的收藏</span>
    </my-header>
    <div class="favorites-list">
      <news-cell
        v-for="favorite in favorites"
        :key="favorite.id" :type="favorite.type"
        :cover="favorite.cover" :article-id="favorite.id"
      >
        <p slot="title">{{favorite.title}}</p>
        <span slot="author">{{favorite.user.nickname}}&nbsp;</span>
        <span slot="comments">{{favorite.comments.length+"跟帖"}}</span>
      </news-cell>

    </div>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'
import newsCell from '@/components/news-cell.vue'
import { getAllFavorites } from '@/api/users.js'

export default {
  components: {
    myHeader,
    newsCell
  },
  data () {
    return {
      favorites: []
    }
  },
  async mounted () {
    let rsp = await getAllFavorites()
    if (rsp.status + '' === '200') {
      this.favorites = [...rsp.data.data]
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.my-favorites{
  .header{
    margin: 10px 0;
  }
  .favorites-list{
    padding-top: 16px;
  }
}
</style>
