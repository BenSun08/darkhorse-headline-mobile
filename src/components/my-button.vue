<template>
  <div class="button" @click="clickHandler(parentKey)"
    :class="[type, size]"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'size',
    'parentKey'
  ],
  methods: {
    clickHandler (value) {
      this.$emit('click', value)
    }
  }
}
</script>

<style lang="less">
@vw-ratio: 100/360vw;
  .button{
    width: 100%;
    height: 48*@vw-ratio;
    line-height: 48*@vw-ratio;
    font-size: 18px;
    border-radius: 48*@vw-ratio;
    color: #ffffff;
    background-color: #cc3300;
  }
  .danger{
    color: #ffffff;
    background-color: #cc3300;
  }
  .info{
    color: #000000;
    background-color: #e1e1e1;
  }
  .large{
    line-height: 48*@vw-ratio;
    font-size: 18px;
    border-radius: 48*@vw-ratio;
  }
  .middle{
    height: 30*@vw-ratio;
    font-size: 12px;
    line-height: 30*@vw-ratio
  }
</style>
