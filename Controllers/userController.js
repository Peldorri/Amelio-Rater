var Trips= require('../Models/tripModel');
var bCrypt = require('bcrypt-nodejs');

var userController= function(Users){

    var post= function(req,res){
      console.log(req.body)
      var user=new Users(req.body);

      user.save();
      res.status(201).send(user);
    }


  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Users.find(query,function(err,users){
        if(err)
            res.status(500).send(err);
        else {
            res.json(users);
        }
    });
  }

  var upadateArray= function(req,res){
      Users.findByIdAndUpdate(req.params.userId,{"$push":{"location":req.body.location}}, {"upsert":true,"new":true},function(err,s){
        res.status(200).json(s);
      });

  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.user, req.body);
      req.user.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.user);
        }
      });
  });

  var remove=(function(req,res){
        var id = req.params.userId;
        Users.findByIdAndRemove(id, {},function(err,docs){
          if(err)
              res.status(500).send(err);
          if(!docs){
              res.status(204).send('Removed');
          } else
            res.status(200).end();
        });
      });

  var pushTrips= (function(req,res){
      var trip=new Trips(req.body);
      trip.save();
      //res.status(201).send(trip._id);
      Users.findById(req.params.userId,function(err, user){
        if(err)
          res.status(500).send(err);
        else if(user){
          req.user=user;
          user.trips.push(trip)
          user.save();
          res.status(201).send(trip);
        }
      });
  });


  var signup= (function(req, res) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username

                Users.findOne({ 'email' :  req.body.email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return next(err);
                    }
                    // already exists
                    if (user) {
                        return res.status(200).json({
                          error:"User exists"
                        });
                    } else {
                        // if there is no user with that email
                        // create the user

                        // save the user
                        // create the user
                        var jsonUser = req.body;
                        jsonUser.password = createHash(req.body.password);
                        var newUser = new Users(jsonUser);

                        // set the user's local credentials
                                            // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return res.status(200).json(newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        });

        var createHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }

  var getUserLocations=(function(req,res){
    console.log("enter");
    Users.findById(req.params.userId,'location',function(err,location){
      if(err)
        res.status(500).send(err);
      else if(location){
        res.json(location);
      }
      else
        res.status(404).send('user not found');
    });

  });


  return{
    post:post,
    get:get,
    patch:patch,
    delete:remove,
    pushTrips:pushTrips,
    getLocations:getUserLocations,
    upadateArray:upadateArray,
    signup:signup
  }
}
module.exports=userController;
