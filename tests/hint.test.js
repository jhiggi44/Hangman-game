const { expect } = require("@jest/globals");
import { Hint } from "../assets/javascript/hint";

describe('#notIn', () => {
    test('finds letters not in list of guessed letters', () => {
        const lettersGuessed = ["o"];
        const secretWord = "foo";
        const hint = new Hint(secretWord);

        expect(hint.notIn(lettersGuessed)).toEqual("f");
    });
}); 