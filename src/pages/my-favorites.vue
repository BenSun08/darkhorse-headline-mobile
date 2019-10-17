<template>
  <div class="my-favorites">
    <my-header url="#/profile" class="header">
      <span slot="middle">我的收藏</span>
    </my-header>
  </div>
</template>

<script>
import myHeader from '@/components/my-header.vue'

export default {
  components: {
    myHeader
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
.my-favorites{
  .header{
    margin: 10px 0;
  }
}
</style>
