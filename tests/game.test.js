import { beginGame, updateLetterMask } from "../assets/javascript/game";

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

describe('updating the letter mask', () => {
    let gameVariables;

    beforeEach(() => {
        gameVariables = { 
            secretSpell: "foo",
            lettersInSpell: ["f", "o", "o"],
            letterMask: ["_", "_", "_"]
        }
    });

    test('it unmasks the letter if it is found in the word', () => {
        updateLetterMask(gameVariables, "f");
        expect(gameVariables.letterMask).toEqual(["f", "_", "_"]);
    });

    test('it leaves the mask alone if it is not found in the word', () => {
        updateLetterMask(gameVariables, "z");
        expect(gameVariables.letterMask).toEqual(["_", "_", "_"]);
    });
});