// Only works with 1 chart on the page 
// Get chart based on container class
var data = $('.chart-block-container').attr('data-settings'); 
// JSON data stored in string, so parse to JSON object
var jsonData = jQuery.parseJSON(data);
 
var remoteJSON; 

// Set all ajax calls to be synchronous 
jQuery.ajaxSetup({async:false});

// Make AJAX call
$.getJSON("http://sheets-example.azurewebsites.net/", function (data){

	remoteJSON = data; 
	
	// Empty arrays to add our new values
	var newLabels = []; 
	var newValues = [];
	
	// Loop round objects in the response data
	for (var i = 0; i < remoteJSON.length; i++) {
		
		newLabels.push(remoteJSON[i].label);
		
		// Each value entry needs to be contained within its own array
		// to allow multiple data point as in the example below
		newValues.push([remoteJSON[i].val1, remoteJSON[i].val2]);			
	}
	
	// Update our JSON object pulled from contain div
	jsonData.dataTable.sampleLabels = newLabels;
	jsonData.dataTable.data = newValues;
	
	// Stringify JSON to allow it to be stored in attribute
	var newJSONString = JSON.stringify(jsonData);
	// Update our char contrainer
	$('.chart-block-container').attr('data-settings', newJSONString);
	
});

// Change our ajax calls to allow asynchronous calls again		
jQuery.ajaxSetup({async:true});
