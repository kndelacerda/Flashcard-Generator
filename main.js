// Allows files to be readable
var fs = require("fs")
    // Calls the Inquirer NPM
var inquirer = require("inquirer");

// Card Constructor
function BasicCard(front, back) {
    if (this instanceof Basiccard) {
        this.front = front;
        this.back = back;
    } else {
        return new BasicCard(front, back);
    }
};

// Add print card to basic card prototype
BasicCard.prototype.printCard = function() {
    console.log("Question: " + this.front + "\nAnswer: " + this.back);
};

// cloze card construction
function ClozeCard(text, cloze) {
    if (this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.hidden = text.replace(cloze, "( ... )")
    } else {
        return new ClozeCard(text, cloze);
    }
};

// Print Card to BasicCard Prototype
//** ClozeCard.prototype.printCard = function */
//**switch function */

ClozeCard.prototype.printCard = function() {
    if (this.text.includes(this.cloze)) {
        console.log("Card stored as: " + this.hidden);
    } else {
        console.log("Error: text to hide not in full text.")
    }
}
switch (process.argv[2]) {
    case "basic":
        var askForInput = inquirer.prompt([{
                type: "input",
                name: "question",
                message: "Enter the question text: "
            },
            {
                type: "input",
                name: "answer",
                message: "Enter the answer text: "
            }
        ]).then(function(data) {
            var newCard = BasicCard(data.question, data.answer);
            newCard.printCard();
        });
        break;
    case "cloze":
        var askForInput = inquirer.prompt([{
            type: "input",
            name: "clozed",
            message: "What portion of the test do you want to hide?"
        }]).then(function(data) {
            var newCard = ClozeCard(data.text, data.clozed);
            newCard.printCard();
        });
        break;
    default:
        console.log("Incorrect card type: run file from node adding 'basic' for Basic Cards or 'cloze' for Cloze Cards.")
};