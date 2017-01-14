var mongoose= require('mongoose'),
    trip= require('./tripModel'),
    Schema=mongoose.Schema;

var subLocation = {
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };
var user = new Schema({
    name: String,
    number: Number,
    email: String,
    password: String,
    rate: Number,
    nationalId: String,
    location:[subLocation],
    trips : [{ type: Schema.Types.ObjectId, ref: 'trip' }]
});

module.exports= mongoose.model('User', user);
