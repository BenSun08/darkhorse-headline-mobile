<template>
  <div class="my-posts">
    <my-header url="#/profile">我的跟贴</my-header>
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
</style>
