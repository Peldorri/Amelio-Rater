var mongoose= require('mongoose'),
    trip= require('./tripModel'),
    Schema=mongoose.Schema;


var subLocation = {
    lat: String,
    long: String,
    adb: String,
    timestamp:{type: Date, default: Date.now},
     _id : false
};

var adb= new Schema({

    adbLocations:[subLocation],
    trip : [{ type: Schema.Types.ObjectId, ref: 'trip' }]

},
{
 timestamps: true
});
module.exports= mongoose.model('Adb', adb);
