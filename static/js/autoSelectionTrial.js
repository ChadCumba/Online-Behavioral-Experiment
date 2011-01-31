


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
        
        

        
        trialComplete = this.trialComplete;
        saveData = this.saveData;
        selectedCard = this.preselectedCard;
        $(currentCards[selectedCard-1].image).selected({'color':'blue'});
        
        var correctKey = "";
        switch(selectedCard-1){
            case 0:
                correctKey = "u";
                break;
            case 1:
                correctKey = "i";
                break;
            case 2:
                correctKey = "o";
                break;
            case 3:
                correctKey = "p";
                break;
        }

        //jquery callback to the countdown quiz
        $('div.img-block-inner').countdown({
            keys: [correctKey],
            success: function(keyStroke, reactionTime, trial){
                
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
                saveData(reactionTime,
                  $(currentCards[selectedCard-1].image).attr('src').split('/').pop().split('.').shift(),
                  points,keyStroke, currentCards[selectedCard-1].probability
                );
                //user has not hit a button in the time limit
                trialComplete(points, imageClass, true);
            },
            fail: function(keyStroke) {

                saveData(-1,
                  -1,
                  -5,keyStroke, 'no selection'
                );
                //user has not hit a button in the time limit
                trialComplete(-5, 'first-img', false);
            }
        });
  }

}

