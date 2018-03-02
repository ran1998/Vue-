<template>
  <div id="split" >
  <div class="border-top"></div>
  <div class="split"></div>
  <div class="border-bottom"></div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'

.split-wrap 
#split
  .border-top
    border-1px(rgba(7,17,27,0.1))
  .split
    width: 100%
    height: 16px
    background: #f3f5f7
  .border-bottom
    border-1px(rgba(7,17,27,0.1))
</style>
