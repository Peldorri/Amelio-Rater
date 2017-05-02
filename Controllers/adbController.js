var Trips= require('../Models/tripModel');
var adbController= function(Adb){

    var post= function(req,res){

      var adb=new Adb(req.body);

      adb.save();
      res.status(201).send(adb._id);
    }


  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Adb.find(query,function(err,adbs){
        if(err)
            res.status(500).send(err);
        else {
            res.json(adbs);
        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.adb, req.body);
      req.adb.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.adb);
        }
      });
  });


  var upadateArray= function(req,res){
      Adb.findByIdAndUpdate(req.params.adbId,{"$push":{"adbLocations":req.body}, "$set":{updatedAt:Date.now()}}, {"upsert":true,"new":true},function(err,s){
        res.status(200).json(s);
      });

  }

  var remove =(function(req,res){
        var id = req.params.adbId;
        Adb.findByIdAndRemove(id, {},function(err,docs){
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
      Adb.findById(req.params.adbId,function(err, adb){
        if(err)
          res.status(500).send(err);
        else if(adb){
          req.adb=adb;
          adb.trip.push(trip)
          adb.save();
          res.status(201).send(adb);
        }
      });
  });

  return{
    post:post,
    get:get,
    patch:patch,
    delete: remove,
    upadateArray:upadateArray,
    pushTrips: pushTrips
  }
}

module.exports=adbController;
