(function($) {

    $.fn.timer = function(options) {
        
        var defaults = {
            time: 5,
            timerCompleteCallback: function(){},
        };

        var settings = $.extend({}, defaults, options);
        var ms_length = 1000;
       
        this.each(function() {
            for(var i = 0; i < settings.time; i++){
                timeoutString = '$("'+ $(this).context.nodeName +'.'
                    + $(this).context.className
                    +'").html("' +(settings.time - i)+ '");';
                setTimeout(
                    timeoutString
                    ,i * ms_length);
            }
            setTimeout(
                '$("'+ $(this).context.nodeName +'.'
                    + $(this).context.className+'").html("");',
                settings.time * ms_length
            );
            
            $(document).bind('timer.is.complete',
                {time: settings.time},
                settings.timerCompleteCallback
            );
            
            setTimeout('$(document).trigger("timer.is.complete");',
                settings.time * ms_length
            );
        });
        
        return this;
    };

})(jQuery);