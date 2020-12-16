import { Game } from "../assets/javascript/game";

describe('starting a game', () => {
    let game;
    const words = ["foo"];

    beforeEach(() => {
        game = new Game(words);
        game.start();
    });

    test('initializes the guessesLeft variable', () => {
        expect(game.guessesLeft).toEqual(11);
    });

    test('initializes the lettersGuessed variable', () => {
        expect(game.lettersGuessed).toEqual([]);
    });

    test('initializes the array of spells to guess', () => {
        expect(game.secretSpell).toEqual(words[0]);
    });

    test('initializes the letters in the spell', () => {
        expect(game.lettersInSpell).toEqual(["f", "o", "o"]);
    });

    test('initializes the mask for the letters', () => {
        expect(game.letterMask).toEqual(["_", "_", "_"]);
    });

    test('initializes the number of letters left to guess', () => {
        expect(game.numLettersLeft).toEqual(3);
    });
}); 

describe('when checking the guessed letter', () => {
    let game;
    const words = ["foo"];

    beforeEach(() => {
        game = new Game(words);
        game.start();
    });

    describe('when the guess is in the word', () => {
        test('unmasking the letter', () => {
            game.letterCheck("f");
            expect(game.letterMask).toEqual(["f", "_", "_"]);
        });
    
        test('decrement number of letters left', () => {
            expect(game.numLettersLeft).toEqual(3);
            
            game.letterCheck("f");
            expect(game.numLettersLeft).toEqual(2);
        });
    
        test('updates the letters guessed', () => {
            expect(game.lettersGuessed).toEqual([]);
            
            game.letterCheck("f");
            expect(game.lettersGuessed).toEqual(["f"]);
        });

        test('does not decrement guesses left', () => {
            expect(game.guessesLeft).toEqual(11);
            
            game.letterCheck("f");
            expect(game.guessesLeft).toEqual(11);
        });
    });

    describe('when the guess is not in the word', () => {
        test('does not update the mask', () => {
            game.letterCheck("z");
            expect(game.letterMask).toEqual(["_", "_", "_"]);
        });

        test('does not decrease the number of letters left', () => {
            expect(game.numLettersLeft).toEqual(3);
            
            game.letterCheck("z");
            expect(game.numLettersLeft).toEqual(3);
        });

        test('updates the letters guessed', () => {
            expect(game.lettersGuessed).toEqual([]);
            
            game.letterCheck("z");
            expect(game.lettersGuessed).toEqual(["z"]);
        });

        test('does decrement guesses left', () => {
            expect(game.guessesLeft).toEqual(11);
            
            game.letterCheck("z");
            expect(game.guessesLeft).toEqual(10);
        });
    });
});

describe('when checking if the game is over', () => {
    let game;

    function onWin() {
        return "you win";
    }

    function onLoss() {
        return "you lose";
    }

    beforeEach(() => {
        game = new Game(["foo"]);
        game.start();
    });

    test('calls onWin when the game is won', () => {
        game.numLettersLeft = 0;
        expect(game.checkOver(onWin, onLoss)).toEqual("you win");
    });

    test('calls onLoss when the game is lost', () => {
        game.guessesLeft = 0;
        expect(game.checkOver(onWin, onLoss)).toEqual("you lose");
    });
});