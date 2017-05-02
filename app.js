var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser= require('body-parser')
    cookieParser= require('cookie-parser'),
    passport= require('passport'),
    session= require('express-session'),
    cors= require('cors'),
    localStrategy=require('passport-local'),
    flash= require('connect-flash'),
    //expressValidator=('express-validator'),
    fs = require("fs");



var db=mongoose.connect('mongodb://Peldorri:childrenf5@ds113678.mlab.com:13678/locationsapi');


var Users= require('./Models/userModel');
var Consumers= require('./Models/consumerModel');
var Trips= require('./Models/tripModel');
var Adb= require('./Models/adbModel')

var app= express();
app.use(cors());

//Init App
var app= express();

//Express session
app.use(session({
    secret: 'secret',
    saveUnintialized: true,
    resave: true
}));

//Connect Flash
app.use(flash());
var port= process.env.OPENSHIFT_NODEJS_PORT|| process.env.PORT ||
          process.env.WEB_PORT || 8080;


app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/static", express.static(__dirname + '/assets'));
//app.use(session({secret: 'library'}));
//app.use(passport.initialize());
//app.use(passport.session());
var passportR =require('./Config/passport')(app);
var userRouters=require('./Routes/userRoutes')(Users);
var consumerRouters=require('./Routes/consumerRoutes')(Consumers);
var tripRouters=require('./Routes/tripRoutes')(Trips);
var adbRouters=require('./Routes/adbRoutes')(Adb);

app.use('/api/user',userRouters);
app.use('/api/consumer',consumerRouters);
app.use('/api/trip',tripRouters);
app.use('/api/adb',adbRouters);

app.get('/', function(req, res){                                                 //req is the request sent by the client, res is the respons that gonna be send back

    if(req.user){
      fs.readFile('Views/mapView.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
  });
} else {
  fs.readFile('Views/loginForm.html', function (err, html) {
    if (err) {
        throw err;
    }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
});
}

});

app.listen(port, function(){

    console.log('Gulp is running  on Port:'+ port);

});
