var express = require('express');
var sql = require('mssql');
var bodyParser = require('body-parser');
var myData = require('./sampleData.js');

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

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());

//routes
app.get('/api/player/:id', function(req, res) {

//    var connection =  new sql.Connection(config, function(err) {
        
        //add some error handling here
//        console.log(err);
//        var request = new sql.Request(connection);
//
//        request.input('PlayerId', sql.Int, req.params.id);
//        request.execute('dbo.usp_TomTest', function(err, recordsets) {
//        res.send(recordsets);
//        });   
//
//    });
//    
//    connection.on('error', function(err) {
//        console.log("there was an error");
//    }); 
    
    
    var data = [];
    
    myData.playerData.data.forEach(function(element, index){
            if(element.PlayerID == req.params.id){
            data.push(element);
        }  
    });
    
    res.send(data);
    
});

app.get('/api/comments/:id', function(req, res) {

     
    var data = [];
    
    myData.commentLog.comments.forEach(function(element, index){
        
        if(element.playerId == req.params.id){
            data.push(element);
        }    
        
    });

    res.send(data);
});   


app.post('/api/post-comment', function(req, res) {

    //stored proc code will go here 
    
    //temporary sample data
    var _json = {
        playerId: req.body.playerId,
        comment: req.body.comment,
        userName: req.body.userId,
        dateId: new Date()
    };
    
    myData.commentLog.comments.push(_json);
    console.log(myData.commentLog.comments.length);
    res.send("success");

});   



app.post('/api/login', function(req, res) {

    //need to add body parser to receive the json from the angular call
    
    //varuable to hold return value of procedure
    
    var sessionInfo = {
        userId: req.body.userId,
        accessLevel: 0,
        isUser: false,
        validPassword: false,
    };
    

    myData.loginData.users.forEach(function(element){
        if(element.userId === sessionInfo.userId) {
            //found user check password
            sessionInfo.isUser = true;
            if(element.password === req.body.password){
                //if password matches proceed
                sessionInfo.accessLevel = element.accessLevel;
                sessionInfo.validPassword = true;
            }
        }        
    });
    
    res.send(sessionInfo);
   
});



app.listen(3000, function(){
    console.log("running on port 3000");
});








    

