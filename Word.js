let Letter = require("./Letter");

function Word(word) {
    this.word = word;
    this.wordArray = this.word.split("");
    this.stor = [];

    this.con = function(){
        console.log(this.wordArray);
    }

    this.makeLetter = function(){
        this.wordArray.forEach((i) => {
            i = new Letter(i);
            this.stor.push(i);
        });
    }

    this.displayWord = function(){
        this.makeLetter();
        let display = this.stor.map((v) => v.displayLetter());
        console.log(display.join(" "))
    }
}

let tennis = new Word("tennis");

tennis.displayWord()