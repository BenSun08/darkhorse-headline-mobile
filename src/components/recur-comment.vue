<template>
  <div class="rec-comment">
    <rec-comment v-if="parent"
      :cur-id="parent.id"
      :user-name="parent.user.nickname"
      :content="parent.content"
      :parent="parent.parent"
      @click="ascendHandler"
    >
    </rec-comment>
    <div class="rec-info">
      <div class="info-left">
        <span class="name">{{userName}}</span>
        <span class="time">2小时前</span>
      </div>
      <div class="info-right" @click="descendHandler">
        <span>回复</span>
      </div>
    </div>
    <div class="rec-content">
      <span>{{content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recComment',
  props: [
    'curId',
    'userName',
    'content',
    'parent'
  ],
  methods: {
    descendHandler () {
      this.$emit('click', this.curId)
    },
    ascendHandler (id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.rec-comment{
  padding: 3px;
  border: solid 1px #d7d7d7 ;
  .rec-info{
    display: flex;
    justify-content: space-between;
    margin: 10px 10px 5px;
    .info-left{
      display: flex;
      align-items: center;
      .name{
        font-size: 16px;
      }
      .time{
        font-size: 12px;
        color: #707070;
        padding-left: 8px;
      }
    }
    .info-right{
      font-size: 12px;
      color: #707070;
    }
  }
  .rec-content{
    display: flex;
    font-size: 16px;
    padding-top: 10px;
    margin: 5px 10px 10px;
  }
}
</style>
