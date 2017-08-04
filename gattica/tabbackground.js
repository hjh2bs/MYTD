


var enable = true;
var maxTab = 50;

function setEnable(bool){
    enable = bool;
}

function setMax(num){
    maxTab = num;
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