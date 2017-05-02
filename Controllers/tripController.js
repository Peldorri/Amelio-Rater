var tripController= function(Trips){

    var post= function(req,res){

      var trip=new Trips(req.body);

      trip.save();
      res.status(201).send(trip._id);
    }


  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Trips.find(query,function(err,trips){
        if(err)
            res.status(500).send(err);
        else {
            res.json(trips);
        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.trip, req.body);
      req.trip.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.trip);
        }
      });
  });


  var upadateLocArray= function(req,res){
      Trips.findByIdAndUpdate(req.params.tripId,{"$push":{"currentLocation":req.body}, "$set":{updatedAt:Date.now()}}, {"upsert":true,"new":true},function(err,s){
        res.status(200).json(s);
      });

  }

  var upadateGyroArray= function(req,res){
      Trips.findByIdAndUpdate(req.params.tripId,{"$push":{"gyroscope":req.body}, "$set":{updatedAt:Date.now()}}, {"upsert":true,"new":true},function(err,s){
        res.status(200).json(s);
      });

  }

  var upadateAccArray= function(req,res){
      Trips.findByIdAndUpdate(req.params.tripId,{"$push":{"accelerometer":req.body}, "$set":{updatedAt:Date.now()}}, {"upsert":true,"new":true},function(err,s){
        res.status(200).json(s);
      });

  }
  var remove =(function(req,res){
        var id = req.params.tripId;
        Trips.findByIdAndRemove(id, {},function(err,docs){
          if(err)
              res.status(500).send(err);
          if(!docs){
              res.status(204).send('Removed');
          } else
            res.status(200).end();
        });
  });

  return{
    post:post,
    get:get,
    patch:patch,
    delete: remove,
    upadateLocArray:upadateLocArray,
    upadateGyroArray:upadateGyroArray,
    upadateAccArray:upadateAccArray

  }
}

module.exports=tripController;
