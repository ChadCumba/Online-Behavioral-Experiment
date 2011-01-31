/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 */


function outcome(reaction,card,myValue,myKeyStroke,myProbability){
    this.reactionTime = reaction;
    this.selectedCard = card;
    this.pointValue = myValue;
    this.keyStroke = myKeyStroke;
    this.probability = myProbability;

    function determineLocation(keyStroke){
        if(keyStroke == null){
          keyStroke = 'x';
        }
        switch(keyStroke.toLowerCase()){
            case 'u':
                return 1;
            case 'i':
                return 2;
            case 'o':
                return 3;
            case 'p':
                return 4;
            default:
                return 0;
        }
    }

    this.cardLocation = determineLocation(myKeyStroke);

    function determineWinLoss(value){
        if(value > 0){
            return true;
        }
        return false;
    }

    this.didUserWin = determineWinLoss(myValue);
}
