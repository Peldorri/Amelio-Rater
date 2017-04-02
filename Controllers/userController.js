var Trips= require('../Models/tripModel');

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
          res.status(201).send(user);
        }
      });
  });
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
    upadateArray:upadateArray
  }
}
module.exports=userController;
