<template>
  <div id="lineText">
   <div class="line"></div>
   <div class="text">{{message}}</div>
   <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
#lineText
  display: flex
  width: 80%
  margin: 0px auto
  .line
    flex: 1
    position:relative
    top: -6px
    border-bottom: 1px solid rgba(255,255,255,0.2)
  .text
    margin: 0px 12px
    font-size: 14px
    font-weight: 700
    color: rgb(255,255,255)
    line-height: 14px
</style>
