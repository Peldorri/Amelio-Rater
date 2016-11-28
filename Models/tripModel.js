var mongoose= require('mongoose'),
    Schema=mongoose.Schema;

var subLocation = {
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now}
};

var subSensorReadings = {
    accelrometer:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number}
    }],
    gyroscope:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number}
    }],
    timestamp:{type: Date, default: Date.now}
};

var subBehaviour = {
    name: String,
    behaviourFile: String

};
var subBehaviourType = {
    ADBType:String,
    behviour: [subBehaviour]
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
