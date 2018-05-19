// gobal variables
var words =           // Word list
    [
        "COCKTAIL",
        "MARTINI",
        "DICE",
        "CROONER",
        "GUYS",
        "DOLLS",
        "VEGAS",
        "SINATRA",
        "DEAN",
        "SAMMY",
        "OCEANS",
        "SANDS",
        "JOEY",
        "PETER",
    ];

// total chances to be allowed
    const chances = 10;
// track user's guesses
    var guesses = [];
// array position of random word
    var wordChoice;
// build word in blank word space
    var wordBuilder = [];
// track chances
    var chancesLeft = 0;
// value to trigger ending message
    var finished = false;
// wins tracker
    var wins = 0;


// Game Reset
    function reset() {
// reset number of chances
        chancesLeft = chances;
// random word choice
        wordChoice = Math.floor(Math.random() * (words.length));
// Clear guesses and word space
        guesses = [];
        wordBuilder = [];
// Build new word space
        for (var i = 0; i < words[wordChoice].length; i++) {
            wordBuilder.push("_");
        }

// Hide images/text
      document.getElementById("goAgain").style.cssText= "display: none";
      document.getElementById("gameover-image").style.cssText = "display: none";
      document.getElementById("cheersGif").style.cssText = "display: none";

      updateDisplay();
    };

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var wordBuilderText = "";
    for (var i = 0; i < wordBuilder.length; i++) {
        wordBuilderText += wordBuilder[i];
    }

    //
    document.getElementById("currentWord").innerText = wordBuilderText;
    document.getElementById("chancesLeft").innerText = chancesLeft;
    document.getElementById("guesses").innerText = guesses;
};

// compare user's letter guess to all letters in the string and, if present, fill them in the appropriate blanks
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];
// Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < words[wordChoice].length; i++) {
        if(words[wordChoice][i] === letter) {
            positions.push(i);
        }
    }
// if letter guess is not present in the value, remove a chance
    if (positions.length <= 0) {
        chancesLeft--; }
        else {
        // Loop to fill in letters
        for(var i = 0; i < positions.length; i++) {
            wordBuilder[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining blanks in the wordBuilder
function checkWin() {
    if(wordBuilder.indexOf("_") === -1) {
        document.getElementById("cheersGif").style.cssText = "display: block";
        document.getElementById("goAgain").style.cssText= "display: block";
        wins++;
        finished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(chancesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display:block";
        finished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (chancesLeft > 0) {
// check letter against previous guesses
        if (guesses.indexOf(letter) === -1) {
            guesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

document.onkeydown = function(event) {
  if(finished) {
        reset();
        finished = false;
    } else {

        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
