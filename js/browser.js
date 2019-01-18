var options = {

    "bProcessing": true,
    "bServerSide": false,
    "bPaginate": false,
    "bAutoWidth": false,
    "pageResize": true,
    "searching": false,
    "scrollCollapse": true,

    "fnCreatedRow" : function(nRow, aData, iDataIndex) {
        setAction(nRow, aData);
    },

    columns: [
        {"title": "Name", data: 'name'},
        {"title": "Date modified", data: 'date'},
        {"title": "Type", data: 'ext'},
        {"title": "Size", data: 'size'}
    ]
}

var table = $('.files').dataTable(options);
var Browser = {
    currentPath: '',

    /*
     * Sets current path to argument and updates table
     */
    jumpTo: function(absolutePath) {
        jQuery.get(absolutePath).then(function(data) {
            currentPath = absolutePath;
            console.log(currentPath);
            table.fnClearTable();
            table.fnAddData(data);
        });
    },

    /*
     * Moves one level up or down based on argument
     */
    changeDirectory: function(path) {
        currentPath += '/' + path;
        this.jumpTo(currentPath);
    },

    init: function() {
        this.jumpTo('/browse?path=/C:');
    }
}
Browser.init();
/*
var table = $('.files').dataTable(options);

jQuery.get('/browse?path=/C:').then(function(data) {
    table.fnClearTable();
    table.fnAddData(data);
});

var currentPath = "";


function changeDirectory(path) {

}

function jumpTo(absolutePath) {
    
}
*/
function setAction(element, data) {

    if(!data.isDirectory) {
        $(element).bind("click", function(e) {
            jQuery.get('/open?path=' + data.path).then(function(data) {
                addFormattedWindow(data);
            });
        });
    }
    else {
        $(element).bind("click", function(e) {
            Browser.jumpTo(data.parent + "/" + data.name);
            e.preventDefault();
        });
    }
}