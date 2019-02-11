let Word = require("./Word");
let inquirer = require("inquirer");

let chalk = require("chalk");

let game = {

    words: [
        // "Global Thermonuclear War",
        // "Matthew Broderick",
        // "The only winning move is not to play"
        "fast"
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
        console.log(chalk.yellow("\nLetters already guessed: " + game.guessed.join(" ") + "\n"))
        console.log(chalk.cyan(this.actualWord.displayWord()) + "\n")
        this.getLetter();

    },

    guessed: [],
    lives: 10,
    wins: 0,
    losses: 0,
    choices: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

    getLetter: function () {
        inquirer.prompt({
            type: "input",
            name: "userInput",
            message: chalk.yellow("Please guess a letter.")
        }).then((answer) => {
            console.log(chalk.magenta("\n-----------------------------------------\n"))
            if (game.choices.indexOf(answer.userInput.toUpperCase()) != -1) {
                if (game.guessed.indexOf(answer.userInput.toUpperCase()) != -1) {
                    console.log(chalk.yellow("\nLetters already guessed: " + game.guessed.join(" ") + "\n"))
                    console.log(chalk.cyan(this.actualWord.displayWord()))
                    console.log("\nYou've already tried that one.\n");
                    game.getLetter();
                } else {
                    game.guessed.push(answer.userInput.toUpperCase());
                    console.log(chalk.yellow("\nLetters already guessed: " + game.guessed.join(" ") + "\n"))

                    let correct = game.actualWord.look(answer.userInput);
                    console.log(chalk.cyan(this.actualWord.displayWord()))
                    if (correct) {
                        console.log(chalk.green("\nYou were Right!\n"))
                        let right = game.actualWord.stor.filter(type => type.guessed === true).length;
                        if (right < game.actualWord.stor.length) {
                            game.getLetter()

                        } else {
                            console.log(chalk.green("You got them all!\n"));
                            game.lives = 10;
                            game.wins++;
                            if (game.words.length > 0) {
                                game.continueGame();
                            } else {
                                game.endGame();
                            }
                        }
                    } else {
                        console.log(chalk.red("\nYou were Wrong!\n"))
                        game.lives--;

                        if (game.lives > 0) {
                            console.log(chalk.red(game.lives + " lives left"));
                            game.getLetter();
                        } else {
                            console.log(chalk.red("Round Over, you ran out of lives :(") + "\n");
                            game.lives = 10;
                            game.losses++;
                            if (game.words.length > 0) {
                                game.continueGame();
                            } else {
                                game.endGame();
                            }
                        }
                    }
                }
            } else {
                console.log(chalk.yellow("\nLetters already guessed: " + game.guessed.join(" ") + "\n"))
                console.log(chalk.cyan(this.actualWord.displayWord()))
                console.log("\nThat was not the guess you were looking for... only letters accepted\n");
                game.getLetter();
            }
        })
    },

    startGame: function () {
        console.log(chalk.blue("\n\nWelcome to the Word Guess Game\n"));
        console.log(chalk.blue("You are going to asked to guess letters of a hidden word\n"));
        console.log(chalk.blue("All of the words will have the movie WarGames in common\n"))



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
    },

    endGame: function () {
        console.log(chalk.blue("\nGame is out of words, \n\nYou ended up getting " + this.wins + " right!\n\n"));
        inquirer.prompt({
            type: "confirm",
            name: "keep",
            message: chalk.yellow("Would you like to play again?"),
            default: true
        }).then(answer =>{
            if (answer.keep) {
                game.words = [
                    "Global Thermonuclear War",
                    "Matthew Broderick",
                    "The only winning move is not to play"
                ];
                game.wins = 0;
                game.losses = 0;
                game.lives = 10;
                game.guessed = [];
                let lines = process.stdout.getWindowSize()[1];
                for (let i = 0; i < lines; i++) {
                    console.log('\r\n');
                }
                game.pickWord();

            } else {

            console.log(chalk.blue("\nThank you very much for playing!"))
            }
        })
    }
}

game.startGame();
