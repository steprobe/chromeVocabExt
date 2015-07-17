ko.bindingProvider.instance = new ko.secureBindingsProvider();

var VocabModel = function(vocab) {
    var self = this;
    self.vocab = ko.observableArray(vocab);

    self.addVocab = function() {
        self.vocab.push({
            english: "",
            spanish: ""
        });
    };

    self.removeVocab = function(vocab) {
        self.vocab.remove(vocab);
        chrome.storage.local.set({ "vocab": self.vocab() }, function() {
            console.log("Deleted");
        });
    };
};

chrome.storage.local.get({vocab: []}, function (result) {

console.log(result);
    var viewModel = new VocabModel(result.vocab)
    ko.applyBindings(viewModel);

    // var rows = [];
    // $.each(result.vocab, function(i, item) {

    //     $('#vocab_table').append( '<tr id="row' + i + '"><td>' + item.english + '</td><td>' + item.spanish + '</td></tr>' );
    //     var deleteBtn = document.createElement('button')
    //     deleteBtn.className = "btn btn-default"

    //     var trashIcon = document.createElement('span')
    //     trashIcon.className = "glyphicon glyphicon-trash"

    //     deleteBtn.appendChild(trashIcon)
    //     deleteBtn.onclick = function() {

    //         setButtonProperties("disabled", true)

    //         result.vocab.splice(i, 1)
    //         chrome.storage.local.set({"vocab": result.vocab}, function() {
    //             $('#row' + i).remove()
    //             setButtonProperties("disabled", false)
    //         });
    //     }

    //     var tableEl = document.createElement('td')
    //     tableEl.style.textAlign = "center"
    //     tableEl.appendChild(deleteBtn)

    //     $('#row' + i).append(tableEl)
    //  });

     //$('#vocab_table tr:last').after(rows.join(""));
});
