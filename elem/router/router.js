
module.exports = function(){
const express=require("express");

var app=express();

var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var router = express.Router();

router.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

router.get("/goods",function(req,res){
res.json({
	error: 0,
	data: goods,
})
});

router.get("/ratings",function(req,res){
	res.json({
		error: 0,
		data: ratings,
	})
})

return router;


}