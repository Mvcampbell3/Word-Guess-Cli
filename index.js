let Word = require("./Word");
let inquirer = require("inquirer");
let fs = require("fs");

let chalk = require("chalk");

let game = {

    words: [],

    actualWord: null,

    pickWord: function () {
        
        let number = Math.floor(Math.random() * this.words.length);
        this.actualWord = this.words[number];
        this.words.splice(number, 1);
        this.playWord();
    },

    playWord: function () {
        for (var screen = 0; screen < 50; screen++) {
            console.log("\r\n")
        }
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
                console.log("\nPlease guess one letter at a time\n");
                game.getLetter();
            }
        })
    },

    startGame: function () {
        console.log(chalk.blue("\n\nWelcome to the Word Guess Game\n"));
        console.log(chalk.blue("You are going to asked to guess letters of a hidden word\n"));
        console.log(chalk.blue("There are 3 categories to choose from, have fun!\n"));
        game.words = [];
        game.wins = 0;
        game.losses = 0;
        game.lives = 10;
        game.guessed = [];

        inquirer.prompt(
            {
                type: "confirm",
                name: "play",
                message: chalk.green("Would you like to play a game?"),
                default: true
            }
        ).then(answer => {
            if (answer.play) {
                inquirer.prompt({
                    type: "list",
                    name: "quiz",
                    message: "\nWhich group of words would you like to use?\n\n",
                    choices: [
                        chalk.blue("Tampa Bay Lightning Players\n"),
                        chalk.green("Mel Brooks Movies\n"),
                        chalk.red("Tom Petty Songs\n")
                    ]
                }).then(answer => {

                    var grabText;

                    fs.readFile("./keeper.txt", "utf8", (err, data) => {
                        if (err) throw err;
                        grabText = data.split(";");
                        switch (answer.quiz) {
                            case chalk.blue("Tampa Bay Lightning Players\n"):
                                game.words = grabText[0].split(", ")

                                game.pickWord();
                                break;
                            case chalk.green("Mel Brooks Movies\n"):
                                game.words = grabText[1].split(", ");

                                game.pickWord();
                                break;
                            case chalk.red("Tom Petty Songs\n"):
                                game.words = grabText[2].split(", ");

                                game.pickWord();
                                break;
                            default:
                                console.log("I think I know why this is happening");
                                console.log("I did so you should never see this message")
                        }
                    })

                })

            } else {
                console.log("\nRaspberry. There's only one man who would dare give me the raspberry: Lone Star!\n")
            }
        })
    },

    continueGame: function () {
        inquirer.prompt({
            type: "confirm",
            name: "continue",
            message: chalk.green("  Would you like to continue this round? "),
            default: true
        }).then((answer) => {
            if (answer.continue) {
                
                game.guessed = [];
                game.pickWord();
            } else {
                inquirer.prompt({
                    type: "confirm",
                    name: "main",
                    message: chalk.yellow("\nWould you like to return to the main menu?"),
                    default: true
                }).then(answer => {
                    if (answer.main) {
                        game.startGame()
                    } else {
                        console.log(chalk.red("\nThank you for playing!\n"))
                    }
                })
            }
        })
    },

    endGame: function () {
        console.log(chalk.blue("\nRound is over, \n\nYou ended up getting " + this.wins + " right!\n\n"));
        inquirer.prompt({
            type: "confirm",
            name: "keep",
            message: chalk.yellow("Would you like to play again?"),
            default: true
        }).then(answer => {
            if (answer.keep) {
                game.startGame();
            } else {
                console.log(chalk.blue("\nThank you very much for playing!"))
            }
        })
    }
}

game.startGame();

