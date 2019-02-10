let Letter = require("./Letter");

function Word(word) {
    
    this.stor = word.split("").map((value) => new Letter(value))

    this.displayWord = function(){
        let display = this.stor.map((v) => v.displayLetter());
        console.log(display.join(" "))
    }

    this.look = function(inp) {
        letters = this.stor.map((filler) => filler.letter);
        where = letters.indexOf(inp);
        console.log(where);
        if (where > -1) {
            let fil = this.stor.filter((val) => val.letter === inp);
            fil.forEach((one) => one.check(inp))
            this.displayWord();
        } else {
            this.displayWord();
        }
    }
}

let tennis = new Word("tennis");
// tennis.displayWord();
tennis.look("t")