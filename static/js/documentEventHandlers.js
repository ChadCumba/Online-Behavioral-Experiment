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
        //here we create a locking AJAX call to get the JSON objects that
        //define the parameters of the game
        //Since it's blocking it should probably be called a JAX call ;]
        //actually it's not really using XML either.
         var jsondata = $.ajax({
            async: false,
            global: false,
            url: '/game/loaddata/',
            cache: false,
            dataType: "json"
        });

        var gameobjects = $.parseJSON(jsondata.responseText);


        var matlabMatrices = [];
        matlabMatrices.push(gameobjects.game_json);
        matlabMatrices.push(gameobjects.ao_new);
        matlabMatrices.push(gameobjects.ao_train);
        matlabMatrices.push(gameobjects.so_new);

        //this would be better implemented in the signal slot design pattern
        /*
         * Here we hand the initialize objects the matrices, and set it's state
         */
        initialize.prototype.matlabMatrices = matlabMatrices;
        initialize.prototype.gameLoaded = true;
        initialize.prototype.gameInitialized = false;


        $('p.loading-text').html('Press spacebar to continue');
    }
);
