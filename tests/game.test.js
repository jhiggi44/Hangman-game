import { beginGame, letterCheck } from "../assets/javascript/game";

describe('beginning a game', () => {
    let gameVariables;
    const words = ["foo"];

    beforeEach(() => {
        gameVariables = beginGame(words);
    });

    test('initializes the guessesLeft variable', () => {
        expect(gameVariables.guessesLeft).toEqual(11);
    });

    test('initializes the lettersGuessed variable', () => {
        expect(gameVariables.lettersGuessed).toEqual([]);
    });

    test('initializes the array of spells to guess', () => {
        expect(gameVariables.secretSpell).toEqual(words[0]);
    });

    test('initializes the letters in the spell', () => {
        expect(gameVariables.lettersInSpell).toEqual(["f", "o", "o"]);
    });

    test('initializes the mask for the letters', () => {
        expect(gameVariables.letterMask).toEqual(["_", "_", "_"]);
    });

    test('initializes the number of letters left to guess', () => {
        expect(gameVariables.numLettersLeft).toEqual(3);
    });
}); 

describe('when checking the guessed letter', () => {
    let gameVariables;
    const words = ["foo"];

    beforeEach(() => {
        gameVariables = beginGame(words);
    });

    describe('when the guess is in the word', () => {
        test('unmasking the letter', () => {
            letterCheck(gameVariables, "f");
            expect(gameVariables.letterMask).toEqual(["f", "_", "_"]);
        });
    
        test('decrement number of letters left', () => {
            expect(gameVariables.numLettersLeft).toEqual(3);
            
            letterCheck(gameVariables, "f");
            expect(gameVariables.numLettersLeft).toEqual(2);
        });
    
        test('updates the letters guessed', () => {
            expect(gameVariables.lettersGuessed).toEqual([]);
            
            letterCheck(gameVariables, "f");
            expect(gameVariables.lettersGuessed).toEqual(["f"]);
        });

        test('does not decrement guesses left', () => {
            expect(gameVariables.guessesLeft).toEqual(11);
            
            letterCheck(gameVariables, "f");
            expect(gameVariables.guessesLeft).toEqual(11);
        });
    });

    describe('when the guess is not in the word', () => {
        test('does not update the mask', () => {
            letterCheck(gameVariables, "z");
            expect(gameVariables.letterMask).toEqual(["_", "_", "_"]);
        });

        test('does not decrease the number of letters left', () => {
            expect(gameVariables.numLettersLeft).toEqual(3);
            
            letterCheck(gameVariables, "z");
            expect(gameVariables.numLettersLeft).toEqual(3);
        });

        test('updates the letters guessed', () => {
            expect(gameVariables.lettersGuessed).toEqual([]);
            
            letterCheck(gameVariables, "z");
            expect(gameVariables.lettersGuessed).toEqual(["z"]);
        });

        test('does decrement guesses left', () => {
            expect(gameVariables.guessesLeft).toEqual(11);
            
            letterCheck(gameVariables, "z");
            expect(gameVariables.guessesLeft).toEqual(10);
        });
    });
});
