
function getTokenAndTranslate(text) {

  var clientId = "steprobe_vocab"
  var clientSecret = "__________drogheda82"       //Not making this public

  var accessTokenRequest = new XMLHttpRequest()
  accessTokenRequest.onreadystatechange = function (data) {
    if(accessTokenRequest.status == 200 && accessTokenRequest.readyState == 4) {
      translateText(text, JSON.parse(accessTokenRequest.responseText)["access_token"])
    }
  }

  var url = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13'
  var postData = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret + "&scope=http://api.microsofttranslator.com"

  accessTokenRequest.open('POST', url, true)
  accessTokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  accessTokenRequest.send(postData)
}

function translateText(text, access_token) {

  var transReq = new XMLHttpRequest()
  transReq.onreadystatechange = function(transData) {
    if(transReq.status == 200 && transReq.readyState == 4) {
        stopSpinner();
        document.getElementById('translated_text').innerText = JSON.parse(transReq.responseText);
    }
  }

  var transUrl = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=Bearer " + encodeURIComponent(access_token) + "&from=es&to=en&text=" + encodeURIComponent(text);
  transReq.open('GET', transUrl, true)
  transReq.send()
}

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
