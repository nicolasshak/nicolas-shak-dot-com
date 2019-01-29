function Browser() {

    this.history = new LinkedList();

    this.path = $('.path');

    this.updateTable = function() {
        var currentPath = this.history.current.data;
        //window.history.pushState({url: currentPath}, '', '/' + currentPath);
        this.path.html('/' + this.history.current.data);
        jQuery.get('/browse?path=' + this.history.current.data).then(function(data) {
            table.fnClearTable();
            table.fnAddData(data);
        });
    };

    this.changeDirectory = function(path) {
        this.history.setNext(path);
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
       this.changeDirectory(path.substring(0, path.lastIndexOf('/')));
    };

    this.oneDown = function(directoryName) {
        var path = this.history.current.data;
        this.changeDirectory(path + '/' + directoryName);
    }

    this.init = function() {
        if(window.location.pathname.length <= 1) {
            this.history.setNext('C:/Users/Nicolas_Shak');
            //window.history.replaceState({url: 'C:/Home'}, '', '/C:/Home');
        }
        else {
            this.history.setNext(window.location.pathname);
        }
        this.updateTable();
    };
}

var Browser = new Browser();
Browser.init();

window.onpopstate = function(event) {
    Browser.updateTable();
}

var options = {

    "bProcessing": true,
    "bServerSide": false,
    "bPaginate": false,
    "bAutoWidth": false,
    "pageResize": true,
    "searching": false,
    "fixedHeader": true,

    "fnCreatedRow" : function(nRow, aData, iDataIndex) {
        setAction(nRow, aData);
    },

    columns: [
        {"title": "Name", data: 'name'},
        {"title": "Date modified", data: 'date'},
        {"title": "Type", data: 'type'},
        {"title": "Size", data: 'size'}
    ]
}

var table = $('.files').dataTable(options);

function setAction(element, data) {

    if(data.isDirectory) {
        $(element).bind("click", function(e) {
            //console.log(data.parent);
            Browser.oneDown(data.name);
            e.preventDefault();
        });
    }
    else {

        switch(data.ext) {
            case '.lnk':
                jQuery.get('/open?path=' + data.path).then(function(contents) {
                    $(element).bind('click', function(e) {
                        window.open(contents);
                    });
                });
                break;
            case '.png':
            case '.jpg':
                $(element).bind('click', function(e) {
                    //jQuery request just to make sure image window appears after browser is brought to front
                    jQuery.get('/open?path=' + data.path).then(function(contents) {
                        addWindow(window_text, data.name, '<div class="window-contents"><img src="' + window.location + data.parent.substring(3, data.parent.length) + '/' + data.name + '"></div>');
                    });
                });
                break;
            default:
                // Query is in listener because it causes the window to be created after the bringFront call from click listener
                $(element).bind('click', function(e) {
                    jQuery.get('/open?path=' + data.path).then(function(contents) {
                        addFormattedWindow(data.name, contents);
                    });
                });
        }
    }
}