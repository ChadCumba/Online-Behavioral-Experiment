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
function buildTrials(deck,condition,preSelectedCards){

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

    return trials;
}

/*
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
                function(points,locationClass){

                    //if they selected the right card
                    if(points > 0){
                        setTimeout(
                        "$('img.win-img').addClass('" +locationClass + "').show().selected();"
                        ,1001);
                        setTimeout(
                        "$('img.win-img').removeClass('" + locationClass + "').deselected().hide();",
                        1999
                        );
                    } else{
                        //if they selected the wrong card
                        if($('img:visible.selected').length > 0){
                            setTimeout("$('img:visible.selected').deselected().hide()", 1000);
                            setTimeout(
                            "$('img.lose-img').addClass('" +locationClass + "').show().selected();"
                            ,1001);
                            setTimeout(
                            "$('img.lose-img').removeClass('" + locationClass + "').deselected().hide();",
                            1999
                            );
                        }else{
                            //if they selected no card at all
                            setTimeout("$('img').hide()", 1000);
                            $('img.lose-img').clone().addClass('clone first-img').appendTo('div.img-block-inner').hide()
                            .clone().removeClass('first-img').addClass('second-img').appendTo('div.img-block-inner')
                            .clone().removeClass('second-img').addClass('third-img').appendTo('div.img-block-inner')
                            .clone().removeClass('third-img').addClass('fourth-img').appendTo('div.img-block-inner');
                            setTimeout("$('.clone').show();",1001);
                            setTimeout("$('.clone').remove();", 2000);
                        }
                    }
                    setTimeout("$('img:visible').deselected().hide()", 2000);
                    //execute the next action
                    setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                           , 2500);
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
            function(points,locationClass){

                if(points > 0){
                        setTimeout(
                        "$('img.win-img').addClass('" +locationClass + "').show().selected();"
                        ,1001);
                        setTimeout(
                        "$('img.win-img').removeClass('" + locationClass + "').deselected().hide();",
                        1999
                        );
                    } else{
                        //if they selected the wrong card
                        if($('img:visible.selected').length > 0){
                            setTimeout("$('img:visible.selected').deselected().hide()", 1000);
                            setTimeout(
                            "$('img.lose-img').addClass('" +locationClass + "').show().selected();"
                            ,1001);
                            setTimeout(
                            "$('img.lose-img').removeClass('" + locationClass + "').deselected().hide();",
                            1999
                            );
                        }
                    }
                setTimeout("$('img:visible.selected').deselected()", 1000);
                setTimeout("$('img:visible').deselected().hide()", 2000);
                //execute the next action
                setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                       , 2500);
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
                function(points,locationClass){
                    //Hide the text on a delay.
                    //Reset the images
                    setTimeout("$('img:visible.selected').deselected()", 1000);
                    setTimeout("$('img:visible.selected').hide()",1000);
                    setTimeout("$('img:visible').hide()", 2000);
                    //execute the next action
                    setTimeout("action.prototype.isBusy = false; var nextAction = new action(); nextAction.execute();"
                           , 2500);
                }
            )
        );
    }

    return trials;
}