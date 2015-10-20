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

      
    var connection =  new sql.Connection(config, function(err) {
      
        //add some error handling here
        if(err){
            console.log(err);
            return;
        }
          
    //set up the request   
    var request = new sql.Request(connection);
       request.input('PlayerId', req.body.playerInfo.PlayerID);
       request.input('Slot_Act', req.body.playerInfo.Slot_Act);
       request.input('Slot_Theo', req.body.playerInfo.Slot_Theo);
       request.input('Table_Act', req.body.playerInfo.Table_Act);
       request.input('Table_Theo', req.body.playerInfo.Table_Theo);
       request.input('FreePlayPromo', req.body.playerInfo.Slots_FreePlayPromo);
       request.input('FreePlayPoints', req.body.playerInfo.Gaming_PointComp);
       request.input('FreePlayDraw', req.body.playerInfo.Slots_FreePlayDrawing);
       request.input('Points', req.body.playerInfo.Total_PtsCost);
       request.input('PointAvailable', req.body.playerInfo.PointBal);
       request.input('Comps', req.body.playerInfo.CompIssued);
       request.input('PatronCoupons', req.body.playerInfo.PatronCoupons);
       request.input('Kiosk', req.body.playerInfo.KioskCoupons);
       request.input('TheoMin', req.body.playerInfo.Comp_MinNoFSP);
       request.input('TheoMid', req.body.playerInfo.Comp_MidNoFSP);
       request.input('TheoMax', req.body.playerInfo.Comp_MaxNoFSP);
       request.input('ActMin', req.body.playerInfo.Comp_MinAct);
       request.input('ActMid', req.body.playerInfo.Comp_MidAct);
       request.input('ActMax', req.body.playerInfo.Comp_MaxAct);
       request.input('StartDate', sql.DateTime, new Date(req.body.playerInfo.StartDate + 'T00:00:00'));
       request.input('EndDate', sql.DateTime, new Date(req.body.playerInfo.EndDate + 'T00:00:00'));
       request.input('Days', sql.NVarChar, req.body.playerInfo.Days);
       request.input('UserName', req.body.userName);
       request.input('Comment', req.body.comment);
       request.execute('dbo.asp_CompLookupLog', function(err, rs) {
        
           if(err){
                console.log(err);
                return;
           }
           
            //inner request
            var request2 = new sql.Request(connection);
            request2.input('PlayerID', req.body.playerInfo.PlayerID)
            request2.execute('dbo.asp_CompLookupLogID', function(err2, rs2) {
                if(err2)  {
                    console.log(err);
                    return;
                }
                    //send the lookupID back
                    res.send(rs2[0][0])
                    
            });
          
        });   
 
        connection.on('error', function(err) {
            console.log("there was an error");
        }); 
    });
    
  
    //handle output parm in stored proc
    //res.send({commentId:"1uniqeId"});

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








    

