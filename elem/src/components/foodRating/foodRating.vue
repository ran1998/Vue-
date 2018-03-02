<template>
  <div id="foodRating">
  <div class="ratingTab">
  <span v-if="ratings != null" @click=toggle(2,$event) class="public bule" :class="{'active':ratingType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
  <span v-if="postive != null" @click=toggle(0,$event) class="public bule" :class="{'active':ratingType === 0}">{{desc.postive}}<span class="count">{{postive.length}}</span></span>
  <span v-if="navtive != null" @click=toggle(1,$event) class="public gray" :class="{'active':ratingType === 1}">{{desc.navtive}}<span class="count">{{navtive.length}}</span></span>
  </div>
  <div @click=onOff() class="ratingFilter" :class="{'on':onlyContent}">
  <span><i class="icon-check_circle"></i></span>
  <span class="text">只看有内容的评价</span>
  </div>
  </div>
</template>

<script>
const All = 2
const POSTIVE = 0
const NAVTIVE = 1

export default {
  props: {
    ratings: {
      type: Array
    },
    ratingType: {
      type: Number,
      default: All
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          postive: '推荐',
          navtive: '吐槽'
        }
      }
    }
  },
  computed: {
    postive () {
      return this.ratings.filter(rating => {
        return rating.rateType === POSTIVE
      })
    },
    navtive () {
      return this.ratings.filter(rating => {
        return rating.rateType === NAVTIVE
      })
    }
  },
  methods: {
    toggle ($type, event) {
      this.ratingType = $type
      this.$emit('editType', $type)
    },
    onOff () {
      this.onlyContent = !this.onlyContent
      this.$emit('editShow')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'

#foodRating
  width: 100%
  border-bottom: 1px solid rgba(7, 17, 27, 0.1)
  .ratingTab
    padding: 18px 0px
    font-size: 0px
    margin: 0px 18px
    border-1px(rgba(7, 17, 27, 0.1))
    .public
      padding: 8px 12px
      font-size: 12px
      line-height: 16px
      border-radius: 2px
      color: rgb(77,65,93)
      display: inline-block
      &.active
        color: #fff
      .count
        font-size: 3px
        margin-left: 2px
        display: inline-block
    .bule
      background: rgba(0,160,220,0.2)
      margin-right: 8px
      &.active
        background: rgb(0,160,220)
    .gray
      background: rgba(77,85,93,0.2)
      &.active
        background: rgb(77,85,93)
  .ratingFilter
    margin: 0px 18px
    padding: 12px 0px
    color: rgb(147,153,159)
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      font-size: 24px
      line-height: 24px
    .text
      font-size: 12px
      line-height: 24px
      margin-left: 4px
      display:inline-block
      vertical-align: top

</style>
