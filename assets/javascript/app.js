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
var allowedTime;
var questionTimer = 6;

// User score counts
var userCorrectAnswers = 0;
var userIncorrectAnswers = 0;
var userOutOfTime = 0;

var gameObject = {
	question: ["What kind of company is Dunder Mifflin?", "Which bear is best?", "What is Michael Scott's middle name?", "What line of work is Bob Vance in?", "Where did Bob Vance buy Phyllis' pine-scented perfume?"],
	answers: [["An electronics company", "A paper company", "A marketing company", "A law firm"], ["Koala Bear", "Panda Bear", "Grizzly Bear", "Black Bear"], ["Jim", "Jay", "Gordon", "Gary"], ["Construction", "Refrigeration", "Sales", "Software development"], ["Downtown Los Angeles", "New York City", "Paris", "Metropolitan Orlando"]],
	correctAnswer: ["A paper company", "Black Bear", "Gary", "Refrigeration", "Metropolitan Orlando"],
	images: ["assets/images/1_paper.jpg", "assets/images/2_bears.gif", "assets/images/3_middle.png", "assets/images/4_bob.gif", "assets/images/5_phyllis.gif"]
};

$("#start-button").click(function() {
	$(this).hide();
	runGame();
});

function runGame() {
	time();
};

// Controls Timer and begins question/answers
function time() {
	allowedTime = setInterval(decrement, 1000);
	function decrement() {
		var timeCreator = $(".time-container");
		timeCreator.html("<div class='panel-body text-center time-padding'>" + "Time remaining: " + questionTimer + "</div>");
		if (questionTimer === 0) {
			timeUp();
		}
		if (questionTimer > 0) {
			questionTimer--;
		}
		
	}
	questionRotator();
	answerPopulator();
};

// Writes current question
function questionRotator() {
	$(".dynamic-question-container").html("<h4>" + gameObject.question[questionNumber] + "</h4>");
};

// Writes current answer array
function answerPopulator() {
	$(".dynamic-answer-container").empty();
	var answerButtons = $(".dynamic-answer-container");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][0]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][1]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][2]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[questionNumber][3]) + "</button>");
	// User guesses on click
	$(".player-answer").click(function() {
		userAnswer = $(this).text()
		if (userAnswer === gameObject.correctAnswer[questionNumber]) {
			console.log("ABSOLUTELY.");
			win();
		}
		else {
			console.log("FALSE.");
			lose();
		}
	})
};

function displayImg() {
	var image = $("<img class='answer-images'>").attr("src", gameObject.images[questionNumber]);
		$(".dynamic-answer-container").append(image);
}

function win() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	$(".dynamic-answer-container").html("<p>Excellent! " + gameObject.correctAnswer[questionNumber] + " is correct!</p>");
	displayImg();
	userCorrectAnswers++;
	answerNumber++
	setTimeout(wait, 5000);
};

function lose() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	$(".dynamic-answer-container").html("<p>FALSE. The correct answer was " + gameObject.correctAnswer[questionNumber] + "</p>");
	displayImg();
	userIncorrectAnswers++;
	answerNumber++
	setTimeout(wait, 5000);
};

function timeUp() {
	$(".time-container").empty();
	clearInterval(allowedTime);
	userOutOfTime++;
	$(".dynamic-answer-container").html("<p>Sorry, you ran out of time! The correct answer was: " + gameObject.correctAnswer[questionNumber] + "</p>");
	displayImg();
	setTimeout(wait, 5000);
};

function wait() {
	$(".dynamic-question-container").empty();
	$(".dynamic-answer-container").empty();
	questionNumber++;
	questionTimer = 6;
	if (questionNumber < 5) {
		runGame()
	}
	else {
		end();
	}
};

function end() {
	clearInterval(allowedTime);
	$(".time-container").empty();
	$(".dynamic-game-container").append("<p class='text-center final-stats'>Correct Answers: " + userCorrectAnswers + "</p>");
	$(".dynamic-game-container").append("<p class='text-center final-stats'>Incorrect Answers: " + userIncorrectAnswers + "</p>");
	$(".dynamic-game-container").append("<p class='text-center final-stats'>Unanswered Questions: " + userOutOfTime + "</p>");
	//Reset button
	$(".dynamic-game-container").append("<div class='row'><div class='col-sm-6 col-sm-offset-3'><div class='panel panel-default text-center start-container'><button type='button' class='btn btn-primary btn-block' id='reset-button'>Play Again</button></div></div></div>");
		$("#reset-button").click(function() {
			$(this).hide();
			$(".final-stats").hide();
			questionNumber = 0;
			answerNumber = 0;
			questionTimer = 6;
			runGame();
		});
};