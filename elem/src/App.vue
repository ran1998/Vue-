<template>
  <div id="app">
  <vHeader :seller="seller"></vHeader>
  <div class="nav border-1px">
  <div class="nav-item"><router-link to="/goods"><a>商品</a></router-link></div>
  <div class="nav-item"><router-link to="/rating"><a>评价</a></router-link></div>
  <div class="nav-item"><router-link to="/seller"><a>商家</a></router-link></div>
  </div>
  
   <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from './components/header/header'
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.seller = this.$store.state.seller
    // this.$http.get('/api/seller').then(res => {
    //   if (res) {
    //     console.log(res.body.data)
    //     this.seller = res.body.data
    //   }
    // }, () => {
    //   alert('请求失败')
    // })
  },
  components: {
    vHeader: Header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "Common/stylus/index.styl"
#app
  .nav
    display: flex
    width: 100%
    height: 40px
    border-1px(rgba(7,17,27,0.1))
    .nav-item
      flex: 1
      display: block
      text-align: center
      line-height: 40px
      font-size: 14px
      &>a
          color: rgb(7,17,27)
          text-decoration: none
          &.active
            color: rgb(240,20,20)
</style>
