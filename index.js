let Word = require("./Word");
let inquirer = require("inquirer");

let game = {
    
    words: [
        "Jurrasic Park",
        "Harry Potter",
        "Michael Campbell",
        "Kid Rock"
    ],

    actualWord: null,

    pickWord: function() {
        let number = Math.floor(Math.random()* this.words.length);
        this.actualWord = this.words[number];
        this.words.splice(number, 1);
        // console.log(this.words)
    },

    playWord: function() {
        this.actualWord = new Word(this.actualWord);
        this.actualWord.look(" ");

    },

    guessed: [],

    getLetter: function() {
        inquirer.prompt({
            type: "input",
            name: "userInput",
            message: "Please guess a letter."
        }).then((answer) => {
            game.guessed.push(answer.userInput);
            game.actualWord.look(answer.userInput);
            let right = game.actualWord.stor.filter(type => type.guessed === true).length;
            if (right < game.actualWord.stor.length) {
                game.getLetter()
            } else {
                console.log("All Done")
            }
        })
    }

}

game.pickWord();
game.playWord();
console.log(game.actualWord.stor.filter(type => type.guessed === true).length);
game.getLetter();

