var file_text;

jQuery.ajax({
    url: '/get?path=file.html',
    async: false,
    success: function(result) {
        file_text = result;
    }
});

function main() {
    jQuery.get('/browse?path=/C:').then(function(data) {

    }
}

function cd(path) {
    
}

main();