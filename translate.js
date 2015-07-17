function getTokenAndTranslate(text) {

  console.log("Translatig " + text)

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

        chrome.storage.local.get({"vocab": []}, function (result) {
            var vocabresult = result.vocab;
            vocabresult.push({"source": JSON.parse(transReq.responseText), "dest": text });

            chrome.storage.local.set({"vocab": vocabresult}, function() {
            });
        });
    }
  }

  var transUrl = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=Bearer " + encodeURIComponent(access_token) + "&from=es&to=en&text=" + encodeURIComponent(text);
  transReq.open('GET', transUrl, true)
  transReq.send()
}