'use strict';

var express = require('express');
var sql = require('mssql');
var bodyParser = require('body-parser');
var myData = require('./sampleData.js');

var app = express();
var config = {
    user: 'PlayerProfit',
    password: 'Aliante15',
    server: '192.168.51.176', // You can use 'localhost\\instance' to connect to named instance
    database: 'RWSMKT'
};

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());

//routes
app.post('/api/player', function(req, res) {
	
    var connection =  new sql.Connection(config, function(err) {
      
        //add some error handling here
        if(err){
            console.log(err);
            return;
        }
          
    //set up the request   
    var request = new sql.Request(connection);
       request.input('PlayerId', parseInt(req.body.playerId));
	   request.input('Start',  req.body.startDate.substr(0,10));
	   request.input('End', req.body.endDate.substr(0,10));
       request.execute('dbo.asp_PlayerCompLookup_Detail', function(err, rs) {
        
           if(err){
                console.log(err);
                return;
           }
           
            res.send(rs[0]);
           
        });   
 
        connection.on('error', function(err) {
            console.log("there was an error");
        }); 
    });
        
});

app.get('/api/comments/:id', function(req, res) {

   
    var connection =  new sql.Connection(config, function(err) {
      
        //add some error handling here
        if(err){
            console.log(err);
            return;
        }
          
        //set up the request   
        var request = new sql.Request(connection);
        request.input('PlayerID', req.params.id);
        request.execute('dbo.asp_CompLookupLogView', function(err, rs) {

            if(err){
                console.log(err);
                return;
            }
            
            res.send(rs[0]);

        });   

        connection.on('error', function(err) {
            console.log("there was an error");
        }); 
    });

});   


app.post('/api/post-comment', function(req, res) {

    //stored proc code will go here 
    
    //temporary sample data
    var _json = {
        playerId: req.body.playerId,
        comment: req.body.comment,
        userName: req.body.userName,
        dateId: new Date()
    };
    
    myData.commentLog.comments.push(_json);

    //handle output parm in stored proc
    res.send({commentId:"1uniqeId"});

});   



app.post('/api/login', function(req, res) {

    //need to add body parser to receive the json from the angular call
    
    //varuable to hold return value of procedure
    
    var sessionInfo = {
        userId: req.body.userId,
        accessLevel: 0,
        hostId: 0,
        changePassword: 0
    };
    
    
     var connection =  new sql.Connection(config, function(err) {
      
        //add some error handling here
        if(err){
            console.log(err);
            return;
        }
          
    //set up the request   
    var request = new sql.Request(connection);
       request.input('User', sessionInfo.userId);
	   request.input('Password',  req.body.password);
	   request.execute('dbo.asp_UserLogin', function(err, rs) {
        
           if(err){
                console.log(err);
                return;
           }
            sessionInfo.accessLevel = rs[0][0].PermissionID;
            sessionInfo.hostId = rs[0][0].utHostID;
            sessionInfo.changePassword = rs[0][0].ChangePassword;
            res.send(sessionInfo);
              
        });   
 
        connection.on('error', function(err) {
            console.log("there was an error");
        }); 
    });

        
   
   
});



app.listen(3000, function(){
    console.log("running on port 3000");
});








    

