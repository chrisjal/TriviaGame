// Created: July 15, 2017 18:00
// Author: Chris Jalallian
// Revisions: CJ 7/16 14:00 Complete rework of code

//To do: style, fix time being shown on timeout, readjust timer location, add more questions

// For functions
var questionNumber = 0;
var questionPanel;
var answerNumber = 0;
var answerPanel;
var userAnswer;


var questionsAnswered = 0;
var questionTimer = 6;
var allowedTime;
var userCorrectAnswers = 0;
var userIncorrectAnswers = 0;
var userOutOfTime = 0;

var gameObject = {
	question: ["What kind of company is Dunder Mifflin?", "Which bear is best?", "What is Michael Scott's middle name?"],
	answers: [["An electronics company", "A paper company", "A marketing company", "A law firm"], ["Koala Bear", "Panda Bear", "Grizzly Bear", "Black Bear"], ["Jim", "Jay", "Gordon", "Gary"]],
	correctAnswer: ["A paper company", "Black Bear", "Gary"]
};



$("#start-button").click(function() {
	$(this).hide();
	runGame();
});

function runGame() {
	time();
	// allowedTime = setInterval(decrement, 5000);
	// questionPanel = setInterval(questionRotator, 5000);
	// answerPanel = setInterval(answerPopulator, 5000);
}

function time() {
	
	allowedTime = setInterval(decrement, 1000);
	function decrement() {
		// setInterval(decrement, 1000)
		var timeCreator = $(".time-container");
		if (questionTimer === 0) {
			timeUp();
		}
		if (questionTimer > 0) {
			questionTimer--;
		}
		timeCreator.html("<div class='panel-body text-center'>" + "Time remaining: " + questionTimer + "</div>");
	}
	questionRotator();
	answerPopulator();
}



function questionRotator() {
	
	$(".dynamic-question-container").html("<h4>" + gameObject.question[questionNumber] + "</h4>");
	// questionNumber++;
	// questionPanel = setTimeout(questionPanel, 4000);
}

function answerPopulator() {
	// $(".dynamic-answer-container").empty();
	$(".dynamic-answer-container").empty();
	var answerButtons = $(".dynamic-answer-container");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][0]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][1]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][2]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][3]) + "</button>");
	
	$(".player-answer").click(function() {
		userAnswer = $(this).text()
		if (userAnswer === gameObject.correctAnswer[questionNumber]) {
			// $("dynamic-answer-container").empty();
			console.log("ABSOLUTELY.");
			win();
		}
		else {
			console.log("FALSE.");
			lose();
		}
	})
}

function win() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	$(".dynamic-answer-container").html("<p>The correct answer was " + gameObject.correctAnswer[questionNumber] + "</p>");
	userCorrectAnswers++;
	answerNumber++
	setTimeout(wait, 4000);
}

function lose() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	$(".dynamic-answer-container").html("<p>FALSE.The correct answer was " + gameObject.correctAnswer[questionNumber] + "</p>");
	userIncorrectAnswers++;
	answerNumber++
	setTimeout(wait, 4000);
}

function timeUp() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	userOutOfTime++;
	$(".dynamic-answer-container").html("<p>Sorry, you ran out of time! The correct answer was: " + gameObject.correctAnswer[questionNumber] + "</p>");
	setTimeout(wait, 4000);
}

function wait() {
	$(".dynamic-question-container").empty();
	$(".dynamic-answer-container").empty();
	questionNumber++;
	questionTimer = 6;
	if (questionNumber < 3) {
		runGame()
	}
	else {
		end();
	}
}

function end() {
	clearInterval(allowedTime);
	$(".time-container").empty();
	$(".dynamic-game-container").append("<p>Correct Answers: " + userCorrectAnswers + "</p>");
	$(".dynamic-game-container").append("<p>Incorrect Answers: " + userIncorrectAnswers + "</p>");
	$(".dynamic-game-container").append("<p>Unanswered Questions: " + userOutOfTime + "</p>");
	//add other stats, style, and Reset button
}




