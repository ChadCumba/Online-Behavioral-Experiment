/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */


function initialize(){
    this.start = function() {
        //init the game here
        var images = [];
        var blockSize = 20;
        var numberBlocks = 12;
        var condition = 3;

        //this.matlabMatrices contains the ported matlab
        //data structures in the following order:
        // 0 - stackprep_CD
        // 1 - AONew
        // 2 - AOTrain
        // 3 - SONew
        // 4 - condition of the row that this all came from
        if(typeof(this.matlabMatrices) == "undefined"){
            throw "Matlab data not set";
        }

        //matlabMatrices constants
        var stackPrepCD = 0;
        var AONew = 1;
        var AOTrain = 2;
        var SONew = 3;
        var game_condition = 4;
        
        condition = this.matlabMatrices[game_condition];

        //load the images from the hidden div into stimulus objects
        $('img.card-img').each(function(){images.push($(this))});
        var AONewImages = [];
        var AOTrainImages = [];
        var SONewImages = [];

        //if these data structures aren't the same length, kill execution
        //as it's unrecoverable
        if((this.matlabMatrices[AONew].length != this.matlabMatrices[AOTrain].length) ||
            this.matlabMatrices[AOTrain].length != this.matlabMatrices[SONew].length)
            throw "matlab data structures are wrong size";

        /*
         * this.matlabMatrices[1 - 3].features is a matrix composed of what
         * feature to display at what point in the stack
         * It is dereferenced by this.matlabMatrices[N].features[block][trial][location]
         */
        //For each block
        for(var i = 0; i < this.matlabMatrices[AONew].features.length; i++){
            AONewImages.push(new Array());
            AOTrainImages.push(new Array());
            SONewImages.push(new Array());

            //For each trial
            for(var k = 0; k < this.matlabMatrices[AONew].features[i].length; k++){
                AONewImages[i].push(new Array());
                AOTrainImages[i].push(new Array());
                SONewImages[i].push(new Array());

                //For each location
                for(var j = 0; j < this.matlabMatrices[AONew].features[i][k].length; j++){
                    AONewImages[i][k].push( this.matlabMatrices[AONew].imgset[0][
                        this.matlabMatrices[AONew].features[i][k][j] - 1
                    ]);
                    AOTrainImages[i][k].push( this.matlabMatrices[AOTrain].imgset[0][
                        this.matlabMatrices[AOTrain].features[i][k][j] - 1
                    ]);
                    SONewImages[i][k].push(this.matlabMatrices[SONew].imgset[0][
                        this.matlabMatrices[SONew].features[i][k][j] - 1
                    ]);
                }
            }
        }

        //At this point AONewImages is now a nested matrix composed of what image to
        //display at what time in the game for AOnew only
        //same with each other
        //to dereference, we'll call AONewImages[block][trial][location]. That will
        //give us the number of the image to display at that location for that block
        //and that trial.

        AONewCardStack = [];
        AOTrainCardStack = [];
        SONewCardStack = [];

        AONewCDCardStack = [];
        AOTrainCDCardStack = [];
        SONewCDCardStack = [];

        var stackPointer = null;
        //for each location
        for( i = 0; i < numberLocations; i++){
            AONewCardStack.push(new Array());
            AOTrainCardStack.push(new Array());
            SONewCardStack.push(new Array());

            AONewCDCardStack.push(new Array());
            AOTrainCDCardStack.push(new Array());
            SONewCDCardStack.push(new Array());

            //for each block
            for ( j = 0; j < numberBlocks; j++){
                //for each trial
                for(k = 0; k < blockSize; k++){
                    //push the loc pointer for that location
                    //and the image saved in the images array
                    stackPointer = this.matlabMatrices[stackPrepCD].stacksLOC2;
                    AONewCardStack[i].push(
                        new cardStimulus( i, stackPointer, images[AONewImages[j][k][i]-1],
                            this.matlabMatrices[AONew].plocs[j][k][i]
                        )
                    );
                    stackPointer = this.matlabMatrices[stackPrepCD].stacksLOC1;
                    AOTrainCardStack[i].push(
                        new cardStimulus(i, stackPointer, images[AOTrainImages[j][k][i]-1],
                            this.matlabMatrices[AOTrain].plocs[j][k][i]
                        )
                    );
                    stackPointer = this.matlabMatrices[stackPrepCD].stacksFEA;
                    SONewCardStack[i].push(
                        new cardStimulus(i, stackPointer, images[SONewImages[j][k][i]-1],
                            this.matlabMatrices[SONew].plocs[j][k][i]
                        )
                    );

                    /*
                     * the 2nd to last blocks are contingency deg blocks, and need
                     * to be given special stack pointers and special ploc values
                     */
                    if(numberBlocks - 2 == j){
                        stackPointer = this.matlabMatrices[stackPrepCD].stacksCD;
                        AONewCDCardStack[i].push(
                            new cardStimulus( i, stackPointer, images[AONewImages[j][k][i]-1],
                                'contingency degredation'
                            )
                        );
                        AOTrainCDCardStack[i].push(
                            new cardStimulus( i, stackPointer, images[AOTrainImages[j][k][i]-1],
                                'contingency degredation'
                            )
                        );
                        SONewCDCardStack[i].push(
                            new cardStimulus(i, stackPointer, images[SONewImages[j][k][i]-1],
                                'contingency degredation'
                            )
                        );
                    }

                }
            }
        }

        var contingencyDegredationBlocks = {AONew: AONewCDCardStack, AOTrain:
            AOTrainCDCardStack, SONew: SONewCDCardStack};

        //This dereferences the randomized backgrounds matrix into the actual
        //colors that we want to show the user.
        //eg it alters backgrounds from the form backgrounds[0] = [ 1 2 3 4 ] to
        //backgrounds[0] = [ 'green-bg', 'purple-bg', 'orange-bg' ]
        for(i = 0; i < this.matlabMatrices[stackPrepCD].backgrounds[0].length; i++){
            switch(this.matlabMatrices[stackPrepCD].backgrounds[0][i]){
                case 1:
                    this.matlabMatrices[stackPrepCD].backgrounds[0][i] = 'green-bg';
                    break;
                case 2:
                    this.matlabMatrices[stackPrepCD].backgrounds[0][i] = 'purple-bg';
                    break;
                case 3:
                    this.matlabMatrices[stackPrepCD].backgrounds[0][i] = 'orange-bg';
                    break;
            }
        }


        AOTrainCardStack = setCardStackBackground(AOTrainCardStack,
            this.matlabMatrices[stackPrepCD].backgrounds[0][0]);
        AONewCardStack = setCardStackBackground(AONewCardStack,
            this.matlabMatrices[stackPrepCD].backgrounds[0][1]);
        SONewCardStack = setCardStackBackground(SONewCardStack,
            this.matlabMatrices[stackPrepCD].backgrounds[0][2]);

        //Set the backgrounds for the contingency deg blocks
        contingencyDegredationBlocks.AOTrain = setCardStackBackground(
            contingencyDegredationBlocks.AOTrain, this.matlabMatrices[stackPrepCD].backgrounds[0][0]);
        contingencyDegredationBlocks.AONew = setCardStackBackground(
            contingencyDegredationBlocks.AONew, this.matlabMatrices[stackPrepCD].backgrounds[0][1]);
        contingencyDegredationBlocks.SONew = setCardStackBackground(
            contingencyDegredationBlocks.SONew, this.matlabMatrices[stackPrepCD].backgrounds[0][2]);

        //at this point each of the card stacks is a 2D array
        //rows are the locations
        //cols are all the cards for that loc for the entire game.
        //since the blocks are in batches of 20, we can simply grab the next
        //20 cards as we need them.
        var deck = setDeckByCondition(condition,AOTrainCardStack,AONewCardStack,
            SONewCardStack, contingencyDegredationBlocks);

        var preSelectedCards = [];
        for(i = 0; i < numberBlocks/2; i++){
            preSelectedCards = preSelectedCards.concat(
                this.matlabMatrices[stackPrepCD].trialcardFEA[i]);
        }
        

        instructionQueue = [];
        for(var i = 0; i < this.instructions.length; i++){
            instructionQueue.push(
                new instruction(
                    this.instructions[i],
                    $('p.instruction-text')
                )
            );
        }
        var trials = buildTrials(deck,condition,preSelectedCards,instructionQueue);

        initialize.prototype.gameInitialized = true;
        action.prototype.blockLength = blockSize;
        action.prototype.numberBlocks = numberBlocks;
        action.prototype.instructions = instructionQueue;
        action.prototype.numberBreaks = 11;
        main(trials);
    }
}

