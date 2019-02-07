function Browser() {

    this.path = $('.path');

    this.updateTable = function() {
        var currentPath = window.location.pathname;
        this.path.html(currentPath);
        jQuery.get('/browse?path=' + currentPath.substring(1, currentPath.length)).then(function(data) {
            table.fnClearTable();
            table.fnAddData(data);
        });
    }

    this.changeDirectory = function(path) {
        this.pushHistory(path);
        this.updateTable();
    }

    this.oneUp = function() {
       var path = window.location.pathname;
       this.changeDirectory(path.substring(0, path.lastIndexOf('/')));
    }

    this.oneDown = function(directoryName) {
        var currentPath = window.location.pathname;
        var newPath = currentPath + '/' + directoryName;
        this.pushHistory(newPath);
        this.updateTable();
    }

    //Pushes this.history.current.data to window.history
    this.pushHistory = function(path) {
        window.history.pushState({url: path}, '', path);
    }

    this.init = function() {
        currentPath = window.location.pathname;
        if(currentPath.length <= 1) {
            window.history.replaceState({url: 'C:/Users/Nicolas_Shak'}, '', '/C:/Users/Nicolas_Shak');
        }
        this.updateTable();
    }
}

var Browser = new Browser();
Browser.init();

window.addEventListener('popstate', function(event) {
    Browser.updateTable();
});

var options = {

    "bProcessing": true,
    "bServerSide": false,
    "bPaginate": false,
    "bAutoWidth": false,
    "pageResize": true,
    "searching": false,
    "fixedHeader": true,

    "fnCreatedRow" : function(nRow, aData, iDataIndex) {
        var icon = '';
        if(aData.type == 'folder') {
            icon = '<img class="folder-icon" src="/img/folder.svg"></img>';
        }
        else {
            icon = '<img class="file-icon" src="/img/file.svg"></img>';
        }
        $('td:eq(0)', nRow).html(icon + '<div>' + aData.name + '</div>');
        setAction(nRow, aData);
    },

    columns: [
        {"title": "Name", data: 'name'},
        {"title": "Type", data: 'type'},
        {"title": "Date modified", data: 'date'},
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
                        addWindow(window_text, data.name, '<div class="window-contents"><img src="/' + data.parent.substring(3, data.parent.length) + '/' + data.name + '""></div>');
                    });
                });
                break;
            case '.pdf':
                $(element).bind('click', function(e) {
                    window.open(data.parent.substring(2, data.parent.length) + '/' + data.name);
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