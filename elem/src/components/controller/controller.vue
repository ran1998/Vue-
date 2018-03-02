<template>
  <div id="controller">
   <transition name="move">
   <div class="remove-wrap" v-show="food.count>0" @click.stop.prevent="remove">
   <span class="icon-remove_circle_outline romove-icon"></span>
   </div>
   </transition>
   <div class="num" v-show="food.count>0">{{this.food.count}}</div>
   <div class="add-wrap" @click.stop.prevent="add">
   <span class="icon-add_circle add-icon"></span>
   </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
    },
    remove (event) {
      if (this.food.count < 0) {
        Vue.set(this.food, 'count', 0)
      } else {
        this.food.count--
      }
    }
  }
}
</script>
@import '../../Common/stylus/style.styl'

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
#controller
  font-size: 0px
  display: inline-block
  .remove-wrap
    display: inline-block
    transition: all 0.4s linear
    &.move-enter-active
      opacity: 1
      transform: translate3d(0, 0, 0)
    .romove-icon
      font-size: 24px
      color: rgb(0,160,220)
      line-height: 24px
      transition: all 0.4s linear
      transform: rotate(0)
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
    .romove-icon
      transform: rotate(180deg)
  .num
    width: 24px
    font-size: 10px
    color: rgb(147,153,159)
    line-height: 24px
    text-align: center
    display: inline-block
    vertical-align: top
  .add-wrap
    display: inline-block
    .add-icon
      font-size: 24px
      color: rgb(0,160,220)
      line-height: 24px
</style>
