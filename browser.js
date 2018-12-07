var options = {

	"bProcessing": true,
    "bServerSide": false,
    "bPaginate": false,
    "bAutoWidth": false,
    "searching": false,


    "fnCreatedRow" : function(nRow, aData, iDataIndex) {
    	if(!aData.isDirectory) {
    		$(nRow).bind("dblclick", function(e) {
    			$.get('/open?path=' + aData.path).then(function(data) {
    				addFormattedWindow(data);
    			});
    		})
    	}
    	else {
    		$(nRow).bind("dblclick", function(e) {
	       		$.get(aData.parent + "/" + aData.name).then(function(data) {
	    			table.fnClearTable();
	    			table.fnAddData(data);
	    		});
	    		e.preventDefault();
	    	});
    	}
    },

	columns: [
		{data: 'name'},
        {data: 'date'},
        {data: 'ext'},
        {data: 'size'}
	]
}

var table = $('.files').dataTable(options);

jQuery.get('/browse?path=/C:').then(function(data) {
	table.fnClearTable();
	table.fnAddData(data);
});