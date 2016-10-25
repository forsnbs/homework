var fs = require('fs');
eval(fs.readFileSync('ArticleRepository.js')+'');

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

				for (var i = 0; i < articles.length; i++){
					console.log(articles[i]);

					if (articles[i].num == num){
						articles.splice(i, 1);
						isSuccess = { message : true };
					}
				}

			} catch(e) {
				console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
				console.log(e.message);
				isSuccess = { message : false };
			}

			return isSuccess;

		};

}
