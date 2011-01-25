//$('img.first-img').qtevent({ keys:["a","b"], success: function() {alert('yea')}, fail: function() {alert('no')}, when: "mouseover" } );

(function($) {

    $.fn.countdown = function(options) {
        
        var defaults = {
            trial: {},
            time: 1,
            keys: new Array(),
            success: function(keyStroke) { return keyStroke;},
            fail: function(keyStroke) { return keyStroke;}
        };

        var settings = $.extend({}, defaults, options);
       
        var interval = undefined; // Interval var
        var solved = 0; // Time for solving

        this.each(function() {

                var keys = settings.keys;

                var start = new Date().getTime();

                $(document).bind("keydown.countdown", function(event) {
                    checkKey(event, keys, start)
                });
                interval = setInterval(function() {
                    checkEvent(start);
                }, 10);
        });

        

        function checkEvent(start)
        {
            var now = new Date().getTime();
            
            if ((now - start) >= settings.time * 1000)
            {
                solved = 0;
                
                clearInterval(interval);
                $(document).unbind("keydown.countdown");

                resolve('');
            }

        }

        function checkKey(event, keys, start)
        {
            var key = String.fromCharCode(event.keyCode);

            for(var i = 0; i < keys.length; i++){
                if (key.toUpperCase() == keys[i].toUpperCase())
                {
                    var now = new Date().getTime();
                    solved = now - start;

                    clearInterval(interval);
                    $(document).unbind("keydown.countdown");

                    resolve(key);
                }
            }

            
        }

        function resolve(keyStroke)
        {
            if (solved > 0)
            {
                settings.success.call(this,keyStroke, solved, settings.trial);
            }
            else
            {
                settings.fail.call(this,keyStroke,settings.trial);
            }
        }


        return this;
    };

})(jQuery);

