<template>
  <div id="header">
   <div class="header-container">
   <div class="fl header-img">
   <span><img width="64px" height="64px" :src="seller.avatar"></span>
   </div>
   <div class="textWrap fr">
   <h3><span></span>{{seller.name}}</h3>
   <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
   <h5 v-if="seller.supports"><span :class="type[seller.supports[0].type]"></span>{{seller.supports[0].description}}</h5>
   </div>
   <div class="btn" v-if="seller.supports">
   <span v-if="seller.supports != null" @click="show()">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
   </div>
   </div>
   <div class="notice">
   <div class="notice-wrap">
   <span class="notice-img"></span>
   <span class="notice-text">{{seller.bulletin}}</span>
   </div>
   <span><i class="icon-keyboard_arrow_right"></i></span>
   </div>
   <div class="background"><img width="100%" height="auto" filter="blur(200px)" :src="seller.avatar"></div>
   <transition name="fold">
   <div class="layer" v-show="onOff">
   <div class="layer-wrap clear">
   <div class="layer-main">
   <h3>{{seller.name}}</h3>
   <div class="starWrap">
   <star :score="seller.score" :size="48"></star>
   </div>
   <div class="titleWrap">
   <lineText :message="text1"></lineText>
   </div>
   <ul v-if="seller.supports">
   <li v-for="item in seller.supports">
   <span :class="type[item.type]"></span>
   <p>{{item.description}}</p>
   </li>
   </ul>
   <div class="titleWrap">
   <lineText :message="text2"></lineText>
   </div>
   <div class="textWrap">
   <p>{{seller.bulletin}}</p>
   </div>
   </div>
   </div>
   <div class="layer-close" @click="close()"><i class="icon-close"></i></div>
   </div>
   </transition>
  </div>

</template>

<script>
import star from '../star/star.vue'
import lineText from '../lineText/lineText.vue'
export default {
  data () {
    return {
      onOff: false,
      text1: '优惠信息',
      text2: '商家公告'
    }
  },
  methods: {
    show () {
      this.onOff = true
    },
    close () {
      this.onOff = false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    lineText
  },
  created () {
    this.type = ['derease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'
@import '../../Common/stylus/style.styl'

#header
  width: 100%
  height: 134px
  background: rgba(7,17,27,0.5)
  color: #fff
  overflow: hidden
  position: relative
  .header-container
    position: relative
    font-size: 0
    padding: 24px 0px 18px 24px
    .header-img
      display: inline-block
    .textWrap
      font-size: 14px
      margin-left: 16px
      display: inline-block
      h3
        font-size: 16px
        font-weight: bold
        line-height: 18px
        margin: 2px 0px 8px 0px
        span
          width: 30px
          height: 18px
          display: inline-block
          margin-right: 6px
          bg-image("brand")
          vertical-align: top
          background-size: 30px 18px
      p
        font-size: 12px
        line-height: 12px
        margin-bottom: 10px
      h5
        font-size: 10px
        font-weight: 200
        margin-bottom: 2px
        span
          width: 12px
          height: 12px
          display: inline-block
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.derease
            bg-image("decrease_1")
          &.discount
            bg-image("discount_1")
          &.guarantee
            bg-image("guarantee_1")
          &.invoice
            bg-image("invoice_1")
          &.special
            bg-image("special_1")
    .btn
      position: absolute
      right: 12px
      bottom: 18px
      span
        padding: 6px 10px
        display: inline-block
        font-size: 10px
        color:rgb(255,255,255)
        font-weight: 200
        line-height: 24px
        background: rgba(0,0,0,0.2)
        border-radius: 16px
        vertical-align: top
        i
          display:inline-block
          margin-left: 2px
          font-size: 12px
          vertical-align: middle
  .notice
    width: 100%
    height: 28px
    background-color: rgba(0,0,0,0.2)
    position: relative
    bottom: 4px
    left: 0px
    
    .notice-wrap
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 0
      width:90%
      line-height: 28px
      margin-left: 12px
      .notice-img
        display: inline-block
        width: 22px
        height: 12px
        background-size: 22px 12px
        bg-image("bulletin")
        vertical-align: middle
      .notice-text
        display: inline-block
        font-size: 10px
        margin:0px 4px
        vertical-align: middle
    .icon-keyboard_arrow_right
      display:inline-block
      font-size: 12px
      position: absolute
      bottom: 10px
      right: 12px
  .background
    width: 100%
    height: auto
    position: absolute
    top: 0px
    left: 0px
    z-index: -99
    img
      filter:blur(10px)
  .layer
    width: 100%
    height: 100%
    position: fixed
    top: 0px 
    left: 0px
    background :rgba(7,17,27,0.8)
    z-index: 999
    font-size: 0
    overflow: auto
    backdrop-filter: blur(20px)
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.5s ease
    &.fold-enter-active
      animation-name: fold-in
      animation-duration: .5s
    &.fold-leave-active
      animation-name: fold-out
      animation-duration: .5s
    &.fold-enter, &.fold-leave-active
      opacity: 0
    .layer-wrap
      width: 100%
      min-height: 100%
      .layer-main
        font-size: 12px
        margin-top: 64px
        padding-bottom: 64px
        h3
          font-size: 16px
          font-weigth: 700
          color: rgb(255,255,255)
          line-height: 16px
          margin-bottom: 16px
          text-align: center
        .starWrap
          margin: 0px auto
        .titleWrap
          margin: 28px 0px 24px
        ul
          width: 80%
          margin: 0px auto
          padding-left: 12px
          font-size: 0px
          li
            margin-bottom: 12px
            &:last-child
              margin-bottom: 0px
            span
              width: 16px
              height: 16px
              background-size: 16px 16px
              display: inline-block
              &.derease
                bg-image("decrease_2")
              &.discount
                bg-image("discount_2")
              &.guarantee
                bg-image("guarantee_2")
              &.invoice
                bg-image("invoice_2")
              &.special
                bg-image("special_2")
            p
              display: inline-block
              font-size: 12px
              font-weight: 200
              color: rgb(255,255,255)
              line-height: 12px
              margin-left: 6px
              vertical-align: middle
              position: relative
              top: -6px
        .textWrap
          width: 80%
          margin: 0px auto
          padding-left: 12px
          font-size: 0px
          p
            font-size: 12px
            font-weight: 200
            color: rgb(255,255,255)
            line-height: 24px
    .layer-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px

</style>
