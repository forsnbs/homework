//article domain 객체
function Article(input_title, input_content, input_writer) {

	var num = 0;
	var title = input_title;
	var content = input_content;
	var writer = input_writer;
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