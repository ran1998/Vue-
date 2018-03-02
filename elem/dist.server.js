const express=require("express");
const config = require("./config/index.js");
var port = process.env.PORT || config.build.port;
var app=express();

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//设置请求头
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});


var router = express.Router();

// router.get('/',function(req,rex,next){
//   req.url = '/index.html';
//   next();
// })

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

app.use("/api",router);
app.use(express.static('./dist'));
