class Hint {
    constructor(word) {
        this.word = word;
    }

    notIn(lettersGuessed) {
        const possibleHints = this.word.split("").filter(letter => !lettersGuessed.includes(letter));
        return possibleHints[Math.floor(Math.random() * possibleHints.length)]
    }
}

export { Hint };