/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */


/*
 * @param deck - the deck of cards to build trials from
 * @param condition - the condition 1-6 that we're testing
 * @param preSelectedCards - the list of cards to select for the user during
 *                           auto selection trials
 */
function buildTrials(deck,condition,preSelectedCards,instructionQueue){

    var cards = [];

    while(deck[0].length > 0){
        cards.push([deck[0].shift(), deck[1].shift(), deck[2].shift(), deck[3].shift()]);
    }

    var trials = [];

    trials = trials.concat(createRegularTrialsFromCards(firstBatchSize,cards));

    if(condition != 3 && condition != 6){
        trials = trials.concat(createRegularTrialsFromCards(secondBatchSize + thirdBatchSize, cards));
    }else{
        trials = trials.concat(createAutoSelectTrialsFromCards(secondBatchSize,cards,preSelectedCards));
        if(condition == 3){
            trials = trials.concat(createRegularTrialsFromCards(thirdBatchSize, cards));
        } else{
            trials = trials.concat(createAutoSelectTrialsFromCards(thirdBatchSize, cards, preSelectedCards));
        }
    }

    trials = trials.concat(createProbeTrialsFromCards(finalBatchSize, cards));
    
    breaks = createBreakTrials(11);
    
    for(var i = trials.length; i >= 0; i--){
        if(breaks.length > 0 && i%20 == 0 && i != trials.length){
            trials.splice(i,0,breaks.pop());
        }
    }
    instructions = createInstructionTrials(instructionQueue);
    trials.splice(0,0,instructions.shift());
    trials.splice(126,0,instructions.shift());
    trials.splice(232,0,instructions.shift());
    return trials;
}

/*
 * @TODO The createXXX functions now need to be refactored as a factory 
 * class, instead of individual functions. This would also be a good time to 
 * setup the observer pattern in the trial callbacks.
 * @param numTrialsToBuild - the number of trials to build
 * @param cards - a reference to an Array of cards
 */
function createRegularTrialsFromCards(numTrialsToBuild,cards){
    var trials = [];
    for(var i = 0; i < numTrialsToBuild; i++){
        trials.push(
            new trial(cards.shift(),
                function(reactionTime,selectedCard,points,keyStroke){
                     outcomes.push(new outcome(reactionTime,selectedCard, points,
                        keyStroke));
                },
                function(points,locationClass, reactionTime){
					
					var timeOffset = 0;
					if(reactionTime > 0){
						timeOffset = 1000 - reactionTime;
					}else{
						timeOffset = 1000;
					}
					//set red border here
					$('img:visible').each(
						function(index){
								if($(this).hasClass('selected') == false){
									$(this).selected({'color':'red'});
								}
						}
					);

                    //if they selected the right card
                    if(points > 0){
                        setTimeout(
                        "$('img.win-img').addClass('" +locationClass + "').show().selected();"
                        ,2001 );
                        setTimeout(
                        "$('img.win-img').removeClass('" + locationClass + "').deselected().hide();",
                        3499
                        );
                    } else {
                        //if they selected the wrong card
                        if(reactionTime > 0){
                            setTimeout(
                            "$('img.lose-img').addClass('" +locationClass + "').show().selected();"
                            ,2001);
                            setTimeout(
                            "$('img.lose-img').removeClass('" + locationClass + "').deselected().hide();",
                            3499
                            );
                        }
                    }
                    setTimeout("$('img:visible').deselected().hide()", 3500);
                    setTimeout("$('img').removeClass('selected');", 3501);
                    //execute the next action
                    setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                           , 5000 - timeOffset);
                }
            )
        );
    }

    return trials;
}
/*
 * @param numTrialsToBuild - the number of trials to build
 * @param cards - a reference to an Array of cards
 * @param preSelectedCards - an array of card locations to select
 */
function createAutoSelectTrialsFromCards(numTrialsToBuild,cards,preSelectedCards){
    var trials = [];

    for(var i = 0; i< numTrialsToBuild; i++){
        trials.push(new autoSelectionTrial(cards.shift(),
            function(reactionTime,selectedCard,points,keyStroke){
                 outcomes.push(new outcome(reactionTime,selectedCard, points,
                    keyStroke));
            },
            function(points,locationClass, userResponded){

                
                //set red border here
                $('img:visible').each(
                    function(index){
                            if($(this).hasClass('selected') == false || 
                                !userResponded){
                                $(this).selected({'color':'red'});
                            }
                    }
                );

                if(points > 0){
                        setTimeout(
                        "$('img.win-img').addClass('" +locationClass + "').show().selected();"
                        ,2001);
                        setTimeout(
                        "$('img.win-img').removeClass('" + locationClass + "').deselected().hide();",
                        3499
                        );
                    } else{
                        //if they selected the wrong card
                        if(userResponded){
                            
                            setTimeout(
                            "$('img.lose-img').addClass('" +locationClass + "').show().selected();"
                            ,2001);
                            setTimeout(
                            "$('img.lose-img').removeClass('" + locationClass + "').deselected().hide();",
                            3499
                            );
                        }
                    }
                
                setTimeout("$('img:visible').deselected().hide();", 3500);
                //execute the next action
                setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                       , 4000);
            },
            preSelectedCards.shift())
        );
    }

    return trials;
}
/*
 * @param numTrialsToBuild - the number of trials to build
 * @param cards - a reference to an Array of cards
 * The only difference between a probe trial and a regular trial is that a
 * probe trial does not display the output to the user
 */
function createProbeTrialsFromCards(numTrialsToBuild,cards){
    var trials = [];

    for(var i = 0;  i< numTrialsToBuild; i++){
        trials.push(
            new trial(cards.shift(),
                function(reactionTime,selectedCard,points,keyStroke){
                     outcomes.push(new outcome(reactionTime,selectedCard, points,
                        keyStroke));
                },
                function(points,locationClass, reactionTime){
                    
                    var timeOffset = 0;
                    if(reactionTime > 0){
                        timeOffset = 1000 - reactionTime;
                    }else{
                        timeOffset = 1000;
                    }
                    //set red border here
                    $('img:visible').each(
                        function(index){
                                if($(this).hasClass('selected') == false){
                                    $(this).selected({'color':'red'});
                                }
                        }
                    );
                    
                    //Hide the text on a delay.
                    //Reset the images
                                       
                    setTimeout("$('img:visible').hide()", 3500);
                    setTimeout("$('img').deselected().removeClass('selected')",
                                3501)   
                    //execute the next action
                    setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                           , 5000 - timeOffset);
                }
            )
        );
    }

    return trials;
}

function createBreakTrials(numTrialsToBuild){
    var trials = [];
    for(var i = 0; i < numTrialsToBuild; i++){
        trials.push(
            new breakTrial(
                $('p.timer-text'),
                function(){
                    action.prototype.isBusy = false;
                    var nextAction = new action();
                    nextAction.execute();
                }
            )
        );
    }
    return trials;
}

function createInstructionTrials(instructions){
    var trials = [];
    for(var i = 0; i < instructions.length; i++){
        trials.push(
            new instructionTrial(
                function(){},
                instructions[i]
            )
        );
    }
    return trials;
}
