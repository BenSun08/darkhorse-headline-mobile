<template>
  <div class="header">
    <a :href="url">
      <img src="../assets/components/header.png" alt="back">
      <div class="left">
        <slot name="left"></slot>
      </div>
    </a>
    <div class="middle">
      <slot name="middle"></slot>
    </div>
    <div class="complement">
      <slot name="right"></slot>
    </div>
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
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2 !important;
    padding: 0 20px;
    a{
      display: flex;
      align-items: center;
      >img{
        width: 15*@vw-ratio;
        height: 15*@vw-ratio;
      }
      .left{
        img{
          width: 54*@vw-ratio;
          height: 54*@vw-ratio;
        }
      }
    }
    .middle{
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      font-weight: bold;
      font-size: 14px;
    }
    .complement{
      width: 62*@vw-ratio;
    }
  }
</style>
