/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */

/*
 * @param myText - the text you want to display with this instruction
 * @param myJqueryObject - a wrapped jquery object eg $("p.something")
 */
function instruction(myText,myJqueryObject){

    if(typeof(myText) == "undefined" || typeof(myJqueryObject) == "undefined"){
        throw "First two arguments to instruction() are required";
    }

    var text = myText;
    var jqueryObject = myJqueryObject;

    this.display = function() {
        jqueryObject.html(text);
        jqueryObject.show();
    };
}

function instructionTrial( trialCompleteCallback, instruction){
    breakTrial.apply(this, ['',trialCompleteCallback]);
    this.instruction = instruction;
    
    this.runTrial = function() {
        this.instruction.display();
        action.prototype.isBusy = false;
    }
}
