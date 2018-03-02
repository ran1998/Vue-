const express=require("express");
const app = express();
const router = express.Router();
var appData = require("../data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

router.get("/seller",function(req,res){

  res.json({
  	error: 0,
  	data: seller,
  })

});
router.get("/goods",function(req,res){

	res.json({
		error: 0,
		data: goods,
	})

})