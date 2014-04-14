;(function($){

    function onSubmitClick($form){

        $form.find(':submit').one('click', function(){
            var $submitEl = $(this);
            if( $submitEl.attr('name') ){
                $form.append($('<input type="hidden">').attr({
                    name: $submitEl.attr('name'),
                    value: $submitEl.attr('value')
                }));
            }
        });

    }

    function onFormSubmit($form,settings){
        
        var form_data = $form.serialize();

        $form.on('submit', function(e){

            e.preventDefault();

            var $form = $(this),
                sData = $form.serialize(),
                action = $form.attr('action'),
                method = $form.attr('method');

            $.ajax({
                type: method,
                url: action,
                data: sData,
                success: function(data){

                    if(settings.successEvent) settings.successEvent(data);
                    if(settings.successCallback) settings.successCallback(data);

                },
                error: function(data){

                    if(settings.error_event) settings.error_event(data);
                    if(settings.error_callback) settings.error_callback(data);
                    
                }
            });

        });

    }
    
    $.fn.ajaxSubmitForm = function(options){

        var settings = $.extend({
            successEvent: false,
            successCallback: false,
            errorEvent: false,
            errorCallback: false
        }, options );

        return this.each(function(){

            var $form = $(this);
            
            onSubmitClick($form);

            onFormSubmit($form,settings);

        });
    
    };

}(jQuery));