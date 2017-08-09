//Script that runs whenever tabcontrol.html is loaded

//parameterize this data


document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({currentWindow: true}, function(tabs){
        var tabcount = tabs.length;
        $('#count').html("Number of tabs open: " + tabcount);

        //**add functionality to get all tabs, then organize tabs
        //based on url

        var urls = tabs.map(function(tab) {
            return tab.url;
        });

        console.log(urls);

        websites = [];
        for (index in urls){
            //console.log(urls[url]);
            var s = urls[index].substring(urls[index].indexOf('://')+3, urls[index].indexOf('/', urls[index].indexOf('://')+3));
            websites.push(s);
        }
        console.log(websites);

        //wesites contain the websites on all tabs in current window
        //Organize these website names into dictionary and count them
        //Then, make a graph based on this information

        var website_count = {};
        for (index in websites){
            if (websites[index] in website_count){
                website_count[websites[index]] += 1;
            }
            else {
                website_count[websites[index]] = 1;
            }
        }
        console.log(website_count);

        //Input the count into a graph

        

    });
    $('#warning1').hide();


    chrome.runtime.getBackgroundPage(function(bg){
        //Grab initial values from tabbackground.js
        //**add functionality to grab values from storage
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

