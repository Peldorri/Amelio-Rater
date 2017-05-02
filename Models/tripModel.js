var mongoose= require('mongoose'),
    behaviour= require('./behaviourModel'),
    Schema=mongoose.Schema;

var subLocation = {
    lat: String,
    long: String,
  //  adb: String,
    timestamp:{type: Date, default: Date.now},
     _id : false
};
 var subAccelerometer ={
   x: String,
   y: String,
   z: String,
   //timestamp:{type: Date, default: Date.now},
    _id : false
 };
 var subGyroscope ={
   x: String,
   y: String,
   z: String,
   //timestamp:{type: Date, default: Date.now},
    _id : false
 };

var subSensorReadings = {
    accelerometer:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number},
      //timestamp:{type: Date, default: Date.now},
       _id : false
    }],
    gyroscope:[{
      x: {type: Number},
      y: {type: Number},
      z: {type: Number},
      location:[subLocation],
    //  timestamp:{type: Date, default: Date.now},
       _id : false
    }],

     _id : false
};

var subBehaviourType = {
    ADBType:String,
  //  behviour: [subBehaviour],
     _id : false
};

var trip= new Schema({
    startTime: {type: Date ,default: Date.now} ,
    endTime: {type: Date},
    startLocation:[subLocation],
    endLocation:[subLocation],
    tripRating: Number,
    //sensorReadings:[subSensorReadings],
    currentLocation:[subLocation],
    gyroscope: [subGyroscope],
    accelerometer: [subAccelerometer]
  //  behaviour : [{ type: Schema.Types.ObjectId, ref: 'behaviour' }]

},
{
 timestamps: true
});
module.exports= mongoose.model('Trip', trip);
