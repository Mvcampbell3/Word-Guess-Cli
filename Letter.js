function Letter (letter) {
    this.letter = letter.toUpperCase();
    this.guessed = false;

    this.displayLetter = function() {
        if (!this.guessed) {
            return "_"
        } else {
            return this.letter;
        }
    };
    
    this.check = function(userInput) {
        console.log("checked");
        if (userInput === this.letter){
            this.guessed = true;
            console.log("true check")
        } else {
            console.log("false check")
        }
    }
}

module.exports = Letter;