var http = require('http')

//Required for Azure
var port = process.env.PORT || 1337;
var GoogleSpreadsheet = require("google-spreadsheet");

// spreadsheet key is the long id in the sheets URL 
var workbook = new GoogleSpreadsheet('1w4Fj7tcW_ifTaPZ4tLYU_LAUap1iVCDywaNFa_dOO18');
var totalSheet;
var moneySheet;

http.createServer(function(req, res) {
    // restrict to domain
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    workbook.getInfo(function(err, info) {
        if (err) {
            return console.log(err);
        }
        sheet = info.worksheets[0];
        sheet.getRows(function(error, rows) {

            var response = [];

            // Output the response from Google Sheets into my own desired format
            for (i = 0; i < rows.length; i++) {
                response.push({
                    "label": rows[i].label,
                    "val1": rows[i].val1,
                    "val2": rows[i].val2
                });
            }

            res.end(JSON.stringify(response));
        });
    });
}).listen(port);
