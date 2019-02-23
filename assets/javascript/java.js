var data;
var numberOfQuestions;

var currentQuestion = 0;
var correctPosition = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var nonAnswers = 0;
var startQuestions;
var time;
var currentAnswered = false;

    var request = new XMLHttpRequest();
    request.open('GET', 'https://opentdb.com/api.php?amount=10&category=23&type=multiple', true);
    request.onload = function () {
        data = JSON.parse(this.response);
        console.log(data);
        numberOfQuestions = data.results.length;

        if (data.response_code !== 0) {
            alert("ERROR");
        }
    }
    request.send();

$("._startButton").click(loadGame);


function loadGame() {
    console.log(numberOfQuestions);
    $("._startButton").remove();

    var txtQuestionBox = $("<div class='jumbotron mt-3 mb-3 pb-3 pt-2 bg-white' id='_questionsBox'></div>");
    var txtTimer = $("<h3>Timer : <span id='_timer'></span></h3>");
    var txtQuestionNum = $("<h3>Question Number : <span id='_questNum'></span></h3>");
    var txtQuestion = $("<p>Question : <span id='_question'></span></p>");
    var txtAnswer1 = $("<p class='_choice col-4' data-number='0'>Answer 1 : <span id='_answer0'></span></p>");
    var txtAnswer2 = $("<p class='_choice col-4' data-number='1'>Answer 2 : <span id='_answer1'></span></p>");
    var txtAnswer3 = $("<p class='_choice col-4' data-number='2'>Answer 3 : <span id='_answer2'></span></p>");
    var txtAnswer4 = $("<p class='_choice col-4' data-number='3'>Answer 4 : <span id='_answer3'></span></p>");

    $("#_game").append(txtQuestionBox);
    $("#_questionsBox").append(txtQuestionNum);
    $("#_questionsBox").append(txtTimer);
    $("#_questionsBox").append(txtQuestion);
    $("#_questionsBox").append(txtAnswer1);
    $("#_questionsBox").append(txtAnswer2);
    $("#_questionsBox").append(txtAnswer3);
    $("#_questionsBox").append(txtAnswer4);

    // ON CLICK --------------------------------------------------------

    $("._choice").click(function () {
        time = 0;

        if (currentQuestion < numberOfQuestions && currentAnswered == false) {
            var answer = $(this).data('number');
            if (answer == correctPosition) {
                correctAnswers = correctAnswers + 1;
                $(this).css("background-color", "green");
            }
            else {
                incorrectAnswers = incorrectAnswers + 1;
                $(this).css("background-color", "red");
                $("[data-number=" + correctPosition + "]").css("background-color", "green");
            }
        }
        currentAnswered = true;
    });

    // ON READY ----------------------------------------------------------

    $(document).ready(function () {
        $("._choice").hover(function () {
            $(this).css("background-color", "grey");
        }, function () {
            $(this).css("background-color", "white");
        });
        loadQuestions();
    });

    // LOAD QUESTIONS ---------------------------------------------------------

    function loadQuestions() {
        time = 10;
        nextQuestion(currentQuestion);
        startQuestions = setInterval(counter, 1000);
        currentAnswered = false;

        function counter() {
            if (currentQuestion == numberOfQuestions) {
                clearInterval(startQuestions);
                displayResults();
            }
            $("#_timer").html(time);
            if (time == 10) {
            }

            if (time == 0) {
                currentQuestion = currentQuestion + 1;
                if (currentQuestion < numberOfQuestions) { nextQuestion(currentQuestion); }
                time = 10;
            }
            time = time - 1;
        } // END COUNTER

        function nextQuestion(i) {

            currentAnswered = false;
            $("#_timer").html(10);
            
            $("._choice").css("background-color", "white");

            correctPosition = Math.floor(Math.random() * 4);

            $("#_questNum").text(i + 1);
            $("#_question").html(data.results[i].question);

            for (var j = 0; j < 4; j++) {
                if (j < correctPosition) {
                    $("#_answer" + j).html(data.results[i].incorrect_answers[j]);
                }
                else if (j == correctPosition) {
                    $("#_answer" + j).html(data.results[i].correct_answer);
                }
                else {
                    $("#_answer" + j).html(data.results[i].incorrect_answers[j - 1]);

                }

            }

        } // end nextQuestions

    } // end loadQuestions

} // end loadGame

// RESULTS -------------------------------------------------------

function displayResults() {
    $("#_questionsBox").remove();

    nonAnswers = numberOfQuestions - correctAnswers - incorrectAnswers;
    var txtResultsBox = $("<div class='jumbotron mt-3 mb-3 p-3 bg-white' id='_resultsBox'></div>");
    var txtCorrect = $("<p>Questions answered correctly : " + correctAnswers + "</p>");
    var txtIncorrect = $("<p>Questions answered incorrectly : " + incorrectAnswers + "</p>");
    var txtNoAnswer = $("<p>Questions non answered : " + nonAnswers + "</p>");

    $("#_game").append(txtResultsBox);
    $("#_resultsBox").append(txtCorrect);
    $("#_resultsBox").append(txtIncorrect);
    $("#_resultsBox").append(txtNoAnswer);
    $("#_resultsBox").append("</div>");

    $("#_game").append("<div class='row col justify-content-center' id='_redo'>");
    $("#_redo").append("<button type='button' class='btn col-3 btn-success m-3 p-3  border-white _startButton'>Try Again?</button>");

    console.log("RESULTS");
    console.log("Correct Answers : " + correctAnswers);
    console.log("Wrong Answers : " + incorrectAnswers);
    console.log("Did Not Answer : " + nonAnswers);

}





