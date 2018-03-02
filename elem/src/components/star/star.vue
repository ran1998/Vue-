<template>
  <div id="star" :class="starType">
   <span v-for="starClass in starClasses" :class="starClass" class="item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const ON = 'on'
const HALF = 'half'
const OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    starClasses () {
      var result = []
      var score = Math.floor(this.score * 2) / 2
      var half = score % 1 !== false
      var int = Math.floor(score)
      for (var i = 0; i < int; i++) {
        result.push(ON)
      }
      if (half) {
        result.push(HALF)
      }
      while (result.length < LENGTH) {
        result.push(OFF)
      }
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'
#star
  text-align:center
  .item
    display: inline-block
    font-size: 0
    &:last-child
      margin-right: 0px
&.star-48
  .item
    width: 20px
    height: 20px
    background-size: 20px 20px
    margin-right: 22px
    &.on
      bg-image('star48_on')
    &.half
      bg-image('star48_half')
    &.off
      bg-image('star48_off')
&.star-36
  .item
    width: 15px
    height: 15px
    background-size: 15px 15px
    margin-right: 6px
    &.on
      bg-image('star36_on')
    &.half
      bg-image('star36_half')
    &.off
      bg-image('star36_off')
&.star-24
  .item
    width: 10px
    height: 10px
    background-size: 10px 10px
    margin-right: 3px
    &.on
      bg-image('star24_on')
    &.half
      bg-image('star24_half')
    &.off
      bg-image('star24_off')

</style>
