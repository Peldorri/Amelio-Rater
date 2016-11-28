var mongoose= require('mongoose'),
    trip= require('./tripModel'),
    Schema=mongoose.Schema;

var subLocation = {
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now}
};
var user = new Schema({
    name: String,
    number: Number,
    email: String,
    password: String,
    DOB: {type: Date, default: Date.now},
    rate: Number,
    carType: String,
    carPlateNumber: String,
    location:[subLocation],
    trips : [{ type: Schema.Types.ObjectId, ref: 'trip' }]
});

module.exports= mongoose.model('User', user);
