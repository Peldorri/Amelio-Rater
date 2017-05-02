var express=require('express');

var adbRoutes=function(Adb){

var adbRouters= express.Router();

var adbController= require('../Controllers/adbController')(Adb);
  adbRouters.route('/')
            .post(adbController.post)
            .get(adbController.get);


  adbRouters.use('/:adbId',function(req,res,next){
        Adb.findById(req.params.adbId,function(err,adb){
            if(err)
                res.status(500).send(err);
            else if (adb){
                req.adb=adb;
                next();

            }
            else{

                res.status(404).send('adb not found');
            }
        });

  });

  adbRouters.route('/:adbId/currentlocation')
              .post(adbController.upadateArray);

  adbRouters.route('/:adbId/trip')
              .post(adbController.pushTrips);

  adbRouters.route('/:adbId')
            .get(function(req,res){
                res.json(req.adb);
            })
            .patch(adbController.patch)
            .delete(adbController.delete);
        return adbRouters;
};

module.exports=adbRoutes;
