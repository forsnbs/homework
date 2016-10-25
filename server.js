var fs = require('fs');
eval(fs.readFileSync('ArticleController.js')+'');

//Node 서버 및 라우터
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

app.use(app.router);

http.createServer(app).listen(3000, function() {

	console.log('웹서버 실행 중...http://127.0.0.1:3000');

});

// ArticleController 객체생성
var articleController = new ArticleController();

app.all('/save', function(req, res) {

	console.log('/save 를 요청 받음.');
	var title = req.param('title');
	var content = req.param('content');
	var writer = req.param('writer');

	var article = new Article(title, content, writer);
	var isSuccess = articleController.requestSave(article);

	console.log('응답 데이터');
	console.log(isSuccess);
	res.send(isSuccess);

});

app.all('/selectAll', function(req, res) {

	console.log('/selectAll 를 요청 받음.');
	var send_articles = articleController.requestSelectAll();

	console.log('응답 데이터');
	console.log(send_articles);
	res.send(send_articles);

});

app.all('/selectOne', function(req, res) {

	console.log('/selectOne 를 요청 받음.');
	var num = parseInt(req.param('num'));
	var send_article = articleController.requestSelectOne(num);

	console.log('응답 데이터');
	console.log(send_article);
	res.send(send_article);

});

app.all('/delete', function(req, res) {

	console.log('/delete 를 요청 받음.');
	var num = parseInt(req.param('num'));

	console.log('여기' + num);

	var isSuccess = articleController.requestDelete(num);

	console.log('응답 데이터');
	console.log(isSuccess);
	res.send(isSuccess);

});

app.all('/update', function(req, res) {

	console.log('/update를 요청 받음');
	var num = parseInt(req.param('num'));
	var title = req.param('title');
	var content = req.param('content');
	var writer = req.param('writer');

	var article = new Article(title,content,writer);
	article.setNum(num);
	var isSuccess = articleController.requestUpdate(article);

});
