// Variables
var wordList = [];
var maxWrong = 9;
var abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

var archivoTxt = new XMLHttpRequest();
var fileRuta = "words.txt";


var answer = "";
var newPersonalWord = ''
var currentWord = [];
var currentWordString = "";
var lettersUsed = [];
var numberMistakes = 0;
var checkIfDesist = true;
var checkIfAddWord = false;

function showHangmanBoard() {
    document.getElementById("first-buttons-group").style.display = "none";
    document.getElementById("new-word").style.display = "none";
    document.getElementById("hangman-board").style.display = "flex";

    initializeVariables();
    randomWOrd();
    showLines();
    showABC();

    hangman_canvas.focus();

    document.body.addEventListener('keydown', checkIfIsLetter);
}

function showWriteWord() {
    document.getElementById("first-buttons-group").style.display = "none";
    document.getElementById("new-word-input").value = "";
    document.getElementById("new-word").style.display = "flex";
}

function initializeVariables() {
    answer = "";
    currentWord = [];
    currentWordString = "";
    lettersUsed = [];
    numberMistakes = 0;
    checkIfDesist = true;
    checkIFAddWord = false;
    ctxHangman.clearRect(0, 0, 1366, 450);
    ctxHangman.strokeStyle = "#0A3871";
    ctxHangman.fillStyle = "#0A3871";
}

function randomWOrd() {
    if(checkIfAddWord) {
        answer = newPersonalWord;
    } else {
        archivoTxt.open('GET', fileRuta, false);
        archivoTxt.send(null);
        var txt = archivoTxt.responseText;
        wordList = txt.split(/\r\n/);
        answer = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    }
    checkIfAddWord = false;
}

function showLines() {
    var sum = 0;
    var startLine = 48 * answer.length;

    for(var i = 0; i < answer.length; i++) {
        ctxHangman.fillRect(691 - startLine + sum, 400, 80, 4);
        sum += 96;
    }

    ctxHangman.fillRect(536, 250, 294, 5);
}

function showABC() {
    var sum = 0;
    var startABC = 11 * abc.length;

    for(var i = 0; i < abc.length; i++) {
        ctxHangman.font = "24px Inter";
        ctxHangman.fillText(abc[i], 684 - startABC + sum, 450);
        sum += 22;
    }
}

function checkIfIsLetter(event) {
    var letter = event.key.toUpperCase();

    if (abc.includes(letter)) {
        var sum = 0;
        var startABC = 11 * abc.length;
        for(var i = 0; i < abc.length; i++) {
            if(letter == abc[i]) {
                ctxHangman.fillStyle = "red";
                ctxHangman.font = "24px Inter";
                ctxHangman.fillText(abc[i], 684 - startABC + sum, 450);
            }
            sum += 22;
        }

        checkIfLetterInAnswer(letter);
    } else {
        alert("It's not a valid key!")
    }
}

function checkIfLetterInAnswer(letter) {
    if(lettersUsed.includes(letter)) {
        alert("You already used this letter!");
    } else {
        lettersUsed.push(letter);

        var sum = 0;
        var startLetter = 48 * answer.length;

        if(answer.includes(letter)) {
            for (var i = 0; i < answer.length; i++) {
                sum = 0;
                
                if (answer[i] == letter) {
                    currentWord[i] = letter;
                    sum += 96 * i;
                    ctxHangman.fillStyle = "#0A3871";
                    ctxHangman.font = "48px Inter";
                    ctxHangman.fillText(answer[i], 715 - startLetter + sum, 384);
                }
            }

            currentWordString = currentWord.join('');
            console.log(currentWordString);

            if (currentWordString == answer) {
                youWin();
                document.body.removeEventListener('keydown', checkIfIsLetter);
            }
        } else {
            numberMistakes++;
            mistake(numberMistakes)

            if (numberMistakes == maxWrong) {
                gameOver();
                document.body.removeEventListener('keydown', checkIfIsLetter);
            }
        }
    }
}

