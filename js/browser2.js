function Browser() {
    this.history = new LinkedList();

/*
    this.jumpTo = function(absolutePath) {
        this.history.setNext(absolutePath);
        console.log(this.history);
        jQuery.get('/browse?path=' + absolutePath).then(function(data) {
            table.fnClearTable();
            table.fnAddData(data);
        });
    };
*/

    this.updateTable = function() {
        jQuery.get('/browse?path=' + this.history.current.data).then(function(data) {
            table.fnClearTable();
            table.fnAddData(data);
        });
    };

    this.changeDirectory = function(path) {
        var currentPath = this.history.current.data;
        currentPath += '/' + path;
        this.history.setNext(currentPath);
        this.updateTable();
    };

    this.forward = function() {
        this.history.forward();
        this.updateTable();
    }

    this.back = function() {
        this.history.back();
        this.updateTable();
    }

    this.oneUp = function() {
       var path = this.history.current.data;
       this.jumpTo(path.substring(0, path.lastIndexOf('/')));
    };

    this.init = function() {
        this.history.setNext('C:');
        this.updateTable();
    };
}

var Browser = new Browser();
Browser.init();

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
            //console.log(data.parent);
            Browser.changeDirectory(data.name);
            e.preventDefault();
        });
    }
}