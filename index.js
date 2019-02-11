let Word = require("./Word");
let inquirer = require("inquirer");

let chalk = require("chalk");

let game = {

    words: [
        // "Jurrasic Park",
        "Harry Potter",
        // "Michael Campbell",
        "Kid Rock",
    ],

    actualWord: null,

    pickWord: function () {
        let number = Math.floor(Math.random() * this.words.length);
        this.actualWord = this.words[number];
        this.words.splice(number, 1);
        this.playWord();
    },

    playWord: function () {
        this.actualWord = new Word(this.actualWord);
        this.actualWord.look(" ");
        this.getLetter();

    },

    guessed: [],
    lives: 10,
    wins: 0,
    losses: 0,

    getLetter: function () {
        inquirer.prompt({
            type: "input",
            name: "userInput",
            message: chalk.yellow("Please guess a letter.")
        }).then((answer) => {
            console.log(chalk.magenta("\n-----------------------------------------"))

            game.guessed.push(answer.userInput.toUpperCase());
            console.log("\n\nLetters already guessed: " + game.guessed.join(" "))

            let correct = game.actualWord.look(answer.userInput);

            if (correct) {
                let right = game.actualWord.stor.filter(type => type.guessed === true).length;
                if (right < game.actualWord.stor.length) {
                    game.getLetter()

                } else {
                    console.log(chalk.green("You got them all!\n"))
                    if (game.words.length > 0) {
                        // prompt next word function
                        game.lives = 10;
                        game.wins++;
                        game.continueGame();

                    } else {
                        game.wins++;
                        console.log(chalk.blue("Game is out of words, \nYou ended up getting " + this.wins + " Right!"));
                        console.log(chalk.blue("\nThank you very much for playing!"))
                    }
                }
            } else {
                game.lives--;

                if (game.lives > 0) {
                    console.log(chalk.red(game.lives + " lives left"));
                    game.getLetter();
                } else {
                    console.log("\n" + chalk.red("Round Over, you ran out of lives :(") + "\n");
                    game.lives = 10;
                    game.losses++;
                    game.continueGame();
                }
            }
        })
    },

    startGame: function () {
        console.log(chalk.blue("\n\nWelcome to the Word Guess Game\n"))
        inquirer.prompt(
            {
                type: "confirm",
                name: "play",
                message: chalk.green("Would you like to play a game?"),
                default: true
            }
        ).then(answer => {
            if (answer.play) {
                let lines = process.stdout.getWindowSize()[1];
                for (let i = 0; i < lines; i++) {
                    console.log('\r\n');
                }
                game.pickWord();
            } else {
                console.log("\nThen why are you even here? Stop wasting my time, human\n")
            }
        })
    },

    continueGame: function () {
        inquirer.prompt({
            type: "confirm",
            name: "continue",
            message: chalk.green("  Would you like to continue  "),
            default: true
        }).then((answer) => {
            if (answer.continue) {
                let lines = process.stdout.getWindowSize()[1];
                for (let i = 0; i < lines; i++) {
                    console.log('\r\n');
                }
                game.guessed = [];
                game.pickWord();
            } else {
                console.log("\nThank you very much for playing!\n")
            }
        })
    }
}

game.startGame();
