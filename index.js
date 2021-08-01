var express = require('express');
var app = express();
const match = require('@revincx/unblockneteasemusic');

app.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	if (req.method == 'OPTIONS') {
		res.send(200);
	}
	else {
		next();
	}
});

app.get('/', function(res, rep) {
	rep.send('index.html');
});

app.get('/getSong', function(res, rep) {
	if (res.query.songid) {
		/**
		* Find matching song from other platforms
		* @param {Number} id netease song id
		* @param {Array<String>||undefined} source support qq, xiami, baidu, kugou, kuwo, migu, joox
		* @return {Promise<Object>}
		*/
		match(parseInt(res.query.songid), ['bilibili','qq', 'kuwo', 'kugou']).then(function (value) {
			rep.send(value);
		})
	} else {
		rep.send({'status': 'null'})
	}
    
});

app.listen(3000);