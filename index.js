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

    pickWord: function () {
        let number = Math.floor(Math.random() * this.words.length);
        this.actualWord = this.words[number];
        this.words.splice(number, 1);
    },

    playWord: function () {
        this.actualWord = new Word(this.actualWord);
        this.actualWord.look(" ");

    },

    guessed: [],
    lives: 7,

    getLetter: function () {
        inquirer.prompt({
            type: "input",
            name: "userInput",
            message: "Please guess a letter."
        }).then((answer) => {
            game.guessed.push(answer.userInput);

            let question = game.actualWord.look(answer.userInput);

            if (question) {
                let right = game.actualWord.stor.filter(type => type.guessed === true).length;
                if (right < game.actualWord.stor.length) {
                    game.getLetter()
                } else {
                    console.log("All Done")
                }
            } else {
                game.lives--;

                if (game.lives > 0) {
                    console.log(game.lives + " lives left");
                    game.getLetter();
                } else {
                    console.log("Game Over")
                }
            }


        })
    }

}

game.pickWord();
game.playWord();
game.getLetter();

