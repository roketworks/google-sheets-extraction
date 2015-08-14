var http = require('http')

//Required for Azure
var port = process.env.PORT || 1337; 
var GoogleSpreadsheet = require("google-spreadsheet");
 
// spreadsheet key is the long id in the sheets URL 
var workbook = new GoogleSpreadsheet('1EJuCSP2ki9WrHM_NBIoZomft-FjXljar-KZsZzWWRL0');
var totalSheet; 
var moneySheet; 

http.createServer(function (req, res){
	// restrict to domain
	res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
	res.writeHead(200, {'Content-Type': 'application/json'});
	
	workbook.getInfo(function(err, info){
		if (err) return console.log(err); 
    	console.log(info);
    	sheet = info.worksheets[2];
  		sheet.getRows(function(error, rows){
  			console.log(rows);
	  	
	  		var response = [];
			
          // Output the response from Google Sheets into my own desired format
	  		for (i = 0; i < rows.length; i++) {
	  			if (rows[i].person != "Total:") {
		  			response.push({
		  				"label": rows[i].label, 
		  				"val2": rows[i].val1, 
		  				"val2": rows[i].val2		
		  			});
	  			}
	  		}	

  			res.end(JSON.stringify(response));
	  	});
	});
}).listen(port);