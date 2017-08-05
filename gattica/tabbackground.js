


var enable = true;
var maxTab = 50;

var storage = chrome.storage.local;


storage.get('mytd_tab_enabled', function(value){
    var content = Object.values(value)
    //console.log(content[0])
    if (content[0] == false){
        enable = false;
    }
    else{
        enable = true;
    }
});

storage.get('mytd_max_tab', function(value){
    var content = Object.values(value)
    if (content[0]==undefined){
        maxTab = 50;
    }
    else{
        maxTab = content[0]
    }
})



function setEnable(bool){
    enable = bool;
    storage.set({'mytd_tab_enabled':bool}, function(){
        console.log(bool)
    });
}

function setMax(num){
    maxTab = num;
    storage.set({'mytd_max_tab':num},function(){
        console.log(num)
    });


}


//runs when tabs are created
chrome.tabs.onCreated.addListener(function(){

    if(enable){
        chrome.tabs.query({currentWindow: true}, function(tabs){

            var tabcount = tabs.length;
            if(tabcount > maxTab){
                chrome.tabs.remove(tabs[tabs.length-1].id)

            }

        });
    }
});