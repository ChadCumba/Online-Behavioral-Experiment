/* 
 * Chad Cumba
 * Chad.Cumba@mail.utexas.edu
 * Developed in the Poldrack Lab at the University of Texas at Austin
 *
 * This contains all the global event bindings for the document.
 */



//This is the event handler for keypresses
//any key pressed is saved and passed on
$(document).keydown(function(event){
    // event.keyCode will contain the value of the pressed key
    // u == 85, i == 73, o == 79, p == 80, spacebar == 32 (eg ASCII values)
    var myInit = new initialize();
    if(typeof(myInit.gameLoaded) != "undefined"
            && typeof(myInit.gameInitialized) != "undefined"){
        if (event.keyCode == 32 && myInit.gameLoaded && !myInit.gameInitialized){
            myInit.start();
        }else if(event.keyCode == 32 && myInit.gameLoaded && myInit.gameInitialized)
            {
                var myAction = new action();
                myAction.execute();
            }
    }
    
});

//this will only begin executing once all the images have loaded
//we need to wait to ensure that all graphics are up
$(window).load(function () {
        loadData();
    }
);
