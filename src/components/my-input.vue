<template>
  <input :class="{success: isLegal, fail: !isLegal}"
    :type="type" :placeholder="placeholder"
    :value="value" @input="inputHandler"
    @blur="validHandler">
</template>

<script>
import { Toast } from 'vant'

export default {
  props: [
    'type',
    'placeholder',
    'value',
    'err_msg',
    'rules'
  ],
  data () {
    return {
      inputed: '',
      isLegal: false
    }
  },
  methods: {
    inputHandler (event) {
      let { value } = event.target
      this.$emit('input', value)
      if (this.rules) {
        if (this.rules.test(value)) {
          this.isLegal = true
        } else {
          this.isLegal = false
        }
      }
    },
    validHandler (event) {
      let { value } = event.target
      if (this.rules) {
        if (this.rules.test(value)) {
          Toast.success('通过验证')
        } else {
          Toast.fail(this.err_msg || '错了哦')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  input{
    width: 100%;
    height: 38 / 360 * 100vw;
    padding: 10px 0;
    border: none;
    outline: none;
    border-bottom: solid 2px #666666;
    font-size: 18px;
    background-color: #f2f2f2;
  }
  input:focus
  ,.fail:focus{
    border-bottom: solid 2px #d81e06;
  }
  .success:focus{
    border-bottom: solid 2px #00ff9c;
  }
</style>
