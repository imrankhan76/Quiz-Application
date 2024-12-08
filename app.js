var userData = {}; 

function signUP() {
    var getName = document.getElementById("getName").value.trim();
    var getEmail = document.getElementById("getEmail").value.trim();
    var getPassword = document.getElementById("getPassword").value.trim();

    if (getName === "") {
        Swal.fire("Please Enter Your Name");
        return;
    }
    if (getEmail === "") {
        Swal.fire("Please Enter Your Valid Email");
        return;
    }
    if (getPassword === "") {
        Swal.fire("Please Enter Your Password");
        return;
    }

    userData = {
        name: getName,
        email: getEmail.toLowerCase(),
        password: getPassword,
    };

    Swal.fire("Sign-Up Successful!");

    document.getElementById("getName").value = "";
    document.getElementById("getEmail").value = "";
    document.getElementById("getPassword").value = "";
}

function logIn() {
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    if (!userData.email) {
        Swal.fire("No user found. Please sign up first.");
        return;
    }

    if (email === userData.email && password === userData.password) {
        
            window.location.href = "second.html"; 
        }
     else {
        Swal.fire("Invalid Email or Password");
    }
}

// start quiz
function startQuiz() {
    window.location.href = "quiz.html";
  }


//   quiz strt
var htmlQuiz = [
    { question: "HTML Stands for ?", option1: "Hypertext", option2: "Markup", option3: "HyperSuperText", option4: "HyperText Markup Language", answer: "HyperText Markup Language" },
    { question: "Which Element used to bold text in HTML?", option1: "img", option2: "h1", option3: "strong", option4: "p", answer: "strong" },
    { question: "Which Element used for Image in HTML?", option1: "span", option2: "div", option3: "image", option4: "img", answer: "img" },
    { question: "Which tag is used to create a hyperlink in HTML?", option1: "link", option2: "a", option3: "hyperlink", option4: "url", answer: "a" }
];

var question = document.getElementById("question");
var label1 = document.getElementById("label1");
var label2 = document.getElementById("label2");
var label3 = document.getElementById("label3");
var label4 = document.getElementById("label4");

var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");

var quizOptions = document.getElementsByName("quizOption");

var quizWindow = document.getElementById('quizWindow');
var resultWindow = document.getElementById('resultWindow');
var announcement = document.getElementById('announce');
var percentageSpace = document.getElementById('percentageShow');
var totalQuestions = document.getElementById('totalQue');
var correctQuestion = document.getElementById('correctQue');

var questionCount = 0;
var score = 0;

function renderQuestion() {
    question.innerHTML = htmlQuiz[questionCount].question;
    label1.innerHTML = htmlQuiz[questionCount].option1;
    label2.innerHTML = htmlQuiz[questionCount].option2;
    label3.innerHTML = htmlQuiz[questionCount].option3;
    label4.innerHTML = htmlQuiz[questionCount].option4;
    option1.value = htmlQuiz[questionCount].option1;
    option2.value = htmlQuiz[questionCount].option2;
    option3.value = htmlQuiz[questionCount].option3;
    option4.value = htmlQuiz[questionCount].option4;
}

function deSelect() {
    for (var i = 0; i < quizOptions.length; i++) {
        quizOptions[i].checked = false;
    }
}

function next() {
    var radioChecked = false;
    for (var i = 0; i < quizOptions.length; i++) {
        if (quizOptions[i].checked) {
            radioChecked = true;
            if (quizOptions[i].value === htmlQuiz[questionCount].answer) {
                score++;
            }
        }
    }

    if (!radioChecked) {
        Swal.fire({ title: "No Option Selected", text: "Please Select Any Option", icon: "error" });
    } else {
        if (questionCount < htmlQuiz.length - 1) {
            questionCount++;
            deSelect();
            renderQuestion();
        } else {
            showResult();
        }
    }
}

function showResult() {
    quizWindow.style.display = 'none';
    resultWindow.style.display = 'block';

    var percentage = Math.round((score / htmlQuiz.length) * 100);
    var resultStatus = '';
    if (percentage < 70) {
        resultStatus = 'You are Failed! Better Luck Next Time';
        announcement.className = 'redText';
    } else {
        resultStatus = 'Congratulations! You are Passed';
        announcement.className = 'greenText';
    }

    announcement.innerHTML = resultStatus;
    totalQuestions.innerHTML = htmlQuiz.length;
    correctQuestion.innerHTML = score;
    percentageSpace.innerHTML = `Your Percentage is ${percentage}%`;
}

window.onload = renderQuestion();