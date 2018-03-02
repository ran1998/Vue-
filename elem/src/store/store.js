import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const appData = require('../../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

export default new Vuex.Store({
  state: {
    seller: seller,
    goods: goods,
    ratings: ratings,
  }
})
