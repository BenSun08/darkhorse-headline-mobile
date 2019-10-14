<template>
  <a :href="url" @click="clickHandler">
    <div class="navigation">
      <div class="option">
        <slot name="option" class="option"></slot>
      </div>
      <div class="description">
        <div class="span">
          <slot name="description"></slot>
        </div>
        <img src="../assets/components/to-icon.png" alt="">
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: [
    'url'
  ],
  methods: {
    clickHandler (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
@vw-ratio: 100/360vw;
a{
  .navigation{
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50*@vw-ratio;
    border-bottom: solid 1px #e4e4e4;
    .option{
      color: #000000;
      font-size: 14px;
    }
    .description{
      display: flex;
      align-items: center;
      .span{
        color: #a0a0a0;
        font-size: 12px;
        padding-right: 10px;
      }
      img{
        width: 17*@vw-ratio;
        height: 17*@vw-ratio;
      }
    }
  }
}
</style>
