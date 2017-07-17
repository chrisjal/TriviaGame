// Created: July 15, 2017 18:00
// Author: Chris Jalallian
// Revisions: 
//

// For functions
var questionNumber = 0;
var questionPanel;
var answerNumber = 0;
var answerPanel;
var userAnswer;


var questionsAnswered = 0;
var questionTimer = 5;
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
	allowedTime = setInterval(decrement, 5000);
	questionPanel = setInterval(questionRotator, 5000);
	answerPanel = setInterval(answerPopulator, 5000);
}


function decrement() {
	setInterval(decrement, 1000)
	var timeCreator = $(".time-container");
	if (questionTimer === 0) {
		clearInterval(allowedTime);
		// timeUp();
	}
	if (questionTimer > 0) {
		questionTimer--;
	}
	timeCreator.html("<div class='panel-body text-center'>" + "Time remaining: " + questionTimer + "</div>");
}



function questionRotator() {
	
	$(".dynamic-question-container").html("<h4>" + gameObject.question[questionNumber] + "</h4>");
	questionNumber++;
	// questionPanel = setTimeout(questionPanel, 4000);
}

function answerPopulator() {
	// $(".dynamic-answer-container").empty();
	$(".dynamic-answer-container").empty();
	var answerButtons = $(".dynamic-answer-container");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[answerNumber][0]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[answerNumber][1]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[answerNumber][2]) + "</button>");
	answerButtons.append(("<button type='button' class='btn btn-default btn-block player-answer'>" + gameObject.answers[answerNumber][3]) + "</button>");
	
	$(".player-answer").click(function() {
		userAnswer = $(this).text()
		if (userAnswer === gameObject.correctAnswer[answerNumber]) {
			// $("dynamic-answer-container").empty();
			console.log("ABSOLUTELY.");
			win();
		}
		else {
			console.log("FALSE.");
			lose();
		}
	});
}

function win() {
	clearInterval(questionPanel);
	clearInterval(answerPanel);
	$(".dynamic-answer-container").html("<p>The correct answer was " + gameObject.correctAnswer[answerNumber] + "</p>");
	userCorrectAnswers++;
	answerNumber++
	setTimeout(wait, 4000);
}

function lose() {
	clearInterval(questionPanel);
	clearInterval(answerPanel);
	$(".dynamic-answer-container").html("<p>FALSE.The correct answer was " + gameObject.correctAnswer[answerNumber] + "</p>");
	userIncorrectAnswers++;
	answerNumber++

	setTimeout(wait, 4000);

}

function wait() {
	$(".dynamic-question-container").empty();
	$(".dynamic-answer-container").empty();
	questionTimer = 5;
	if (questionNumber < 3) {
		runGame()
	}
	else {
		end();
	}
}

function end() {
	$(".dynamic-game-container").append("<p>Correct Answers: " + userCorrectAnswers + "</p>");
	$(".dynamic-game-container").append("<p>Incorrect Answers: " + userIncorrectAnswers + "</p>");
	//add other stats, style, and Reset button
}

// $(".player-answer").click(function() {
// 	userAnswer = $(this).text()
// 	if (userAnswer === gameObject.correctAnswer[questionNumber]) {
// 		// $("dynamic-answer-container").empty();
// 		console.log("YOU WIN");
// 	}
// });


// function runGame() {
// 	questionsAnswered++
// 	time();
// 	questionGen();
// 	answerGen();
// }

// function timeUp() {
// 	var timeEndScreen = $(".timeout")
// 	userOutOfTime++;
// 	if (questionsAnswered === 0) {
// 		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + gameObject.correctAnswer1 +"</p></div>");
// 	loadNext();
// 	// setTimeout(loadNext, 6000);
// 	}
// 	if (questionsAnswered === 1) {
// 		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + gameObject.correctAnswer2 +"</p></div>");
// 	// setTimeout(loadNext, 6000);
// 	}
// 	if (questionsAnswered === 2) {
// 		timeEndScreen.html("<div><p>Sorry, you ran out of time! The correct answer was " + gameObject.correctAnswer3 +"</p></div>");
// 	}
// 	// questionsAnswered++;
// }

// function loadNext() {
// 	if (questionsAnswered < 3) {
// 		questionsAnswered++;
// 		runGame();
// 	}
// }

// function questionGen() {
// 	var questionPanel = $(".dynamic-question-container");
// 	if (questionsAnswered === 0) {
// 		questionPanel.html("<h4>" + gameObject.question1 + "</h4>");
// 	}
// 	if (questionsAnswered === 1) {
// 		questionPanel.html("<h4>" + gameObject.question2 + "</h4>");
// 	}
// 	if (questionsAnswered === 2) {
// 		questionPanel.html("<h4>" + gameObject.question3 + "</h4>");
// 	}
// }

// function answerGen() {
// 	if (questionsAnswered === 0) {
// 		for (var i = 0; i < gameObject.answers1.length; i++) {
// 			var answerButtons = $("<div type='button' class='btn btn-default btn-block player-answer'>");
// 			answerButtons.text(gameObject.answers1[i]);
// 			$(".dynamic-answer-container").append(answerButtons);	
// 			$(".player-answer").click(function() {
// 				if ($(this).text() === gameObject.correctAnswer2) {
// 					$("dynamic-answer-container").empty();
// 					win();

// 				}
// 			})
// 		}

// 	}
// 	if (questionsAnswered === 1) {
// 		for (var i = 0; i < gameObject.answers2.length; i++) {
// 			var answerButtons = $("<div type='button' class='btn btn-default btn-block player-answer'>");
// 			answerButtons.text(gameObject.answers2[i]);
// 			$(".dynamic-answer-container").append(answerButtons);
// 			$(".player-answer").click(function() {
// 				if ($(this).text() === gameObject.correctAnswer2) {
// 					win();
// 					$("dynamic-answer-container").empty();
// 				}
// 				else if ($(this).text() != gameObject.correctAnswer2) {
// 					$("dynamic-answer-container").empty();
// 					lose();
					
// 				}
// 			});
// 		}
// 	}
// 	if (questionsAnswered === 2) {
// 		for (var i = 0; i < gameObject.answers2.length; i++) {
// 			var answerButtons = $("<div type='button' class='btn btn-default btn-block player-answer'>");
// 			answerButtons.text(gameObject.answers2[i]);
// 			$(".dynamic-answer-container").append(answerButtons);
// 			$(".player-answer").click(function() {
// 				if ($(this).text() === gameObject.correctAnswer2) {
					// $("dynamic-answer-container").empty();
					// win();
				// }
				// else if ($(this).text() !== gameObject.correctAnswer2) {
					// $("dynamic-answer-container").empty();
// 					lose();
// 				}
// 			})	
// 		}
// 	}
// }



