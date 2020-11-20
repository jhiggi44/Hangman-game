
window.onload = function() {

	// the list of spells for the user to guess
	let spellsArray = ["alohomora", 
	"avada kedavra", "confundo","expelliarmus",
	"levicorpus", "morsmordre", "obliviate", 
	"prior incantato", "riddikulus"];

	// spell variables
	let secretSpell;
	let lettersInSpell;
	let letterMask = [];

	// round variables
	let guessesLeft;
	let numLettersLeft;
	let lettersGuessed = [];

	// game variables 
	let winCount = 0;

	// DOM variables 
	let secretSpellDisplay = document.getElementById("guessSpell");	
	let guessesLeftDisplay = document.getElementById("guessRemain");
	let winsDisplay = document.getElementById("numberWins");
	let lettersGuessedDisplay = document.getElementById("lettersGuessed");

	// a function to create the game 
	function beginGame () {

		// reset round variables 
		guessesLeft = 11;
		lettersGuessed = [];

		// initialize spell/word variables
		letterMask = [];
		secretSpell = spellsArray[Math.floor(Math.random() * spellsArray.length)];
		lettersInSpell = secretSpell.split("");

		// counts spaces - the number of spaces indicates the spell is more than one word long
		let numSpaces = 0;
		for (let i = 0; i < lettersInSpell.length; i++) {
			if (lettersInSpell[i] == " ") {
				numSpaces++;
			} 
		}

		// the numLettersLeftToGuess equals the length lettersInSpell minus the spaces
		numLettersLeft = lettersInSpell.length - numSpaces;

		// here we create the mask, if the letter is a space push a <br> tag into the array, 
		// which will seperate words when using innerHTML
		for (let i = 0; i < lettersInSpell.length; i++){
			if (lettersInSpell[i] === " ") {
				letterMask.push("<br>");
			} else {
				letterMask.push("_");
			}
		}
		
		// console.log('letter mask: ' + letterMask);

		// update HTML page
		secretSpellDisplay.innerHTML = letterMask.join(" ");
		guessesLeftDisplay.innerHTML = guessesLeft;
		winsDisplay.innerHTML = winCount;

	}

	async function letterCheck (letter) {
		
		let isLetterInWord = false;
		for (let i = 0; i < letterMask.length; i++) {
			if (secretSpell[i] == letter) {
				isLetterInWord = true;
			}
		}

		let hasLetterBeenGuessed = false;
		for (let i = 0; i < lettersGuessed.length; i++) {
			if (lettersGuessed[i] == letter) {
				hasLetterBeenGuessed = true;
			}
		}

		//Checks if letter is in spell, then sends it to corresponding blank
		if(isLetterInWord && !hasLetterBeenGuessed){
			for (var i = 0; i < lettersInSpell.length; i++) {
				if(secretSpell[i] == letter){
					letterMask[i] = letter;
					numLettersLeft--;
					}
				}
			lettersGuessed.push(letter);
			console.log("letters left #: " + numLettersLeft);
			} else if (!hasLetterBeenGuessed) { 
				lettersGuessed.push(letter);
				guessesLeft--
			}
	}

	function finishRound() {

		// update HTML with current stats
		guessesLeftDisplay.innerHTML = guessesLeft;
		secretSpellDisplay.innerHTML = letterMask.join(" ");
		lettersGuessedDisplay.innerHTML = lettersGuessed.join(" ");

		//Did user win?
		if (numLettersLeft == 0) {
			winCount++
			alert(`You're a great wizard! The spell was ${secretSpell}`);
			winsDisplay.innerHTML = winCount
			beginGame();
		} else if (guessesLeft == 0){
			alert("Are you sure you're a wizard");
			beginGame();
		}
	}

	beginGame();

	document.addEventListener("keyup", () => {
		let userGuess = String.fromCharCode(event.keyCode).toLowerCase();
		letterCheck(userGuess);
		finishRound();
	});

	function generatePossibleHint() {
		const rand = Math.floor(Math.random() * Math.floor(lettersInSpell.length))
		return lettersInSpell[rand]
	}

	function getHint() {
		let possibleHint = generatePossibleHint();
		if (!lettersGuessed.length) return possibleHint;
		while(true) {
			if (!lettersGuessed.includes(possibleHint)) {
				return possibleHint;
			}
			possibleHint = generatePossibleHint();
		}
	}

	document.getElementById("hint").addEventListener("click", (e) => {
		e.preventDefault();
		const hint = getHint();
		console.log("Hint: ", hint);
		for (var i = 0; i < lettersInSpell.length; i++) {
			if(secretSpell[i] == hint){
				letterMask[i] = hint;
				numLettersLeft--;
				}
			}
		lettersGuessed.push(hint);
		console.log("letterMask: ", letterMask);
		console.log("lettersGuessed: ", lettersGuessed);
		finishRound();
	});
}
