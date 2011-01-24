/* 
 * This is the procedural driver for the game.
 * It runs a perpetual loop that terminates upon game completion.
 * All objects referenced are from outside files, included in index.php
 * All procedural code must stay in this file
*/

//global var that stores the outcomes of each trial
var outcomes = [];
//global var that stores all the trials for that user
var allTrials = [];

//location global constant
numberLocations = 4;

//Block size constants
firstBatchSize = 120;
secondBatchSize = 80;
thirdBatchSize = 20;
finalBatchSize = 20;


//This will need to be modified for each game
//Eg, how you build the trials, how many you load, etc
//should be different for each type of game
//this would also be a good place to set the blockSize and blockText if needed
function main(trials){

    //if the game hasn't been initialized, die
    var myInit = new initialize();
    if (myInit.gameInitialized != true){
        throw "Attempt to call main() without initializing game";
    }
    //if there is no deck, die
    if(typeof(trials) == "undefined" || trials.length == 0){
        throw "Trials are empty";
    }

    clearScreen();
    //hand the action objects a pointer to the trials
    action.prototype.trials = trials;
    var nextAction = new action();
    nextAction.execute();
}

//this can send whatever message you like to the user
function gameOver(gameOverMessage){
    window.location.href="";
}

function saveTrialsAndOutcomes(){
    $.ajaxSetup({
        url: '/game/savedata/',
        cache: false,
        dataType: 'script',
        type: 'POST',
        complete: function(XMLHttpRequest, textStatus){
            //probably need some kind of error handling here
            //in case textStatus is something bad
        }
    });

    var allTrialsJson = [];

    for(var i = 0; i < allTrials.length; i++){
        allTrialsJson.push([
            $(allTrials[i].myCards[0].image).attr('src').split('/').pop().split('.').shift(),
            $(allTrials[i].myCards[1].image).attr('src').split('/').pop().split('.').shift(),
            $(allTrials[i].myCards[2].image).attr('src').split('/').pop().split('.').shift(),
            $(allTrials[i].myCards[3].image).attr('src').split('/').pop().split('.').shift()
        ]);
    }
    
   
    $.ajax({
        data:{
            trial_json_data   : JSON.stringify(allTrials),
            response_json_data: JSON.stringify(outcomes)
        }
    });
}

function clearScreen(){
    $('p.loading-text').hide();
    $('p.results').hide();
    $('p.instruction-text').hide();
}

/*
 * This should only be called if we can't save data, or if something horrible
 * has gone wrong in the action call chain.
 */
function fatalError(){
    
}

