//Chad Cumba
//Chad.Cumba@mail.utexas.edu
//Developed in the Poldrack Lab at the University of Texas at Austin

(function( $ ){

  /*
   * valid options are thickness, style, and color each of which correspond
   * to the border css property. eg border: thickness style color
   */
  $.fn.selected = function( options ) {

    return this.each(function() {
        //this in scope is the actual calling object
        //wrap this in a jquery wrapper so that we can call jq functions on
        //it
        $this = $(this);
        var settings = {
            'thickness' : '10px',
            'style'     : 'solid',
            'color'     : 'yellow',
            'fixMargin' : false
        };
      
        // If options exist, lets merge them
        // with our default settings
        if ( options ) {
            $.extend( settings, options );
        }

        $this.css('border',settings.thickness+" "+settings.style
                +" "+settings.color);
        $this.show(); //just to confirm that the item is visible

        $this.addClass("selected");


        var leftMargin = $this.css('margin-left');
        var rightMargin = $this.css('margin-right');
        var topMargin = $this.css('margin-top');
        var marginReduction = settings.thickness;
        //remove the px postfix and convert the string to an int
        marginReduction = parseInt(marginReduction.slice(0,marginReduction.length-2));
        //convert to negative as we want to reduce the margins by
        //the thickness to accomodate the border
        marginReduction = marginReduction * -1;
        if(settings.fixMargin){
            alterTopLeftRightMargins(marginReduction);
        }
        

        //change the margins on the top to match the border being applied
        //param amount - int containing the number of pixels to change
        function alterTopLeftRightMargins(amount){

            var leftMargin = $this.css('margin-left');
            var rightMargin = $this.css('margin-right');
            var topMargin = $this.css('margin-top');

            //remove the px postfix and convert the string to an int
            leftMargin = parseInt(leftMargin.slice(0,leftMargin.length-2));
            rightMargin = parseInt(rightMargin.slice(0,rightMargin.length-2));
            topMargin = parseInt(topMargin.slice(0,topMargin.length-2));

            //correct the margins and spacing by subtracting the borders from the
            //margins. Note that this can produce a negative margin, which will
            //simply cause the border to flash on top of adjacent elements.
            leftMargin = leftMargin + amount;
            rightMargin = rightMargin + amount;
            topMargin = topMargin + amount;

            $this.css('margin-left', leftMargin+"px");
            $this.css('margin-right', rightMargin+"px");
            $this.css('margin-top', topMargin+"px");
        }

    });

  };
})( jQuery );


(function( $ ){

  /*
   * valid options are thickness, style, and color each of which correspond
   * to the border css property. eg border: thickness style color
   */
  $.fn.deselected = function( options ) {

    return this.each(function() {
        //this in scope is the actual calling object
        //wrap this in a jquery wrapper so that we can call jq functions on
        //it
        $this = $(this);
        var settings = {
            'thickness' : '10px',
            'style'     : 'solid',
            'color'     : 'black',
            'fixMargin' : false
        };

        // If options exist, lets merge them
        // with our default settings
        if ( options ) {
            $.extend( settings, options );
        }

        $this.css("border",settings.thickness+" "+settings.style
                +" "+settings.color);
        $this.removeClass("selected");



        var marginIncrease = settings.thickness;
        //remove the px postfix and convert the string to an int
        marginIncrease = parseInt(marginIncrease.slice(0,marginIncrease.length-2));
        if(settings.fixMargin){
            alterTopLeftRightMargins(marginIncrease);
        }
        

        //change the margins on the top to match the border being applied
        //param amount - int containing the number of pixels to change
        function alterTopLeftRightMargins(amount){

            var leftMargin = $this.css('margin-left');
            var rightMargin = $this.css('margin-right');
            var topMargin = $this.css('margin-top');

            //remove the px postfix and convert the string to an int
            leftMargin = parseInt(leftMargin.slice(0,leftMargin.length-2));
            rightMargin = parseInt(rightMargin.slice(0,rightMargin.length-2));
            topMargin = parseInt(topMargin.slice(0,topMargin.length-2));

            //correct the margins and spacing by subtracting the borders from the
            //margins. Note that this can produce a negative margin, which will
            //simply cause the border to flash on top of adjacent elements.
            leftMargin = leftMargin + amount;
            rightMargin = rightMargin + amount;
            topMargin = topMargin + amount;

            $this.css('margin-left', leftMargin+"px");
            $this.css('margin-right', rightMargin+"px");
            $this.css('margin-top', topMargin+"px");
        }

    });

  };
})( jQuery );