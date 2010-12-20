/*
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */


function trial(cards, saveDataCallback, trialCompleteCallback ){

    this.myCards = cards;

    this.saveData = saveDataCallback;

    this.trialComplete = trialCompleteCallback;

    this.displayTrial = function(cards){
        
        $(cards[0].image).attr('style','')
            .removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
                .addClass('first-img '+cards[0].backgroundClass).show();
        $(cards[1].image).attr('style','')
            .removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
                .addClass('second-img '+cards[1].backgroundClass).show();
        $(cards[2].image).attr('style','')
            .removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
                .addClass('third-img '+cards[2].backgroundClass).show();
        $(cards[3].image).attr('style','')
            .removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
                .addClass('fourth-img '+cards[3].backgroundClass).show();
        $('.win-img').removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
            .addClass(cards[3].backgroundClass);
        $('.lose-img').removeClass('first-img second-img third-img fourth-img green-bg orange-bg purple-bg')
            .addClass(cards[3].backgroundClass);
    }

    this.runTrial = function(){

        currentCards = this.myCards;
        //these are now card objects
        this.displayTrial(this.myCards);

        trialComplete = this.trialComplete;
        saveData = this.saveData;

        //jquery callback to the countdown quiz
        $('div.img-block-inner').countdown({
            keys: ["u","i", "o","p"],
            success: function(keyStroke, reactionTime, trial){
                var selectedCard = 0;
                var points = 0;
                var imageClass;
                //user has hit a button within the time limit
                switch (keyStroke.toLowerCase()){
                    case "u":
                        $(currentCards[0].image).selected();
                        points = currentCards[0].pointValue();
                        imageClass = 'first-img';
                        break;
                    case "i":
                        $(currentCards[1].image).selected();
                        selectedCard = 1;
                        points = currentCards[1].pointValue();
                        imageClass = 'second-img';
                        break;
                    case "o":
                        $(currentCards[2].image).selected();
                        selectedCard = 2;
                        points = currentCards[2].pointValue();
                        imageClass = 'third-img';
                        break;
                    case "p":
                        $(currentCards[3].image).selected();
                        selectedCard = 3;
                        points = currentCards[3].pointValue();
                        imageClass = 'fourth-img';
                        break;

                }
                //save the data in the outcomes array

                saveData(reactionTime,
                    $(currentCards[selectedCard].image).attr('src').split('/').pop().split('.').shift()
                    ,points,keyStroke,$(currentCards[selectedCard].image)
                );
                //Show the user the points they won
                trialComplete(points,imageClass);
            },
            fail: function(keyStroke) {

                saveData(-1,-1,-5,'x', $(currentCards[0].image));
                //user has not hit a button in the time limit
                trialComplete(-5, 'first-img');
            }
        });
    }

}