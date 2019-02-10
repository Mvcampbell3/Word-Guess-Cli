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
        if (userInput === this.letter){
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Letter;