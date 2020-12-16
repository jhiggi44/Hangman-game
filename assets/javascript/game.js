import { Hint } from "./hint.js";

let secretSpellDisplay;	
let guessesLeftDisplay;
let winsDisplay;
let lettersGuessedDisplay;
let game;
let winCount = 0;

class Game {
	constructor(words) {
		this.words = words;
	}

	start() {
		this.guessesLeft = 11;
		this.lettersGuessed = [];
		const spellsArray = this.words || ["alohomora", 
		"avada kedavra", "confundo","expelliarmus",
		"levicorpus", "morsmordre", "obliviate", 
		"prior incantato", "riddikulus"];

		this.secretSpell = spellsArray[Math.floor(Math.random() * spellsArray.length)];
		this.lettersInSpell = this.secretSpell.split("");

		// counts spaces - the number of spaces indicates the spell is more than one word long
		let numSpaces = 0;
		for (let i = 0; i < this.lettersInSpell.length; i++) {
			if (this.lettersInSpell[i] == " ") {
				numSpaces++;
			} 
		}

		// the numLettersLeftToGuess equals the length lettersInSpell minus the spaces
		this.numLettersLeft = this.lettersInSpell.length - numSpaces;

		this.letterMask = [];
		// here we create the mask, if the letter is a space push a <br> tag into the array, 
		// which will seperate words when using innerHTML
		for (let i = 0; i < this.lettersInSpell.length; i++){
			if (this.lettersInSpell[i] === " ") {
				this.letterMask.push("<br>");
			} else {
				this.letterMask.push("_");
			}
		}
	}

	letterCheck(letter) {
		let isLetterInWord = false;
		for (let i = 0; i < this.letterMask.length; i++) {
			if (this.secretSpell[i] == letter) {
				isLetterInWord = true;
			}
		}
	
		let hasLetterBeenGuessed = false;
		for (let i = 0; i < this.lettersGuessed.length; i++) {
			if (this.lettersGuessed[i] == letter) {
				hasLetterBeenGuessed = true;
			}
		}
	
		//Checks if letter is in spell, then sends it to corresponding blank
		if (isLetterInWord && !hasLetterBeenGuessed) {
			this.onCorrectGuess(letter)
		} else if (!hasLetterBeenGuessed) {
			this.updateLettersGuessed(letter);
			this.guessesLeft--;
		}
	}

	updateLetterMask(letter) {
		for (var i = 0; i < this.lettersInSpell.length; i++) {
			if(this.secretSpell[i] == letter){
				this.letterMask[i] = letter;
			}
		}
	}
	
	updateNumLettersLeft(letter) {
		for (var i = 0; i < this.lettersInSpell.length; i++) {
			if(this.secretSpell[i] == letter){
				this.numLettersLeft--;
			}
		}
	}
	
	updateLettersGuessed(letter) {
		this.lettersGuessed.push(letter);
	}

	onCorrectGuess(letter) {
		this.updateNumLettersLeft(letter);
		this.updateLettersGuessed(letter);
		this.updateLetterMask(letter);
	}

	checkOver(onWin, onLoss) {
		//Did user win?
		if (this.numLettersLeft == 0) {
			return onWin(this.secretSpell);
		} else if (this.guessesLeft == 0){
			return onLoss();
		}
	}
}

function onWin(spell) {
	winCount++
	alert(`You're a great wizard! The spell was ${spell}`);
	winsDisplay.innerHTML = winCount
	game = new Game();
	game.start();
	pageInit(game);
}

function onLoss() {
	alert("Are you sure you're a wizard");
	game = new Game();
	game.start();
	pageInit(game);
}

function finishRound() {
	// update HTML with current stats
	guessesLeftDisplay.innerHTML = game.guessesLeft;
	secretSpellDisplay.innerHTML = game.letterMask.join(" ");
	lettersGuessedDisplay.innerHTML = game.lettersGuessed.join(" ");
	game.checkOver(onWin, onLoss);
}

function pageInit(game) {
	secretSpellDisplay.innerHTML = game.letterMask.join(" ");
	guessesLeftDisplay.innerHTML = game.guessesLeft;
	lettersGuessedDisplay.innerHTML = [];
	winsDisplay.innerHTML = winCount;
}

window.onload = function() {
	// DOM variables 
	secretSpellDisplay = document.getElementById("guessSpell");	
	guessesLeftDisplay = document.getElementById("guessRemain");
	winsDisplay = document.getElementById("numberWins");
	lettersGuessedDisplay = document.getElementById("lettersGuessed");
	
	game = new Game();
	game.start();
	pageInit(game);

	document.addEventListener("keyup", () => {
		let userGuess = String.fromCharCode(event.keyCode).toLowerCase();
		game.letterCheck(userGuess);
		finishRound();
	});

	document.getElementById("hint").addEventListener("click", (e) => {
		e.preventDefault();
		const hint = new Hint(secretSpell).notIn(lettersGuessed);
		game.onCorrectGuess(hint)
		finishRound();
	});
}

export { Game }
