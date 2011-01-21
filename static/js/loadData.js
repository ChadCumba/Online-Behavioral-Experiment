function loadData() {
        //here we create a locking AJAX call to get the JSON objects that
        //define the parameters of the game
        //Since it's blocking it should probably be called a JAX call ;]
        //actually it's not really using XML either. JAJ?
        var jsondata = $.ajax({
            async: false,
            global: false,
            url: '/game/loaddata/',
            cache: false,
            dataType: "json"
        });
        
        var instructionData = $.ajax({
            async: false,
            global: false,
            url: '/instructions/ingameinstructions',
            cache: false,
            dataType: "json",
        });
        
        var instructionObjects = $.parseJSON(instructionData.responseText);

        var gameobjects = $.parseJSON(jsondata.responseText);

        if(gameobjects.error != null){
            alert(gameobjects.error);
            throw "fatal error";
        }

        var matlabMatrices = [];
        matlabMatrices.push(gameobjects.game_json);
        matlabMatrices.push(gameobjects.ao_new);
        matlabMatrices.push(gameobjects.ao_train);
        matlabMatrices.push(gameobjects.so_new);
        matlabMatrices.push(gameobjects.condition);

        
        //this would be better implemented in the signal slot design pattern
        /*
         * Here we hand the initialize objects the matrices, and set it's state
         */
        initialize.prototype.matlabMatrices = matlabMatrices;
        initialize.prototype.gameLoaded = true;
        initialize.prototype.gameInitialized = false;
        initialize.prototype.instructions = instructionObjects;

        $('p.loading-text').html('Press spacebar to continue');
}
