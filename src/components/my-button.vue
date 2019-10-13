<template>
  <div class="button" @click="clickHandler">
    {{text}}
  </div>
</template>

<script>
export default {
  props: [
    'text',
    'type',
    'size'
  ],
  methods: {
    clickHandler (event) {
      this.$emit('click', event)
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
</style>
