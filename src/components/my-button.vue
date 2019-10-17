<template>
  <div class="button" @click="clickHandler(parentKey)"
    :class="[type, size,
      {'btn-follow': !hasFollowed&&type=='btn-follow', 'btn-like': hasFollowed&&type=='btn-follow'},
      {'btn-liked': hasLiked&&type=='btn-like', 'btn-like': !hasLiked&&type=='btn-like'}]"
    >
    <slot name="img"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'size',
    'parentKey',
    'hasFollowed',
    'hasLiked'
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
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 17*@vw-ratio;
      height: 17*@vw-ratio;
    }
    i{
      font-size: 22px;
    }
    span{
      text-align: center;
      vertical-align: middle;
    }
  }
  .danger{
    color: #ffffff;
    background-color: #cc3300;
  }
  .info{
    color: #000000;
    background-color: #e1e1e1;
  }
  .btn-follow{
    color: #ffffff;
    background-color: #ff0000;
  }
  .btn-like{
    color: #000000;
    border: solid 1px #797979;
    background-color: #f2f2f2;
  }
  .btn-liked{
    color: #ff0000;
    border: solid 1px #ff0000;
    background-color: #f2f2f2;
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
  .small{
    height: 26*@vw-ratio;
    line-height: 26*@vw-ratio;
    font-size: 12px;
  }
</style>
