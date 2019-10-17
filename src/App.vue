<template>
  <div id="app">
    <!-- <div class="header"></div> -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <div class="pseudo-footer"></div> -->
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
#app {
  background-color: #f2f2f2;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .header{
    width: 100vw;
    height: 24*@vw-ratio;
    background-color: #757575;
  }
  .pseudo-footer{
    width: 100%;
    height: 48*@vw-ratio;
    background-color: #f2f2f2;
  }
  .footer{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 48*@vw-ratio;
    background-color: #000000;
  }
}
</style>
