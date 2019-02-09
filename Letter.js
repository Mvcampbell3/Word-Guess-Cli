function Letter (letter) {
    this.letter = letter;
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
        }
    }
}

module.exports = Letter;