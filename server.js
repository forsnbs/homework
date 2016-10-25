<<<<<<< HEAD
﻿var fs = require('fs');
eval(fs.readFileSync('ArticleController.js')+'');
=======
﻿function Article(input_title, input_content, input_writer) {

	var num = 0;
	var title = input_title;
	var content = input_content;
	var writer = input_writer;
	var readCount = 0;

	this.getNum = function() {

		return num;

	};

	this.setNum = function(input_number) {

		num = input_number;

	};

	this.getTitle = function() {

		return title;

	};

	this.setTitle = function(input_title) {

		title = input_title;

	};

	this.getContent = function() {

		return content;

	};

	this.setContent = function(input_content) {

		content = input_content;

	};

	this.getWriter = function() {

		return writer;

	};

	this.setWriter = function(input_writer) {

		writer = input_writer;

	};

	this.getReadCount = function() {

		return readCount;

	};

	this.setReadCount = function(input_readCount) {

		readCount = input_readCount;

	};

}

//article repository 객체
function ArticleRepository() {

	var articleNum = 0; //자동 글번호 증가 및 적용에 사용
	var articles = []; //글목록 저장에 사용

	this.getArticleNum = function() {

		return articleNum;

	};

	this.setArticleNum = function(n) {

		articleNum = n;

	};

	this.getArticles = function() {

		return articles;

	};

}

//article dao 객체
function ArticleDao() {

	var repository = new ArticleRepository();

//	글저장 dao 메서드
	this.saveDao = function(article) {

		var isSuccess;

		try {
			repository.setArticleNum(repository.getArticleNum() + 1);
			article.setNum(repository.getArticleNum());

			var saved_article = {
				num : article.getNum(),
				title : article.getTitle(),
				content : article.getContent(),
				writer : article.getWriter(),
				readCount : 0
			};

			repository.getArticles().push(saved_article);
			isSuccess = { message : true };
		} catch(e) {
			console.log('ArticleDao 객체 : saveDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
		}

		return isSuccess;

	};

//	글목록 dao 메서드
	this.selectAllDao = function() {

		var send_articles = [];

		try {
			var articles = repository.getArticles();

			for(var i = 0 ; i < articles.length ; i++) {
				var article = {
					num : articles[i].num,
					title : articles[i].title,
					writer : articles[i].writer,
					readCount : articles[i].readCount
				};

				send_articles.push(article);
			}
		} catch(e) {
			console.log('ArticleDao 객체 : selectAllDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return send_articles;

	};

//	글조회 dao 메서드
	this.selectOneDao = function(num) {

		var send_article;

		try {
			var articles = repository.getArticles();

			for(var i = 0 ; i < articles.length ; i++) {
				if(articles[i].num === num) {
					var new_readCount = articles[i].readCount + 1;

					send_article = {
						num : articles[i].num,
						title : articles[i].title,
						content : articles[i].content,
						writer : articles[i].writer,
						readCount : new_readCount
					};
					break;
				}
			}
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return send_article;

	};

//	글삭제 dao 메서드
	this.deleteDao = function(num) {

		var isSuccess;

		try {
			var articles = repository.getArticles();

			console.log('삭제할 글 번호 : ' + num);

			for(var i = 0 ; i < articles.length ; i++) {
				if(articles[i].num === num) {
					articles.splice(i, 1);
					isSuccess = { message : true };
					break;
				}
			}
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
		}

		return isSuccess;

	};
//  글 수정 dao메서드
	this.updateDao = function(article) {

		var isSuccess;

		try {
			var articles = repository.getArticles();

			console.log('수정할 글번호 : ' + article.getNum());
			console.log(' 타이틀왓니 :' + article.getTitle());

			for (var i = 0; i < articles.length; i++) {
				if(articles[i].num === article.getNum()) {
					articles[i].title = article.getTitle();
					articles[i].content = article.getContent();
					articles[i].writer = article.getWriter();

					isSuccess = {message : true };
					break;
				}
			}
		} catch (e) {
			console.log('ArticleDao 객체 : updateDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
		}
	};

}

//article controller 객체
var ArticleController = function() {

	var dao = new ArticleDao();

//	글저장 controller 메서드
	this.requestSave = function(article) {

		var isSuccess = dao.saveDao(article);
		return isSuccess;

	};

//	글목록 controller 메서드
	this.requestSelectAll = function() {

		var send_articles = dao.selectAllDao();
		return send_articles;

	};

//	글조회 controller 메서드
	this.requestSelectOne = function(num) {

		var send_article = dao.selectOneDao(num);
		return send_article;

	};

//	글삭제 controller 메서드
	this.requestDelete = function(num) {

		var isSuccess = dao.deleteDao(num);
		return isSuccess;

	};

//  글수정 controller 메서드
	this.requestUpdate = function(article) {

		var isSuccess = dao.updateDao(article);
		return isSuccess;
	};

};
>>>>>>> refs/remotes/origin/master

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

	console.log('여기' + num)

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
