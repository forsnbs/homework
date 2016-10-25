function ArticleDao() {

//	글저장 dao 메서드
	this.saveDao = function(article) {

		var isSuccess;

		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/save?title=' + article.getTitle() + '&content=' + article.getContent() + '&writer=' + article.getWriter();
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			isSuccess = eval('(' + request.responseText + ')');

		} catch(e) {
			console.log('ArticleDao 객체 : saveDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return isSuccess;

	};

//	글목록 dao 메서드
	this.selectAllDao = function() {

		var articles;

		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/selectAll';
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();

			//요청 결과(동기식 결과 받음)를 응답받는 것을 출력
			articles = eval('(' + request.responseText + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : selectAllDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return articles;

	};

//	글조회 dao 메서드
	this.selectOneDao = function(num) {

		var article;

		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/selectOne?num=' + num;
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();

			//요청 결과(동기식 결과 받음)를 응답받는 것을 출력
			article = eval('(' + request.responseText + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return article;

	};

//	글수정 dao 메서드
	this.updateDao = function(article) {

		var isSuccess;

		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/update';
			requestString = requestString+ '?num=' + article.getNum();
			requestString = requestString+ '?title=' + article.getTitle();
			requestString = requestString+ '?content=' + article.getContent();
			requestString = requestString+ '?writer=' + article.getWriter();

			alert(requestString);

			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			isSuccess = eval('(' + request.responseText + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : deleteDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return isSuccess;

	};

//	글삭제 dao 메서드
	this.deleteDao = function(num) {

		var isSuccess;

		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/delete?num=' + num;
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			isSuccess = eval('(' + request.responseText + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : deleteDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return isSuccess;

	};

}