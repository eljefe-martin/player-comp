var express = require('express');
var sql = require('mssql');

var app = express();
var config = {
    user: 'sqluser',
    password: 'Wh@t!',
    server: '10.0.0.19', // You can use 'localhost\\instance' to connect to named instance
    database: 'Gemini',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

app.use(express.static('public'));

//routes
app.get('/api/player/:id', function(req, res) {

    var connection =  new sql.Connection(config, function(err) {

        var request = new sql.Request(connection);

        request.input('PlayerId', sql.Int, req.params.id);
        request.execute('dbo.usp_TomTest', function(err, recordsets) {
            res.send(recordsets);
        });   


    });
    
    connection.on('error', function(err) {
        console.log("there was an error");
    });    
});

app.post('/api/login', function(req, res) {

    //need to add body parser to receive the json from the angular call
    
    var connection =  new sql.Connection(config, function(err) {

        var request = new sql.Request(connection);

        request.input('PlayerId', sql.Int, req.params.id);
        request.execute('dbo.usp_TomTest', function(err, recordsets) {
            res.send(recordsets);
        });   


    });
    
    connection.on('error', function(err) {
        console.log("there was an error");
    });    
});



app.listen(3000, function(){
    console.log("running on port 3000");
});






    

