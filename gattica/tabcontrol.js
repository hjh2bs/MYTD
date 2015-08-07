
document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({currentWindow: true}, function(tabs){
        var tabcount = tabs.length;
        $('#count').html("Number of tabs open: " + tabcount);

    });
    $('#warning1').hide();

    chrome.runtime.getBackgroundPage(function(bg){

        $('#enableMYTD').prop('checked', bg.enable);
        $('#tablimit').val(bg.maxTab);

        if(bg.enable != true || !bg){
            $('#form1').hide();
        }


        document.querySelector('#enableMYTD').addEventListener('change', function(){

            if($('#enableMYTD').is(':checked')){
                bg.setEnable(true);
                $('#form1').show();
                $('#tablimit').val(bg.maxTab);
            }
            else{
                bg.setEnable(false);
                $('#form1').hide();
                $('#tablimit').val(bg.maxTab);
            }

        });

        $('#tablimit').keyup(function(){
            if($.isNumeric($('#tablimit').val())){
                bg.setMax($('#tablimit').val());
                $('#warning1').hide();
            }
            else{
                $('#warning1').show();
            }
        });

    });

});

