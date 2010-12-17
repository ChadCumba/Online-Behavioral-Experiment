/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * @param myLocation - the physical location of the stimulus on screen
 * @param myStack - the stack the the outcome is drawn from
 * @param myFeature - the graphic dom object that we will show the user
 * @param myBackgroundClass - the class name of the background for the stimulus
 */
function cardStimulus(myLocation, myStack, myFeature, myProbability, myBackgroundClass){

    //the stack 0-3 i'm in
    this.location = myLocation;
    //the graphic feature I should display
    this.image = myFeature;

    this.backgroundClass = myBackgroundClass;

    this.probability = myProbability;
    //card stack containing outcomes that I'm from
    //this acts as a pointer to the matrix, which is shared amongst all
    //instances of this class
    var stack = myStack;

    var points = 0;

    this.pointValue = function(){

        if(points == 0){
            var outcome = stack[this.location].shift();
            if(outcome == 1){
                points = 15;
            }else{
                points = -5;
            }
        }
        return points;

    };

}

