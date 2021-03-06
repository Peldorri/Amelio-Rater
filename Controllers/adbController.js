var Trips= require('../Models/tripModel');
var User= require('../Models/userModel');

var adbController= function(Adb){

    var post= function(req,res){

      var adb=new Adb(req.body);

      adb.save();
      res.status(201).send(adb);
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

  var getTrip= function(req,res){
    User.findById(req.params.userId, function (err, user) {
      if (err)
        res.status(500).send(err);
      else {
        var trips = user.trips;
      //  Adb.find({"trip":{"$elemMatch":{"$in":trips}}}, function (err, trip){
      Adb.find({"trip":{"$in":trips}}, function (err, trip){

          if(err)
            res.status(500).send(err);
          else{
            var sCount=0;
            var slCount=0;
            var wCount=0;
            var swCount=0;
            var nCount=0;
            var prob=0;
            var percent=0;
            var preRate=0;
            var rate=0;
            var category;
            for (var i = 0; i < trip.length; i++) {
              for (var j = 0; j < trip[i].adbLocations.length; j++) {
                if(trip[i].adbLocations[j].adb=="S")
                {
                  sCount++;
                }
                else if(trip[i].adbLocations[j].adb=="SL")
                {
                  slCount++;
                }
                else if(trip[i].adbLocations[j].adb=="W")
                {
                  wCount++;
                }
                else if(trip[i].adbLocations[j].adb=="SW")
                {
                  swCount++;
                }
                else{
                   nCount++;
                }

              }

            }
            prob= (sCount+wCount+swCount+slCount)/(sCount+wCount+swCount+slCount+nCount);
            percent= prob*100;
            if(prob>=0 && prob<0.1){

              category="Catious";
            }
            else if(prob>=0.1 && prob<0.3){
              category="Novice";
            }
            else if(prob>=0.3 && prob<0.5){
              category="Intermediate";
            }
            else {
              category="Reckless";
            }

            preRate= (5*prob);
            rate=(5-preRate);
            res.json({
              sCount: sCount,
              slCount: slCount,
              wCount:wCount,
              swCount:swCount,
              nCount:nCount,
              prob:prob,
              category:category,
              preRate:preRate,
              rate:rate

            });
          }
        });
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
    pushTrips: pushTrips,
    getTrip:getTrip
  }
}

module.exports=adbController;
