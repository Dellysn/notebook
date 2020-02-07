module.exports = {
    parseHTML: function (input) {
        document.querySelectorAll(".note-body").forEach(function (noteBody) {
            noteBody.innerHTML = input;
        })



    }
}