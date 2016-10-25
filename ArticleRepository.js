var fs = require('fs');
eval(fs.readFileSync('Article.js')+'');

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