<template>
  <div id="goods">
  <div class="menu-wrap" ref="menuWrap">
  <ul class="goods-wrap">
  <li v-for="(item,index) in foods" :class="{menuActive : _getIndex===index}" @click=FScroll(index,$event)>
  <span class="text border-1px">
  <span v-show="item.type>0" class="icon" :class="type[item.type]"></span>
  {{item.name}}
  </span>
  </li>
  </ul>
  </div>
  <div class="foods-wrap" ref="foodWrap">
  <ul>
  <li v-for="foodList in foods" class="foodListWrap">
  <h1 class="title">{{foodList.name}}</h1>
  <ul>
  <li class="foodList" v-for="food in foodList.foods" @click="flagShow(food,$event)">
  <div class="food-img">
  <img width="57" height="57" :src="food.icon">
  </div>
  <div class="content">
  <h3>{{food.name}}</h3>
  <p v-show="food.description">{{food.description}}</p>
  <div class="info">
  <span>月售{{food.sellCount}}份<span class="rating">好评率{{food.rating}}%</span></span>
  </div>
  <div class="price">
  <span>￥<strong class="newPrice">{{food.price}}</strong></span>
  <span v-show="food.oldPrice" class="oldPrice">￥<strong >{{food.oldPrice}}</strong></span>
  </div>
  <div class="controller-wrap">
  <controller :food="food"></controller>
  </div>
  </div>
  </li>
  </ul>
  </li>
  </ul>
  <shopCat :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFood="select()" ref="shopcart"></shopCat>
  </div>
  <food ref="flagShow" :selectFood="selectFood"></food>
  </div>
</template>

<script>
import controller from '../controller/controller'
import BScroll from 'better-scroll'
import shopCat from '../shopCat/shopCat'
import food from '../food/food'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      foods: [],
      menuScroll: '',
      foodScroll: '',
      scrollY: 0,
      heightArr: [],
      selectFood: {}
    }
  },
  created () {
    // this.$http.get('/api/goods').then(res => {
    //   console.log(res)
    //   if (res.body) {
    //     this.foods = res.body.data
    //     console.log(res.body.data)
    //   }
    // })
    this.$nextTick(() => {
      this.foods = this.$store.state.goods
      console.log(this.foods)
      this._initScroll()
      this.getHeight()
      this.type = ['derease', 'discount', 'special', 'invoice', 'guarantee']
    })
  },
  methods: {
    select () {
      var arr = []
      this.foods.forEach(foodList => {
        foodList.foods.forEach(food => {
          if (food.count) {
            arr.push(food)
          }
        })
      })
      return arr
    },
    drop (target) {
      console.log(target)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrap, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrap, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    FScroll ($index, event) {
      let foodList = this.$refs.foodWrap.getElementsByClassName('foodListWrap')
      this.foodScroll.scrollToElement(foodList[$index], 300)
    },
    getHeight () {
      let foodList = this.$refs.foodWrap.getElementsByClassName('foodListWrap')
      let height = 0
      this.heightArr.push(height)
      for (var i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.heightArr.push(height)
      }
    },
    flagShow (food, event) {
      this.$refs.flagShow.show()
      this.selectFood = food
    }

  },
  computed: {
    _getIndex () {
      for (let i = 0; i < this.heightArr.length; i++) {
        let height1 = this.heightArr[i]
        let height2 = this.heightArr[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
    }
  },
  components: {
    shopCat,
    controller,
    food
  },
  events: {
    'add' (target) {
      console.log(target)
      this._drop(123)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../Common/stylus/border.styl'
#goods
  display: flex
  width: 100%
  position: absolute
  top: 174px
  bottom: 46px
  overflow: hidden
  .menu-wrap
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    li
      width:56px
      height: 54px
      padding: 0px 12px
      display: table
      height: 54px
      line-height: 14px
      font-size: 0
      color: rgb(147,153,159)
      &.menuActive
        background: #fff
        color: rgb(7,17,27)
        border-none()
      .icon
        width: 12px
        height: 12px
        background-size: 12px 12px
        display: inline-block
        &.derease
          bg-image("decrease_3")
        &.discount
          bg-image("discount_3")
        &.guarantee
          bg-image("guarantee_3")
        &.invoice
          bg-image("invoice_3")
        &.special
          bg-image("special_3")
      span
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrap
    flex: 1
    .title
      height: 26px
      padding-left: 14px
      border-left: 2px solid #d9dde1
      background: #f3f5f7
      font-size: 12px
      color: rgb(147,153,159)
      line-height: 26px
    .foodList
      margin: 18px
      display: flex
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 18px
      font-size: 0px
      &:last-child
        border-none()
        margin-bottom: 0px
      .food-img
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        position: relative
        h3
          font-size: 14px
          line-height: 14px
          color: rgb(7,17,27)
          margin-top: 2px
        p
          font-size: 10px
          color: rgb(147,153,150)
          line-height: 10px
          margin-top: 8px
        .info
          font-size: 10px
          color: rgb(147,153,150)
          line-height: 10px
          margin: 8px 0px 5px 0px
          .rating
            margin-left: 12px
        .price
          span
            font-size: 10px
            color: rgb(240,20,20)
            strong
              font-size: 14px
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
          height: 24px
          position: absolute
          bottom: 0
          right: 0



</style>
