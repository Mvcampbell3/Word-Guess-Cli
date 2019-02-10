let Letter = require("./Letter");

function Word(word) {

    this.stor = word.split("").map((value) => new Letter(value))

    this.displayWord = function () {
        let display = this.stor.map((v) => v.displayLetter());
        console.log(display.join(" "))
    }

    this.look = function (inp) {
        inp = inp.toUpperCase();
        let fil = this.stor.filter((val) => val.letter === inp);
        fil.forEach((one) => one.check(inp))
        this.displayWord();
    }
}

module.exports = Word;