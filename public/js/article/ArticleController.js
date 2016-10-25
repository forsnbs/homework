var fs = require('fs');
eval(fs.readFileSync('ArticleDao.js')+'');


//article controller 객체
function ArticleController() {

	var dao = new ArticleDao();

//	글쓰기뷰 controller 메서드
	this.requestWriteView = function() {

		document.location = "writeView.html";

	};

//	글저장 controller 메서드
	this.requestSave = function(article) {

		var isSuccess = dao.saveDao(article);

		if(isSuccess.message = true) {
			alert('글 저장 성공');
		} else {
			alert('글 저장 실패');
		}

		document.location = 'selectAllView.html';

	};

//	글목록 controller 메서드
	this.requestSelectAll = function() {

		var articles = dao.selectAllDao();
		return articles;

	};

//	글조회 controller 메서드
	this.requestSelectOne = function(num) {

		var article = dao.selectOneDao(num);

		var requestUrl = 'selectOneView.html';
		requestUrl = requestUrl + '?num=' + article.num;
		requestUrl = requestUrl + '&title=' + article.title;
		requestUrl = requestUrl + '&content=' + article.content;
		requestUrl = requestUrl + '&writer=' + article.writer;
		requestUrl = requestUrl + '&readCount=' + article.readCount;

		document.location = requestUrl;

	};

//	글목록뷰 controller 메서드
	this.requestSelectAllView = function() {

		document.location = 'selectAllView.html';

	};

//	글수정 controller 메서드
	this.requestUpdate = function(article) {

		var isSuccess = dao.updateDao(article);

		if(isSuccess.message = true) {
			alert('글  수정 성공');
		} else {
			alert('글 수정 실패');
		}

//		document.location = 'selectAllView.html';

	};

//	글삭제 controller 메서드
	this.requestDelete = function(num) {

		var isSuccess = dao.deleteDao(num);

		if(isSuccess.message = true) {
			alert('글 삭제 성공');
		} else {
			alert('글 삭제 실패');
		}

		document.location = 'selectAllView.html';

	};

}

//controller 객체(static)
var Controllers = function() {

};

Controllers.articleController = new ArticleController();

Controllers.getArticleController = function() {

	return Controllers.articleController;

};