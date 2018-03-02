<template>
  <div id="shopCat">

  <div class="shopCat-wrap" @click="toggle()">
  <div class="shopCat-left">
  <div class="logo-wrap">
  <span class="logo-bg" :class="{light:totleCount>0}"><i :class="{light:totleCount>0}" class="icon-shopping_cart"></i></span>
  <div class="num" v-show="totleCount>0">{{totleCount}}</div>
  </div>
  <div class="price" :class="{light:totlePrice>0}">￥{{totlePrice}}</div>
  <div class="desc">{{livePrice}}</div>
  </div>

  <div class="shopCat-right" :class="payActive">
  {{dePrice}}
  </div>
  </div>
  
   <div class="ball-container">
      <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
        <div class="inner inner-hook"></div>
      </div>
  </div>
  <transition name="move">
  <div class="shopcart-list" v-show="showList">
  <div class="shop-header">
  <h4 class="buy">购物车</h4>
  <span class="empty" @click="empty">清空</span>
  </div>
  <div class="list-content" ref="list">
  <ul>
  <li v-for="food in selectFood">
  <p class="name">{{food.name}}</p>
  <span class="price">￥{{food.price}}</span>
  <div class="cartcontrol-wrapper">
    <controller :food="food"></controller>
  </div>
  </li>
  </ul>
  </div>
  </div>
  </transition>
  <transition name="fade">
  <div class="list-mask" v-show="showList" @click="hideMask"></div>
  </transition>
  </div>
</template>

<script>
import controller from '../controller/controller'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      onOff: true
    }
  },
  props: {
    selectFood: {
      type: Array,
      default () {
        return [{
          count: 0,
          price: 10
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totlePrice () {
      let totle = 0
      this.selectFood.forEach(food => {
        totle += food.price * food.count
      })
      return totle
    },
    totleCount () {
      let totleCount = 0
      this.selectFood.forEach(food => {
        totleCount += food.count
      })
      return totleCount
    },
    dePrice () {
      if (this.totlePrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totlePrice - this.minPrice < 0) {
        let diff = this.minPrice - this.totlePrice
        return `还需￥${diff}起送`
      } else {
        return `去结算`
      }
    },
    payActive () {
      if (this.totlePrice - this.minPrice < 0) {
        return 'no-enght'
      } else {
        return 'enght'
      }
    },
    livePrice () {
      if (this.totlePrice === 0) {
        return '还未选购商品'
      } else {
        return `配送费${this.deliveryPrice}元`
      }
    },
    showList () {
      if (!this.totleCount) {
        this.onOff = true
        return false
      }
      let show = !this.onOff
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.list, {
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    drop (el) {
      console.log(el)
    },
    toggle () {
      if (!this.totleCount) {
        return
      }
      this.onOff = !this.onOff
    },
    empty () {
      this.selectFood.forEach(item => {
        item.count = 0
        console.log(item)
      })
    },
    hideMask () {
      this.onOff = true
    }
  },
  components: {
    controller
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'

#shopCat
  position: fixed
  left: 0px
  bottom: 0px
  width: 100%
  z-index: 9
  .shopCat-wrap
    background: #141d27
    display: flex
    .shopCat-left
      flex: 1
      font-size: 0px
      .logo-wrap
        display: inline-block
        position: relative
        top: -10px
        background: #141d27
        width: 56px
        height: 56px
        padding: 6px
        margin: 0px 12px
        box-sizing: border-box
        border-radius: 50%
        .logo-bg
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c
          display: inline-block
          &.light
            background: rgb(0, 160, 220)
          i
            width: 24px
            height: 24px
            font-size: 24px
            color: rgba(255,255,255,0.4)
            line-height: 44px
            z-index: 999
            &.light
              color: #fff
      .num
        width: 24px
        height: 16px
        position: absolute
        top: 0px
        right: 0px
        border-radius: 16px
        line-height: 16px
        text-align: center
        font-size: 9px
        font-weight: 700
        color: #fff
        background: rgb(240, 20, 20)
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        font-size: 18px
        color: rgba(255,255,255,0.4)
        font-weight: 700
        line-height: 24px;
        padding-right: 12px
        border-right: 1px solid rgba(255,255,255,0.1)
        box-sizing: border-box
        vertical-align: top
        margin-top: 15px
        &.light
          color: #fff
      .desc
        display: inline-block
        font-size: 14px
        color: rgba(255,255,255,0.4)
        font-weight: lighter
        line-height: 24px
        margin-left: 12px
        vertical-align: top
        margin-top: 15px
    .shopCat-right
      flex: 0 0 105px
      width: 105px
      font-size: 12px
      color: rgba(255,255,255,0.4)
      font-weight: 700
      line-height: 56px
      text-align: center
      &.no-enght
        background: #2b333b
        color: #fff
      &.enght
        background: #00b43c
        color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      &.drop-transition
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        ransition: all 0.4s linear
  .shopcart-list
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    z-index: -1
    transition: 0.5s all linear
    transform: translate3d(0,-100%,0)
    &.move-enter-active
      transform: translate3d(0,-100%,0)
    &.move-enter
      transform: translate3d(0,0,0)
    &.move-leave-active
      transform: translate3d(0,0,0)
    .shop-header
      background: #f3f5f7
      height: 40px
      line-height: 40px
      border-sizing: border-box
      border-bottom: 1px solid rgba(7,17,27,0.1)
      padding: 0 18px
      .buy
        float: left
        font-size: 14px
        color: rgb(7,17,27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0px 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      li
        padding: 12px 0px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        border-sizing: border-box
        position: relative
        .name
          font-size: 14px
          color: rgb(7,17,27)
          line-height: 24px
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
.list-mask
  width: 100%
  height: 100%
  position: fixed
  top: 0px
  left: 0px
  background: rgba(7,17,27,0.6)
  z-index: -99
  backdrop-filter: blur(10px)
  transition: 0.2s all ease
  &.fade-enter-active
    opacity: 1
  &.fade-enter
    opacity: 0
  &.fade-enter-active
    opacity: 0
    background: rgba(7,17,27,0)

</style>
