// Created: July 15, 2017 18:00
// Author: Chris Jalallian
// Revisions: 
//

var questionsAnswered = 0;
var questionTimer = 5;
var allowedTime;
var userCorrectAnswers = 0;
var userIncorrectAnswers = 0;
var userOutOfTime = 0;

var panel1 = {
	question: "What kind of company is Dunder Mifflin?",
	answers: ["An electronics company", "A paper company", "A marketing company", "A law firm"],
	correctAnswer: "A paper company"
};

var panel2 = {
	question: "Which bear is best?",
	answers: ["Koala Bear", "Panda Bear", "Grizzly Bear", "Black Bear"],
	correctAnswer: "Black Bear"
};

var panel3 = {
	question: "What is Michael Scott's middle name?",
	answers: ["Jim", "Jay", "Gordon", "Gary"],
	correctAnswer: "Gary"
};



$("#start-button").click(function() {
	$(this).hide();
	runGame();
});

function runGame() {
	time();
	questionGen();
	answerGen();
}

function time() {
	allowedTime = setInterval(decrement, 1000);
	function decrement() {
		var timeCreator = $(".time-container");
		if (questionTimer === 0) {
			clearInterval(allowedTime);
			timeUp();
		}
		if (questionTimer > 0) {
			questionTimer--;
		}
		timeCreator.html("<div class='panel-body text-center'>" + "Time remaining: " + questionTimer + "</div>");
	}
};

function timeUp() {
	var timeEndScreen = $(".timeout")
	userOutOfTime++;
	if (questionsAnswered === 0) {
		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + panel1.correctAnswer +"</p></div>");
	loadNext();
	// setTimeout(loadNext, 6000);
	}
	if (questionsAnswered === 1) {
		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + panel2.correctAnswer +"</p></div>");
	// setTimeout(loadNext, 6000);
	}
	if (questionsAnswered === 2) {
		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + panel3.correctAnswer +"</p></div>");
	}
	// questionsAnswered++;
}

function loadNext() {
	if (questionsAnswered < 2) {
		questionsAnswered++;
		runGame();
	}
}

function questionGen() {
	var questionPanel = $(".dynamic-question-container");
	if (questionsAnswered === 0) {
		questionPanel.html("<h4>" + panel1.question + "</h4>");
	}
	if (questionsAnswered === 1) {
		questionPanel.html("<h4>" + panel2.question + "</h4>");
	}
	if (questionsAnswered === 2) {
		questionPanel.html("<h4>" + panel3.question + "</h4>");
	}
}

function answerGen() {
	if (questionsAnswered === 0) {
		for (var i = 0; i < panel1.answers.length; i++) {
			var answerButtons = $("<div type='button' class='btn btn-default btn-block'>");
			answerButtons.text(panel1.answers[i]);
			$(".dynamic-answer-container").append(answerButtons);	
		}
	}
	if (questionsAnswered === 1) {
		for (var i = 0; i < panel2.answers.length; i++) {
			var answerButtons = $("<div type='button' class='btn btn-default btn-block'>");
			answerButtons.text(panel2.answers[i]);
			$(".dynamic-answer-container").append(answerButtons);	
		}
	}
	if (questionsAnswered === 2) {
		for (var i = 0; i < panel3.answers.length; i++) {
			var answerButtons = $("<div type='button' class='btn btn-default btn-block'>");
			answerButtons.text(panel3.answers[i]);
			$(".dynamic-answer-container").append(answerButtons);	
		}
	}
}

