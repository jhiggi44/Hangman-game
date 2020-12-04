import { beginGame } from "../assets/javascript/game";

describe('beginning a game', () => {
    let gameVariables;

    beforeEach(() => {
        gameVariables = beginGame();
    });

    test('sets guessesLeft variable', () => {
        expect(gameVariables.guessesLeft).toEqual(11);
    });
}); 