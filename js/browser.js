var options = {

	"bProcessing": true,
    "bServerSide": false,
    "bPaginate": false,
    "bAutoWidth": false,
    "sScrollY":"250px",

    "fnCreatedRow" : function(nRow, aData, iDataIndex) {
    	if(!aData.IsDirectory) {
    		$(nRow).bind("dblclick", function(e) {
    			$.get('/open?path=' + aData.Path).then(function(data) {
    				createFormattedWindow(escape(data));
    			});
    		})
    	}
    	else {
    		$(nRow).bind("dblclick", function(e) {
	    		//history.pushState(aData.Path, "", window.location + aData.Path);
	       		$.get(aData.Parent + "/" + aData.Name).then(function(data) {
	    			table.fnClearTable();
	    			table.fnAddData(data);
	    		});
	    		e.preventDefault();
	    	});
    	}
    	
    },

	columns: [
		{data: 'Name'}
	]
}

var table = $('.files').dataTable(options);

jQuery.get('/browse?path=/C:').then(function(data) {
	table.fnClearTable();
	table.fnAddData(data);
})
//history.replaceState(null, null, '/C:');