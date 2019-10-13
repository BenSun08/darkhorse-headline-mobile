<template>
  <div class="my-follows">
    <div class="head">
      <img src="../assets/my-follows/u57.png" alt="back">
      <span>我的关注</span>
      <div class="complement"></div>
    </div>
    <div class="follows-list">
      <div class="follow">
        <div class="follow-avatar">
          <img src="../assets/my-follows/u285.png" alt="">
        </div>
        <div class="follow-name">
          <span>火星新闻播报</span>
          <span class="date">2019-10-10</span>
        </div>
        <div class="unfollow">
          <my-button text="取消关注"></my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myButton from '@/components/my-button.vue'

export default {
  components: {
    myButton
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.my-follows{
  .head{
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img
    ,.complement{
      width: 17*@vw-ratio;
      height: 17*@vw-ratio;
    }
    span{
      font-weight: bold;
    }
  }
  .follows-list{
    .follow{
      display: flex;
      align-items: center;
      height: 80*@vw-ratio;
      border-bottom: solid 1px #d7d7d7;
      .follow-avatar{
        flex: 1;
      }
      .follow-name{
        flex: 3;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        .date{
          font-size: 14px;
          color: #707070;
        }
      }
      .unfollow{
        flex: 1;
      }
    }
  }
}
</style>
