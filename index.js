var express = require('express');
var app = express();
const match = require('@revincx/unblockneteasemusic');
const PROT = process.env_PROT || 8080

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
		match(parseInt(res.query.songid), ['bilibili','qq', 'kuwo', 'kugou']).then( res => {
			rep.send(res)
		})
	} else {
		rep.send({'status': 'null'})
	}
});
app.listen(PROT);