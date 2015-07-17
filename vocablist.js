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
});
