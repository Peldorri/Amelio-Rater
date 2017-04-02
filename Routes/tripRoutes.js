var express=require('express');

var tripRoutes=function(Trips){

var tripRouters= express.Router();

var tripController= require('../Controllers/tripController')(Trips);
  tripRouters.route('/')
            .post(tripController.post)
            .get(tripController.get);


  tripRouters.use('/:tripId',function(req,res,next){
        Trips.findById(req.params.tripId,function(err,trip){
            if(err)
                res.status(500).send(err);
            else if (trip){
                req.trip=trip;
                next();

            }
            else{

                res.status(404).send('trip not found');
            }
        });

  });

  tripRouters.route('/:tripId/currentlocation')
              .post(tripController.upadateArray);


  tripRouters.route('/:tripId')
            .get(function(req,res){
                res.json(req.trip);
            })
            .patch(tripController.patch)
            .delete(tripController.delete);
        return tripRouters;
};

module.exports=tripRoutes;
