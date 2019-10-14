<template>
  <div class="header">
    <a :href="url">
      <img src="../assets/components/header.png" alt="back">
    </a>
    <span>
      <slot></slot>
    </span>
    <div class="complement"></div>
  </div>
</template>

<script>
export default {
  props: [
    'url'
  ]
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
  .header{
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2 !important;
    img
    ,.complement{
      width: 17*@vw-ratio;
      height: 17*@vw-ratio;
    }
    span{
      font-weight: bold;
      font-size: 14px;
    }
  }
</style>
