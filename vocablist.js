chrome.storage.local.get({vocab: []}, function (result) {

    var rows = [];
    $.each(result.vocab, function(i, item) {

        $('#vocab_table').append( '<tr id="row' + i + '"><td>' + item.english + '</td><td>' + item.spanish + '</td></tr>' );
        var deleteBtn = document.createElement('button')
        deleteBtn.className = "btn btn-default"

        var trashIcon = document.createElement('span')
        trashIcon.className = "glyphicon glyphicon-trash"

        deleteBtn.appendChild(trashIcon)
        deleteBtn.onclick = function() {

            result.vocab.splice(i, 1)
            chrome.storage.local.set({"vocab": result.vocab}, function() {
                $('#row' + i).remove()
            });
        }

        var tableEl = document.createElement('td')
        tableEl.style.textAlign = "center"
        tableEl.appendChild(deleteBtn)

        $('#row' + i).append(tableEl)
     });

     //$('#vocab_table tr:last').after(rows.join(""));
});
