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
    history: new LinkedList(),

    /*
     * Sets current path to argument and updates table
     */
    jumpTo: function(absolutePath) {
        jQuery.get('/browse?path=' + absolutePath).then(function(data) {
            this.history.setNext(absolutePath);
            console.log(this.currentPath);
            table.fnClearTable();
            table.fnAddData(data);
        });
    },

    /*
     * Moves one level up or down based on argument
     */
    changeDirectory: function(path) {
        this.currentPath += '/' + path;
        this.jumpTo(this.currentPath);
    },

    oneUp: function() {
    },

    init: function() {
        this.jumpTo('/C:');
    }
}
Browser.init();

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
            console.log(data.parent);
            Browser.jumpTo(data.parent + "/" + data.name);
            e.preventDefault();
        });
    }
}