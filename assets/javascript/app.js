// Created: July 15, 2017 18:00
// Author: Chris Jalallian
// Revisions: 
//

var panel1 = {
	question: "What kind of company is Dunder Mifflin?",
	answers: ["An electronics company", "A paper company", "A marketing company", "A law firm"]
	// correctAnswer: panel1.answers[1];
};

var panel2 = {
	question: "Which bear is best?",
	answers: ["Koala Bear", "Panda Bear", "Grizzly Bear", "Black Bear"]
	// correctAnswer: panel2.answers[3];
};

var panel3 = {
	question: "What is Michael Scott's middle name?",
	answers: ["Jim", "Jay", "Gordon", "Gary"]
	// correctAnswer: panel3.answers[3];
};
var questionTimer = 15;
var allowedTime;

function time() {
	allowedTime = setInterval(decrement, 1000);
	function decrement() {
		if (questionTimer === 0) {
			clearInterval(allowedTime);
		}
		if (questionTimer > 0) {
			questionTimer--;
		}
		// $(".timer").html("<div class="panel panel-default"><div class="panel-body timer">"+ "Time remaining" + questionTimer)+"</div></div>;
		$(".timer").html("Time remaining: " + questionTimer);
	}
};



time()