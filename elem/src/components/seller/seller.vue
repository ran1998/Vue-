<template>
  <div id="seller" ref="sellerScroll">
  <div class="seller-scroll">
  <div class="seller-wrap">
  <div class="sellerHeader">
  <h3>{{seller.name}}</h3>
  <div class="sellerDesc">
  <star class="star" :size="36" :score="seller.score"></star>
  <span class="ratingCount">({{seller.ratingCount}})</span>
  <span class="sellCount">月售{{seller.sellCount}}单</span>
  </div>
  <div class="favorite">
  <span @click="toggleFavorite()" class="icon-favorite" :class="{favorActive: favorActive}"></span>
  <p>{{favoriteText}}</p>
  </div>
  </div>
  <div class="sellerRule">
  <ul>
  <li>
  <span class="label">起送价</span>
  <span class="value">{{seller.minPrice}}</span>元
  </li>
  <li>
  <span class="label">商家配送</span>
  <span class="value">{{seller.deliveryPrice}}</span>元
  </li>
  <li>
  <span class="label">平均配送时间</span>
  <span class="value">{{seller.deliveryTime}}</span>元
  </li>
  </ul>
  </div>
  </div>
  <split></split>
  <div class="seller-info">
  <h3>公告与活动</h3>
  <div class="infoText">
  <p>{{seller.bulletin}}</p>
  </div>
  <ul>
  <li v-for="item in seller.supports" class="supportsList">
  <span class="supportsIcon" :class="supportType[item.type]"></span>
  <span class="supportsText">{{item.description}}</span>
  </li>
  </ul>
  </div>
  <split></split>
  <div class="sellerPic-container">
  <h3>商家实景</h3>
  <div class="sellerPic">
  <div class="picWrap" ref="picWrapper">
  <ul ref="picContent">
  <li class="picList" v-for="item in seller.pics"><img width="120" height="90" :src="item"></li>
  </ul>
  </div>
  </div>
  </div>
  <split></split>
  <div class="sellerInfos">
  <h3>商家信息</h3>
  <ul>
  <li v-for="item in seller.infos" class="infosList">{{item}}</li>
  </ul>
  </div>
  </div>
  </div>
</template>

<script>
import star from '../star/star.vue'
import split from '../split/split.vue'
import BScroll from 'better-scroll'
// import {util} from '../../Common/js/util.js'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorActive: false,
      supportType: ['derease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this.picScroll()
        this.init_scroll()
      })
    }
  },
  created () {
    this.$nextTick(() => {
      this.picScroll()
      this.init_scroll()
    })
  },
  components: {
    star,
    split
  },
  methods: {
    toggleFavorite () {
      this.favorActive = !this.favorActive
    },
    init_scroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.sellerScroll, {
          click: true
        })
      })
    },
    picScroll () {
      if (this.seller.pics) {
        let width = 120
        let margin = 6
        let length = this.seller.pics.length
        this.$refs.picContent.style.width = (width + margin) * length - margin + 'px'
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      }
    }
  },
  computed: {
    favoriteText () {
      return this.favorActive ? '已收藏' : '收藏'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'

#seller
  position: absolute
  top: 174px
  left: 0px
  overflow: hidden
  width: 100%
  bottom: 0px
  .sellerHeader
    margin: 0px 18px
    padding: 18px 0px
    border-1px(rgba(7, 17, 27, 0.1))
    h3
      font-size: 10px
      color: rgb(7, 17 ,27)
      line-height: 14px
      margin-bottom: 8px
    .sellerDesc
      font-size: 0px
      display: inline-block
      .ratingCount,.sellCount,.star
        display: inline-block
      .ratingCount,.sellCount
        vertical-align: top
        font-size: 10px
        color: rgb(77, 85, 93)
        line-height: 18px
      .ratingCount
        margin-left: 8px
      .sellCount
        margin-left: 12px
    .favorite
      position: absolute
      top: 18px
      right: 0px
      text-align: center
      width: 36px
      span
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(77, 85, 93)
        &.favorActive
          color: rgb(240, 20, 20)
      p
        font-size: 10px
        color: rgb(77, 85, 93)
        line-height: 10px
        margin-top: 4px
  .sellerRule
    padding: 18px 0px
    ul
      display: flex
      li
        flex: 1
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
        &:last-child
          border-right: none
        .label
          display: block
          line-height: 10px
          margin-bottom: 4px
        .value
          font-size: 24px
          font-weight: lighter
          color: rgb(7, 17, 27)
          line-height: 24px
  .seller-info
    padding: 0px 18px
    h3
      font-size: 10px
      color: rgb(7, 17 ,27)
      font-weight: 700px
      line-height: 14px
      margin: 18px 0px 8px 0px
    .infoText
      margin: 0px 16px 12px
      p
        font-size: 12px
        font-weight: 200
        color: rgb(240, 20, 20)
        line-height: 24px
    ul
      .supportsList
        padding: 16px 0px 16px 12px
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        font-size: 0px
        .supportsIcon
          width: 16px
          height: 16px
          background-size: 16px 16px
          display: inline-block
          vertical-align: top
          &.derease
            bg-image("decrease_4")
          &.discount
            bg-image("discount_4")
          &.guarantee
            bg-image("guarantee_4")
          &.invoice
            bg-image("invoice_4")
          &.special
            bg-image("special_4")
        .supportsText
          display: inline-block
          margin-left: 6px
          font-size: 12px
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: 16px
          vertical-align: top
  .sellerPic-container
    padding: 18px
    padding-right: 0px
    h3
      font-size: 10px
      color: rgb(7, 17 ,27)
      font-weight: 700px
      line-height: 14px
      margin-bottom: 12px
    .sellerPic
      font-size: 0px
      ul
        width: 100%
        overflow: hidden
        white-space: nowrap
	    .picList
	      display: inline-block
	      margin-right: 6px
	      &:last-child
	        margin-right: 0px
  .sellerInfos
    padding: 0px 18px
    h3
      font-size: 10px
      color: rgb(7, 17 ,27)
      font-weight: 700px
      line-height: 14px
      margin: 18px 0px 12px 0px
    .infosList
      padding: 16px 12px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      font-size: 12px
      font-weight: 200
      color: rgb(7, 17, 27)
      line-height: 16px




 



</style>
