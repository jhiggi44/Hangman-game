import { Hint } from "./hint.js";

let secretSpellDisplay;	
let guessesLeftDisplay;
let winsDisplay;
let lettersGuessedDisplay;
let gameVariables;
let winCount = 0;

function beginGame(words) {
	// initialize spell/word variables
	const spellsArray = words || ["alohomora", 
	"avada kedavra", "confundo","expelliarmus",
	"levicorpus", "morsmordre", "obliviate", 
	"prior incantato", "riddikulus"];

	const secretSpell = spellsArray[Math.floor(Math.random() * spellsArray.length)];
	const lettersInSpell = secretSpell.split("");

	// counts spaces - the number of spaces indicates the spell is more than one word long
	let numSpaces = 0;
	for (let i = 0; i < lettersInSpell.length; i++) {
		if (lettersInSpell[i] == " ") {
			numSpaces++;
		} 
	}

	// the numLettersLeftToGuess equals the length lettersInSpell minus the spaces
	let numLettersLeft = lettersInSpell.length - numSpaces;

	let letterMask = [];
	// here we create the mask, if the letter is a space push a <br> tag into the array, 
	// which will seperate words when using innerHTML
	for (let i = 0; i < lettersInSpell.length; i++){
		if (lettersInSpell[i] === " ") {
			letterMask.push("<br>");
		} else {
			letterMask.push("_");
		}
	}

	return {
		guessesLeft: 11,
		lettersGuessed: [],
		secretSpell,
		lettersInSpell,
		letterMask,
		numLettersLeft,
	};
}

function updateLetterMask(gameVariables, letter) {
	for (var i = 0; i < gameVariables.lettersInSpell.length; i++) {
		if(gameVariables.secretSpell[i] == letter){
			gameVariables.letterMask[i] = letter;
		}
	}
}

function updateNumLettersLeft(gameVariables, letter) {
	for (var i = 0; i < gameVariables.lettersInSpell.length; i++) {
		if(gameVariables.secretSpell[i] == letter){
			gameVariables.numLettersLeft--;
		}
	}
}

function updateLettersGuessed(gameVariables, letter) {
	gameVariables.lettersGuessed.push(letter);
}

function onCorrectGuess(gameVariables, letter) {
	updateNumLettersLeft(gameVariables, letter);
	updateLettersGuessed(gameVariables, letter);
	updateLetterMask(gameVariables, letter);
}

function letterCheck(gameVariables, letter) {
	let isLetterInWord = false;
	for (let i = 0; i < gameVariables.letterMask.length; i++) {
		if (gameVariables.secretSpell[i] == letter) {
			isLetterInWord = true;
		}
	}

	let hasLetterBeenGuessed = false;
	for (let i = 0; i < gameVariables.lettersGuessed.length; i++) {
		if (gameVariables.lettersGuessed[i] == letter) {
			hasLetterBeenGuessed = true;
		}
	}

	//Checks if letter is in spell, then sends it to corresponding blank
	if (isLetterInWord && !hasLetterBeenGuessed) {
		onCorrectGuess(gameVariables, letter)
	} else if (!hasLetterBeenGuessed) {
		updateLettersGuessed(gameVariables, letter);
		gameVariables.guessesLeft--;
	}
}

function onWin(spell) {
	winCount++
	alert(`You're a great wizard! The spell was ${spell}`);
	winsDisplay.innerHTML = winCount
	gameVariables = beginGame();
	pageInit(gameVariables);
}

function onLoss() {
	alert("Are you sure you're a wizard");
	gameVariables = beginGame();
	pageInit(gameVariables);
}

function checkOver(gameVariables, onWin, onLoss) {
	//Did user win?
	if (gameVariables.numLettersLeft == 0) {
		onWin(gameVariables.secretSpell);
	} else if (gameVariables.guessesLeft == 0){
		onLoss();
	}
}

function finishRound() {
	// update HTML with current stats
	guessesLeftDisplay.innerHTML = gameVariables.guessesLeft;
	secretSpellDisplay.innerHTML = gameVariables.letterMask.join(" ");
	lettersGuessedDisplay.innerHTML = gameVariables.lettersGuessed.join(" ");
	checkOver(gameVariables, onWin, onLoss);
}

function pageInit(gameVariables) {
	// update HTML page
	secretSpellDisplay.innerHTML = gameVariables.letterMask.join(" ");
	guessesLeftDisplay.innerHTML = gameVariables.guessesLeft;
	lettersGuessedDisplay.innerHTML = [];
	winsDisplay.innerHTML = winCount;
}	


window.onload = function() {
	// DOM variables 
	secretSpellDisplay = document.getElementById("guessSpell");	
	guessesLeftDisplay = document.getElementById("guessRemain");
	winsDisplay = document.getElementById("numberWins");
	lettersGuessedDisplay = document.getElementById("lettersGuessed");
	
	gameVariables = beginGame();
	
	pageInit(gameVariables);

	document.addEventListener("keyup", () => {
		let userGuess = String.fromCharCode(event.keyCode).toLowerCase();
		letterCheck(gameVariables, userGuess);
		finishRound();
	});

	document.getElementById("hint").addEventListener("click", (e) => {
		e.preventDefault();
		const hint = new Hint(secretSpell).notIn(lettersGuessed);
		onCorrectGuess(gameVariables, hint)
		finishRound();
	});
}

export { beginGame, letterCheck, checkOver }
