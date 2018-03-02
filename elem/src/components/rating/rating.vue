<template>
  <div id="ratings-container" ref="ratings">
  <div class="rating-scroll">
   <div class="score-wrap">

   <div class="score-left">
   <h1>{{seller.score}}</h1>
   <h3>综合评分</h3>
   <span>高于周边商家{{seller.rankRate}}%</span>
   </div>

   <div class="score-right">
   <div class="serviceScore">
   <span class="scoreText">服务态度</span>
   <star class="star" :size="36" :score="seller.serviceScore"></star>
   <span class="scoreNum">{{seller.serviceScore}}</span>
   </div>
   <div class="sellerScore">
   <span class="scoreText">商品评分</span>
   <star class="star" :size="36" :score="seller.foodScore"></star>
   <span class="scoreNum">{{seller.foodScore}}</span>
   </div>
   <div class="arriveTime"><span class="scoreText">送达时间</span><span class="Time">{{seller.deliveryTime}}分钟</span></div>
   </div>

   </div>
   <split></split>
   <foodRating :ratings="ratings" :ratingType="ratingType" :onlyContent="onlyContent" :desc="desc" @editType="editType" @editShow="editShow"></foodRating>

   <div class="rating-wrap">
   <ul>
   <li class="ratingsList" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
   <div class="avatar">
   <img :src="rating.avatar">
   </div>
   <div class="ratingContent">
   <span class="username">{{rating.username}}</span>
   <div class="scoreInfo">
   <star class="star" :size="24" :score="rating.score"></star>
   <span v-if="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
   </div>
   <p class="ratingText">{{rating.text}}</p>
   <div class="recommend-wrap">
   <span class="rateIcon" :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span>
   <span v-if="rating.recommend && rating.recommend.length" class="recommend" v-for="item in rating.recommend">{{item}}</span>
   </div>
   <div class="rateTime">{{rating.rateTime|getDate}}</div>
   </div>
   </li>
   </ul>
   </div>
   </div>
  </div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import foodRating from '../foodRating/foodRating'
import BScroll from 'better-scroll'
import getDate from '../../Common/js/date.js'

const ALL = 2
// const SATISFIED = 0
// const DISSATISFIED = 1
const ERRNO = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      ratingType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        postive: '满意',
        navtive: '不满意'
      }
    }
  },
  methods: {
    editType ($type) {
      this.ratingType = $type
    },
    editShow () {
      this.onlyContent = !this.onlyContent
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
  created () {
    this.ratings = this.$store.state.ratings
    // this.$http.get('/api/ratings').then((res) => {
    //   if (res.body.error === ERRNO) {
    //     console.log(res.body.data)
    //     this.ratings = res.body.data
    //   }
    // })
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true
      })
    })
  },
  filters: {
    getDate (time) {
      let date = new Date(time)
      return getDate(date, 'yyyy-MM-dd hh-mm')
    }
  },
  components: {
    star,
    split,
    foodRating
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'

#ratings-container
  width: 100%
  position: absolute
  left: 0px
  bottom: 0px
  top: 174px
  overflow: hidden
  .score-wrap
    padding: 18px 0px
    display: flex
    .score-left
      flex: 0 0 137px
      width: 137px
      text-align: center
      border-right: 1px solid rgba(7,17,27,0.1)
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      h1
        font-size: 24px
        color: rgb(255,153,0)
        line-height: 28px
      h3
        font-size: 12px
        color: rgb(7,17,27)
        line-height: 12px
        margin: 6px 0px 6px 0px
      span
        font-size: 10px
        color: rgb(147,153,159)
        line-height: 10px
        margin-bottom: 6px
        display: inline-block
    .score-right
      flex: 1
      padding: 0px 24px
      @media only screen and (max-width: 320px)
        padding: 0px 6px
      .serviceScore,.sellerScore,.arriveTime
        width: 100%
        margin-bottom: 8px
        font-size: 0px
        .scoreText
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 18px
          display: inline-block
          vertical-align: top
        .star,.Time
          display: inline-block
          margin: 0px 10px
        .scoreNum
          font-size: 12px
          color: rgb(255, 153 ,0)
          line-height: 18px
          display: inline-block
          vertical-align: top
      .arriveTime
        margin-bottom: 0px
        .Time
          font-size: 12px
          color: rgb(147,153,159)
          line-height: 18px
  .rating-wrap
    ul
      padding: 0px 18px
      .ratingsList
        padding: 18px 0px
        border-1px(rgba(7,17,27,0.1))
        display: flex
        .avatar
          flex: 0 0 28px
          width: 28px
          height: 28px
          border-radius: 50%
          overflow: hidden
          margin-right: 12px
          img
            width: 28px
            height: 28px
        .ratingContent
          flex: 1
          position: relative
          font-size: 0px
          .username
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
          .scoreInfo
            margin: 4px 0px 6px 0px
            .deliveryTime,.star
              display: inline-block
            .deliveryTime
              margin-left: 6px
              font-size: 10px
              font-weight: 200
              color: rgb(147, 153, 159)
              line-height: 12px
          .ratingText
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-bottom: 8px
          .recommend-wrap
            .rateIcon
              display: inline-block
              font-size: 12px
              line-height: 16px
              &.icon-thumb_up
                color: rgb(0, 160, 220)
              &.icon-thumb_down
                color: rgb(147, 153, 159)
            .recommend
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              background: rgb(255, 255, 255)
              margin-left: 8px
              display: inline-block
              vertical-align: top
          .rateTime
            position: absolute
            top: 0px
            right: 0px
            font-size: 10px
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px












</style>
