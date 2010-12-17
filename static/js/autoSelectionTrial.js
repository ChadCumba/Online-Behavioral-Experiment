


function autoSelectionTrial(cards, saveDataCallback,
    trialCompleteCallback, preselectedCard ){

  //extend the trial class
  trial.apply(this,[cards,saveDataCallback,trialCompleteCallback]);
  
  
  this.preselectedCard = preselectedCard;

  //we need to run the trial slightly differently since we're selecting the card
  //for the user. Hence we re-implement the runTrial function.
  this.runTrial = function(){

        //We're globalizing these variables so that they're available to the
        //callback
        currentCards = this.myCards;
        //these are now card objects
        this.displayTrial(this.myCards);

        //bind the passed in params into the local closure
        trialComplete = this.trialComplete;
        saveData = this.saveData;
        selectedCard = this.preselectedCard;

        //jquery callback to the countdown quiz
        $('div.img-block-inner').countdown({
            keys: [],
            success: function(keyStroke, reactionTime, trial){
            },
            fail: function(keyStroke) {

                $(currentCards[selectedCard-1].image).selected();
                var points = currentCards[selectedCard-1].pointValue();
                
                switch (selectedCard-1){
                    case 0:
                        imageClass = 'first-img';
                        break;
                    case 1:
                        imageClass = 'second-img';
                        break;
                    case 2:
                        imageClass = 'third-img';
                        break;
                    case 3:
                        imageClass = 'fourth-img';
                        break;
                }
                saveData(-1,selectedCard, points,keyStroke);
                //user has not hit a button in the time limit
                trialComplete(points, imageClass);
            }
        });
  }

}