function mistake(numberMistake) {
    ctxHangman.fillStyle = "#0A3871";
    ctxHangman.strokeStyle = "#0A3871";

    if(numberMistake == 1) {
        ctxHangman.fillRect(600, 250, 4.5, -250);
    } else if(numberMistake == 2) {
        ctxHangman.fillRect(600, 0, 150, 4.5);
    } else if(numberMistake == 3) {
        ctxHangman.fillRect(750, 0, 4.5, 50);
    } else if(numberMistake == 4) {
        ctxHangman.beginPath();
        ctxHangman.arc(752, 75, 25, 0, 2 * Math.PI);
        ctxHangman.lineWidth = 4.5;
        ctxHangman.stroke();
    } else if(numberMistake == 5) {
        ctxHangman.fillRect(750, 98, 4.5, 70);
    } else if(numberMistake == 6) {
        ctxHangman.beginPath();
        ctxHangman.moveTo(752.25, 99);
        ctxHangman.lineTo(720, 138);
        ctxHangman.lineWidth = 4.5;
        ctxHangman.stroke();
    } else if(numberMistake == 7) {
        ctxHangman.beginPath();
        ctxHangman.moveTo(752.25, 99);
        ctxHangman.lineTo(784.5, 138);
        ctxHangman.lineWidth = 4.5;
        ctxHangman.stroke();
    } else if(numberMistake == 8) {
        ctxHangman.beginPath();
        ctxHangman.moveTo(752.25, 166);
        ctxHangman.lineTo(720, 205);
        ctxHangman.lineWidth = 4.5;
        ctxHangman.stroke();
    } else if(numberMistake == 9) {
        ctxHangman.beginPath();
        ctxHangman.moveTo(752.25, 166);
        ctxHangman.lineTo(784.5, 205);
        ctxHangman.lineWidth = 4.5;
        ctxHangman.stroke();
    }
}

function youWin() {
    msg = "YOU WIN!";

    ctxHangman.fillStyle = "green";
    ctxHangman.font = "48px Inter";
    ctxHangman.fillText(msg, 570, 300);
    ctxHangman.fillStyle = "#0A3871";

    checkIfDesist = false;
}

function gameOver() {
    msg = "GAME OVER!";

    ctxHangman.fillStyle = "red";
    ctxHangman.font = "48px Inter";
    ctxHangman.fillText(msg, 536, 300);

    var sum = 0;
    var startLetter = 48 * answer.length;

    for (var i = 0; i < answer.length; i++) {
        sum = 0;
        sum += 96 * i;
        ctxHangman.fillStyle = "#0A3871";
        ctxHangman.font = "48px Inter";
        ctxHangman.fillText(answer[i], 715 - startLetter + sum, 384);
    }
}

function newGame() {
    showHangmanBoard();
}

function desist() {
    if(checkIfDesist) {
        for(var i = 1; i <= maxWrong; i++) {
            mistake(i);
        }

        document.body.removeEventListener('keydown', checkIfIsLetter);
        gameOver();

        setTimeout(() => {
            document.getElementById("hangman-board").style.display = "none";
            document.getElementById("first-buttons-group").style.display = "flex";
        }, 1000);
    } else {
        setTimeout(() => {
            document.getElementById("hangman-board").style.display = "none";
            document.getElementById("first-buttons-group").style.display = "flex";
        }, 1000);
    }
}

function addWord() {
    newPersonalWord = '';
    newPersonalWord = document.getElementById("new-word-input").value.toUpperCase();
    console.log(newPersonalWord);

    if(newPersonalWord.length > 0 && newPersonalWord.length <= 10) {
        checkIfAddWord = true;
        showHangmanBoard();
    } else if(newPersonalWord.length > 10) {
        alert("Max. 10 characters!");
    } else {
        alert("Please, enter a word!");
    }
}

function cancel() {
    document.getElementById("new-word").style.display = "none";
    document.getElementById("first-buttons-group").style.display = "flex";
}



// Pantallas
document.getElementById("first-buttons-group").style.display = "flex";
document.getElementById("hangman-board").style.display = "none";
document.getElementById("new-word").style.display = "none";

// Canvas
var hangman_canvas = document.getElementById("hangman-canvas");
var ctxHangman = hangman_canvas.getContext("2d");

// Botones
var start_game_button = document.getElementById("start-game-button");
var write_word_button = document.getElementById("write-word-button");
var new_game_button = document.getElementById("new-game-button");
var desist_button = document.getElementById("desist-button");
var new_word_add = document.getElementById("new-word-add");
var new_word_cancel = document.getElementById("new-word-cancel");

// Funciones para los botones
start_game_button.onclick = showHangmanBoard;
write_word_button.onclick = showWriteWord;
new_game_button.onclick = newGame;
desist_button.onclick = desist;
new_word_add.onclick = addWord;
new_word_cancel.onclick = cancel;