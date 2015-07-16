// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails)  {
    if(pageDetails.summary == "") {
        document.getElementById('selected_text').innerText = "Please select some text";
        stopSpinner();
    }
    else {
        document.getElementById('selected_text').innerText = pageDetails.summary;
        startSpinner();
        getTokenAndTranslate(pageDetails.summary)
    }
}

function stopSpinner() {
    document.getElementById('loader').style.visibility = "hidden";
}

function startSpinner() {
    document.getElementById('loader').style.visibility = "visible";
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {

    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This injects
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("viewlist").addEventListener("click", viewList);
});

function viewList() {
    chrome.tabs.create({ url: "vocablist.html" });
}
