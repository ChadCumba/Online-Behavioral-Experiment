function breakTrial(htmlNode,trialCompleteCallback){
    trial.apply(this, ['',function(){},trialCompleteCallback]);
    
    this.htmlNode = htmlNode;
    
    this.runTrial = function() {
        $(this.htmlNode).timer(
            {
                time:10,
                timerCompleteCallback: trialCompleteCallback,
            }
        ).show();
    }
}
