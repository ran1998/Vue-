<template>
  <transition name="move">
  <div id="food" v-show="foodFlag" ref="foodFlag">
   <div class="food-container">
   <div class="food-header">
   <div class="back" @click="back">
   <span><i class="icon-arrow_lift"></i></span>
   </div>
   <img :src="selectFood.image">
   </div>
   <div class="food-content">
   <h3>{{selectFood.name}}</h3>
   <div class="desc">
   <span>月售{{selectFood.sellCount}}份<span class="rating">好评率{{selectFood.rating}}%</span></span>
   </div>
   <div class="price">
   <span>￥<strong class="newPrice">{{selectFood.price}}</strong></span>
   <span v-show="selectFood.oldPrice" class="oldPrice">￥<strong >{{selectFood.oldPrice}}</strong></span>
   </div>
   <div class="controller-wrap">
   <controller :food="selectFood"></controller>
   </div>
   <transition name="fade">
   <div class="pay" v-show="!selectFood.count || selectFood.count==0" @click.stop.prevent="addNum($event)"><span>加入购物车</span></div>
   </transition>
   </div>
   <split></split>
   <div class="info">
   <h3>商品介绍</h3>
   <p>{{selectFood.info}}</p>
   </div>
   <split></split>
   <div class="ratings-wrap">
   <h3>商品评价</h3>
   <foodRating :ratings="selectFood.ratings" :ratingType="ratingType" :onlyContent="onlyContent" :desc="desc" @editType="editType" @editShow="editShow"></foodRating>
   <transition name="move">
   <ul>
   <li v-for="rating in selectFood.ratings" class="ratingList" v-show="needShow(rating.rateType, rating.text)">
   <div class="user">
   <span class="username">{{rating.username}}</span>
   <div class="avatar">
   <img :src="rating.avatar">
   </div>
   </div>
   <div class="ratingContent">
   <div class="time">{{rating.rateTime | getDate}}</div>
   <p class="text"><span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}</p>
   </div>
   </li>
   </ul>
   </transition>
   </div>
   </div>
  </div>
  </transition>
</template>

<script>
import controller from '../controller/controller'
import foodRating from '../foodRating/foodRating'
import split from '../split/split'
import BScroll from 'better-scroll'
import Vue from 'vue'
import getDate from '../../Common/js/date'

const ALL = 2

export default {
  data () {
    return {
      foodFlag: false,
      ratingType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        postive: '推荐',
        navtive: '吐槽'
      }
    }
  },
  props: {
    selectFood: {
      type: Object
    }
  },
  methods: {
    show () {
      this.foodFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodFlag, {
            click: true
          })
        }
      })
    },
    back () {
      this.foodFlag = false
    },
    addNum (event) {
      if (!this.selectFood.count) {
        Vue.set(this.selectFood, 'count', 1)
      }
    },
    editType ($type) {
      this.ratingType = $type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    editShow () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (!text && this.onlyContent) {
        return false
      }
      if (this.ratingType === ALL) {
        return true
      } else {
        return type === this.ratingType
      }
    }
  },
  components: {
    controller,
    split,
    foodRating
  },
  filters: {
    getDate (time) {
      let date = new Date(time)
      return getDate(date, 'yyyy-MM-dd hh-mm')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'
@import '../../Common/stylus/style.styl'

#food
  width: 100%
  height: 100%
  position: fixed
  bottom: 48px
  overflow: hidden
  background: #fff
  transition: 0.5s all ease
  &.move-enter-active
    transform: translate3d(0,0,0)
  &.move-enter
    transform: translate3d(100%,0,0)
  &.move-leave-active
    transform: translate3d(100%,0,0)
  .food-container
    .food-header
      width: 100%
      height: 0
      padding-top: 100%
      position: relative
      img
        position: absolute
        top: 0px
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 48px
        left: 0px
        z-index: 999
        .icon-arrow_lift
          padding: 10px
          display: inline-block
          color: #fff
    .food-content
      padding: 18px
      position: relative
      h3
        font-size: 14px
        font-weight: bold
        color: rgb(7,17,27)
        line-height: 14px
        margin-bottom: 8px
      .desc
        font-size: 10px
        color: rgb(147,153,150)
        line-height: 10px
        margin: 8px 0px 5px 0px
        .rating
          margin-left: 12px
      .price
        margin-top: 18px
        span
          font-size: 10px
          color: rgb(240,20,20)
          strong
            font-size: 16px
            font-weight: bold
            line-height: 24px
            vertical-align: baseline
          &.oldPrice
            color: rgb(147,153,159)
            margin-left: 8px
            position: relative
            top: 1px
            text-decoration:line-through
            strong
              font-size: 10px
              vertical-align: bottom
      .controller-wrap
        position: absolute
        bottom: 18px
        right: 18px
      .pay
        padding: 6px 12px
        border-radius: 24px
        background: rgb(0,160,220)
        font-size: 0px
        position: absolute
        bottom: 18px
        right: 18px
        transition: 0.5 all
        &.fade-enter-active
          opacity: 1
        &.fade-enter,.fade-leave-active
          opacity: 0
        span
          font-size: 10px
          color: rgb(255,255,255)
          line-height: 12px
    .info
      padding: 18px
      h3
        font-size: 14px
        color: rgb(7,17,27)
        font-weight: 700
        line-height: 14px
      p
        font-size: 12px
        font-weight: 200
        color: rgb(77,85,93)
        line-height: 24px
        margin: 6px 0px 0px 8px
    .ratings-wrap
      h3
        font-size: 14px
        color: rgb(7,17,27)
        font-weight: 700
        line-height: 14px
        margin: 18px 0px 0px 18px
      ul
        padding: 0px 18px
        .ratingList
          padding: 16px 0px
          border-1px(rgba(7, 17, 27, 0.1))
          position: relative
          transition: 0.2s all
          &.move-enter-acitve
            transform: translate3d(0,-100%,0)
          &.move-enter
            transform: translate3d(0,0,0)
          &.move-leave-active
            transform: translate3d(0,0,0)
          .user
            float: right
            display: inline-block
            .username
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 12px
              display: inline-block
              margin-right: 6px
            .avatar
              width: 12px
              height: 12px
              border-radius: 50%;
              display: inline-block
              overflow: hidden
              img
                width: 12px
                height: 12px
          .ratingContent
            .time
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 12px
              margin-bottom: 6px
            .text
              line-height: 16px
              font-size: 12px
              color: rgb(7, 17, 27)
              span
                width: 12px
                height: 12px
                display: inline-block
              .icon-thumb_up, .icon-thumb_down
                vertical-align: top
                margin-right: 4px
                line-height: 16px
                font-size: 12px
              .icon-thumb_up
                color: rgb(0, 160, 220)
              .icon-thumb_down
                color: rgb(147, 153, 159)
              

</style>