function setCardStackBackground(cardStack,background){

    for(var i = 0; i < cardStack.length; i++){
        for(var j = 0; j < cardStack[i].length; j++){
            cardStack[i][j].backgroundClass = background;
        }
    }

    return cardStack;
}

/*
 * @param condition - the deck condition 1 - 6
 * @param AOTrain - The card stack that represents the train cards
 * @param AONew - The card stack that represents the AOnew cards
 * @param SONew - the card stack that represents the image base cards
 * @param stacksCD - an object containing the contingecy degredation stack for
 *                   each of the previous 3 params
 */
function setDeckByCondition(condition,AOTrain,AONew,SONew,stacksCD){
    var deck = new Array(numberLocations);


    if(stacksCD.AOTrain[0].length != thirdBatchSize || stacksCD.AONew[0].length !=
        thirdBatchSize || stacksCD.SONew[0].length != thirdBatchSize){
        throw ('Stacks CD should contain 3 arrays each of length ' +
            thirdBatchSize);
    }

    var j = 0;
    var k = 0;
    for( j = 0; j < deck.length; j++){
        deck[j] = AOTrain[j].slice(0,firstBatchSize);
    }

    switch(condition){
        case 1:
            for(j = 0; j < deck.length; j++){
                deck[j] = deck[j].concat(AOTrain[j].slice(firstBatchSize,
                    firstBatchSize + secondBatchSize));
                deck[j] = deck[j].concat(stacksCD.AOTrain[j]);
                deck[j] = deck[j].concat(AOTrain[j].slice(
                    firstBatchSize + secondBatchSize + thirdBatchSize));
            }
            break;
        case 2:
            for(j = 0; j < numberLocations; j++){
                deck[j] = deck[j].concat(AONew[j].slice(0,secondBatchSize));
                deck[j] = deck[j].concat(stacksCD.AONew[j]);
                deck[j] = deck[j].concat(AONew[j].slice(secondBatchSize,
                    secondBatchSize + thirdBatchSize));
            }
            break;
        case 3:
            for(j = 0; j < numberLocations; j++){
                deck[j] = deck[j].concat(SONew[j].slice(0,secondBatchSize));
                deck[j] = deck[j].concat(stacksCD.SONew[j]);
                deck[j] = deck[j].concat(SONew[j].slice(secondBatchSize,
                    secondBatchSize + thirdBatchSize));
            }
            break;
        case 4:
            for(j = 0; j < numberLocations; j++){
                deck[j].concat(AOTrain[j].slice(firstBatchSize));
            }
            break;
        case 5:
            for(j = 0; j < numberLocations; j++){
                deck[j].concat(AONew[j].slice(firstBatchSize));
            }
            break;
        case 6:
            for(j = 0; j < numberLocations; j++){
               deck[j].concat(SONew[j].slice(firstBatchSize));
            }

            break;
        default:
            throw('Invalid condition in setDeckByCondition');
            break;
    }

    if(deck[0].length != (firstBatchSize + secondBatchSize + thirdBatchSize
            + finalBatchSize) ){
        throw('Deck is not correct length in setDeckByCondition');
    }
    return deck;
}
