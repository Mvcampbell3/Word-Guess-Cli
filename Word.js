let Letter = require("./Letter");

function Word(word) {

    this.stor = word.split("").map((value) => new Letter(value))

    this.displayWord = function () {
        let display = this.stor.map((v) => v.displayLetter());
        return display.join(" ");
    }

    this.look = function (inp) {
        inp = inp.toUpperCase();
        let holder = [];
        this.stor.forEach(event => holder.push(event.check(inp)));

        let rightWrong = holder.some(thing => thing === true)

        if (rightWrong && inp != " ") {
            let fil = this.stor.filter((val) => val.letter === inp);
            fil.forEach((one) => one.check(inp))
            return true;
        } else if (!rightWrong && inp != " ") {
            return false;
        } else if (inp === " ") {
            let spaces = this.stor.filter((val) => val.letter === " ");
            spaces.forEach((one) => one.guessed = true)
        }
    }
}

module.exports = Word;