var mongoose= require('mongoose'),
    Schema=mongoose.Schema;

var subLocation = {
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now},
     _id : false
};

var subSensorReadings = {
    accelrometer:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number},
       _id : false
    }],
    gyroscope:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number},
       _id : false
    }],
    timestamp:{type: Date, default: Date.now},
     _id : false
};

var subBehaviour = {
    name: String,
    behaviourFile: String,
     _id : false

};
var subBehaviourType = {
    ADBType:String,
    behviour: [subBehaviour],
     _id : false
};

var trip= new Schema({
    startTime: {type: Date, default: Date.now},
    endTime: {type: Date, default: Date.now},
    startLocation:[{
        lat:{type: Number},
        long:{type: Number},
        timestamp:{type: Date, default: Date.now}
    }],
    endLocation:[{
        lat:{type: Number},
        long:{type: Number},
        timestamp:{type: Date, default: Date.now}
    }],
    tripRating: Number,
    sensorReadings:[subSensorReadings],
    currentLocation:[subLocation],
    BehaviourType: [subBehaviourType]

});
module.exports= mongoose.model('Trip', trip);
