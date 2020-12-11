import { beginGame } from "../assets/javascript/game";

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