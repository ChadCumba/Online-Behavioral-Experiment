/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */

/*
 * action must be extended using action.prototype.X before it can be used
 * each of the this.X params must be set so that action can burn down the queues
 * as each action consumes them
 * @TODO Signal/slot architecture would probably be easier to understand in this
 * context. As it stands this acts as a factory function for generating actions,
 * which could be misleading.
 */
function action(){

    this.trials;
    var trials = this.trials;
    this.instructions;
    var instructions = this.instructions;
    this.blockLength;
    var blockLength = this.blockLength;
    this.numberBlocks;
    var numberBlocks = this.numberBlocks;
    this.numberBreaks;
    var numberBreaks = this.numberBreaks;

    var completedTrials = ( this.blockLength * this.numberBlocks) - 
                            this.trials.length + this.numberBreaks;

    var currentBlock = Math.floor(completedTrials / this.blockLength ) + 1;

    var positionInBlock = completedTrials - ( (currentBlock - 1)* 
            (this.blockLength) ) + 1;

    //we'll use this as a flag to check if an action is currently in process
    //if it is false then its safe to execute the next action, else do nothing
    this.isBusy;
    var isBusy = this.isBusy;

    
    //run the next trial
    var runNextTrial = function(){
        action.prototype.isBusy = true;
        isBusy = true;
        var currentTrial = trials.shift();
        currentTrial.runTrial();
    };
    //display the next message in the queue
    var displayNextMessage = function(){
        var currentInstruction = instructions.shift();

        currentInstruction.display();
    };
    //terminate the game
    var applicationWillTerminate = function(){
        saveTrialsAndOutcomes();
        /*
         * we probably also want to send some kind of message to the user
         * maybe a clearScreen() call followed by a gameOver() call?
         */
    }

    //this should be the only function that we'll need to call on this object
    this.execute = function(){
         
        if(isBusy){
            return false;
        }
        clearScreen();
        /*
         * this is really horrible design right here.
         * instruction objects need to be converted to trial objects, or implement
         * an action interface so they can be dropped in the queue and executed
         * without this step. However, I've got a deadline and I'm not working
         * overtime to fix it. 
         * @TODO make the above changes
         */
        if( (completedTrials == 0 && instructions.length) == 3 ||
            (completedTrials == trials.length && instructions.length == 2) ||
            (completedTrials == 220 && instructions.length == 1) ){
            displayNextMessage();
        }
        else if(currentBlock > numberBlocks){
            applicationWillTerminate();
        }
        else if(trials.length > 0){
            runNextTrial();
        }
        else{
            fatalError();
        }
        return true;

    };


}