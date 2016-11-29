var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser= require('body-parser')
    cookieParser= require('cookie-parser'),
    passport= require('passport'),
    session= require('express-session');


var db=mongoose.connect('mongodb://Peldorri:childrenf5@ds113678.mlab.com:13678/locationsapi');  


var Users= require('./Models/userModel');
var Consumers= require('./Models/consumerModel');
var Trips= require('./Models/tripModel');

var app= express();

var port= process.env.OPENSHIFT_NODEJS_PORT|| process.env.PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + port )
});

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
//app.use(cookieParser());
//app.use(session({secret: 'library'}));
//app.use(passport.initialize());
//app.use(passport.session());

var userRouters=require('./Routes/userRoutes')(Users);
var consumerRouters=require('./Routes/consumerRoutes')(Consumers);
var tripRouters=require('./Routes/tripRoutes')(Trips);

app.use('/api/user',userRouters);
app.use('/api/consumer',consumerRouters);
app.use('/api/trip',tripRouters);


app.get('/', function(req, res){                                                 //req is the request sent by the client, res is the respons that gonna be send back

    res.send('Welcome to my API');

});

app.listen(port, function(){

    console.log('Gulp is running  on Port:'+ port);

});
