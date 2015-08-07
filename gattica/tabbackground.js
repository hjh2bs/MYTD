


var enable = false;
var maxTab = 10;

function setEnable(bool){
    enable = bool;
}

function setMax(num){
    maxTab = num;
}

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