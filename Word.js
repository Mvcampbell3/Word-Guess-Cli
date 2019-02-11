let Letter = require("./Letter");

function Word(word) {

    this.stor = word.split("").map((value) => new Letter(value))

    this.displayWord = function () {
        let display = this.stor.map((v) => v.displayLetter());
        console.log("\n"+display.join(" ")+"\n\n")
    }

    this.look = function (inp) {
        inp = inp.toUpperCase();
        let holder = [];
        this.stor.forEach(event => holder.push(event.check(inp)));

        let rightWrong = holder.some(thing => thing === true)

        if (rightWrong && inp != " ") {
            console.log("\nYou were Right!\n");
            let fil = this.stor.filter((val) => val.letter === inp);
            fil.forEach((one) => one.check(inp))
            this.displayWord();
            return true;
        } else if (!rightWrong && inp != " ") {
            console.log("\nYou were Wrong!\n");
            this.displayWord();
            return false;
        } else if (inp === " ") {
            let spaces = this.stor.filter((val) => val.letter === " ");
            spaces.forEach((one) => one.guessed = true)
            this.displayWord();
        }


    }
}

module.exports = Word;