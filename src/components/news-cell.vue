<template>
  <div class="news-cell" @click="$router.push({path: `/news-detail/${articleId}`})">
    <div class="news-info">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="multi-cover" v-if="cover.length>=3">
        <div class="multi-container" v-for="img in cover" :key="img.id">
          <img :src="img.url" alt="">
        </div>
      </div>
      <div class="video-cover" v-else-if="type == 2">
        <img :src="cover[0].url" alt="">
        <div class="video-play">
          <img src="../assets/components/news-cell-video-play.png" alt="">
        </div>
      </div>
      <div class="source">
        <slot class="author" name="author"></slot>
        <slot class="comments" name="comments"></slot>
      </div>
    </div>
    <div class="single-cover" v-if="type == 1 && cover.length <= 2">
      <img :src="cover[0].url" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'cover',
    'articleId'
  ]
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.news-cell{
  display: flex;
  box-sizing: border-box;
  width: 100%;
  // background-color: #ffffff;
  padding: 14px 10px 12px;
  border-bottom: solid 1px #cccccc;
  .news-info{
    flex: 2;
    .title{
      text-align: left;
      line-height: 24px;
      margin-bottom: 6px;
    }
    .video-cover{
      position: relative;
      width: 100%;
      >img{
        width: 100%;
      }
      .video-play{
        position: absolute;
        width: 46*@vw-ratio;
        height: 46*@vw-ratio;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        >img{
          width: 30*@vw-ratio;
          height: 30*@vw-ratio;
        }
      }
    }
    .multi-cover{
      width: 100%;
      display: flex;
      .multi-container{
        flex: 1;
        padding: 0 1px;
        img{
          width: 100%;
        }
      }
    }
    .source{
      display: flex;
      font-size: 12px;
      color: #999999;
      margin-top: 12px;
    }
  }
  .single-cover{
    flex: 1;
    img{
      width: 100%;
    }
  }
}
</style>
