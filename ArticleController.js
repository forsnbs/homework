var fs = require('fs');
eval(fs.readFileSync('ArticleDao.js')+'');

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
	
};