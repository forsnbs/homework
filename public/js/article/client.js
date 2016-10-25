//article domain 객체
function Article(input_title, input_content, input_write) {

	var num = 0;
	var title = input_title;
	var content = input_content;
	var writer = input_write;
	var readCount = 0;

	this.getNum = function() {

		return num;

	};

	this.setNum = function(input_num) {

		num = input_num;

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

//article dao 객체
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
