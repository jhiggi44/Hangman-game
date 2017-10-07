

var spellsArray = ["alohomora", 
"avada kedavra", "confundo","expelliarmus",
"levicorpus", "morsmordre", "obliviate", 
"prior incantato", "riddikulus"];
var chosenSpell = "";
var letterSpell = "";
var numBlanks = 0;
var spellBlanks = [];
var wrongGuess = [];

var winCount = 0;
var guessLeft = 11;
// this starts the game by randomizing the spells. 
function beginGame () {
chosenSpell = spellsArray[Math.floor(Math.random()*spellsArray.length)];
letterSpell = chosenSpell.split("");
numBlanks = letterSpell.length;

	//This resets the game to current score and 11 guesses
	guessLeft = 11;
	wrongGuess = [];
	spellBlanks = [];

	//the "for loop" makes an array out of the variable spellBlanks
	//.push adds a "_" string to the array for every letter of the word. 
	for (var i=0; i<numBlanks; i++){
		spellBlanks.push("_");
	}
	//this writes the array spellBlanks to the HTML tag with id "guessSpell"
	//.join("") makes the array of "_" strings into one "_ _ _ _ _" string.
	document.getElementById("guessSpell").innerHTML = spellBlanks.join(" ");
	//this writes the number of guesses to HTML tag with class "guessRemain"
	document.getElementById("guessRemain").innerHTML = guessLeft;
	document.getElementById("numberWins").innerHTML = winCount;




console.log(chosenSpell);
console.log(letterSpell);
console.log(numBlanks);
console.log(spellBlanks);
}

function letterCheck (letter) {
	
	var isLetterInWord = false;
	for (var i = 0; i < numBlanks; i++) {
		if (chosenSpell[i] == letter) {
			isLetterInWord = true;
			alert("Letter found!");
		}
	}
	//Checks if letter is in spell, then sends it to corresponding blank
	if(isLetterInWord){
		for (var i = 0; i < numBlanks; i++) {
		if(chosenSpell[i] == letter){
			spellBlanks[i] = letter;
			}
		}
	}
	//Letter wasn't found
	else{
		wrongGuess.push(letter);
		guessLeft--
	}



	console.log(spellBlanks);
}

function finishRound() {
	console.log("Win Count: " + winCount + "| Guesses Left: " + guessLeft)
	//update HTML to reflect correct stats
	document.getElementById("guessRemain").innerHTML = guessLeft;
	document.getElementById("guessSpell").innerHTML = spellBlanks.join(" ");
	document.getElementById("lettersGuessed").innerHTML= wrongGuess.join(" ");

	//Did user win?
	if (letterSpell.toString() == spellBlanks.toString()) {
		winCount++
		alert("You won!")
	// update HTML with win count
	document.getElementById("numberWins").innerHTML = winCount
	beginGame();
	}
	else if (guessLeft == 0){
		alert("Loser!");
		beginGame();
	}
}

beginGame();

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	letterCheck(userGuess);
	finishRound();


	console.log(userGuess);
}