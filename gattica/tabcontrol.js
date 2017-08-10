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
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
        

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

