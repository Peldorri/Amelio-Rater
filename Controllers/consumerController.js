var Trips= require('../Models/tripModel');

var consumerController= function(Consumers){

    var post= function(req,res){

      var consumer=new Consumers(req.body);

      consumer.save();
      res.status(201).send(consumer._id);
    }

  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Consumers.find(query,function(err,consumers){
        if(err)
            res.status(500).send(err);
        else {
            res.json(consumers);

        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.consumer, req.body);
      req.consumer.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.consumer);
        }
      });
  });

  var remove=(function(req,res){
        var id = req.params.consumerId;
        Consumers.findByIdAndRemove(id, {},function(err,docs){
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
      Consumers.findById(req.params.consumerId,function(err, consumer){
        if(err)
          res.status(500).send(err);
        else if(consumer){
          req.consumer=consumer;
          consumer.trips.push(trip)
          consumer.save();
          res.status(201).send(consumer);
        }
      });


  });

  return{
    post:post,
    get:get,
    patch:patch,
    delete:remove,
    pushTrips:pushTrips


  }
}

module.exports=consumerController;
