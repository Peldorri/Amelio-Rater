var mongoose= require('mongoose'),
    trip= require('./tripModel'),
    Schema=mongoose.Schema;

var user = new Schema({
    name: String,
    number: String,
    email: String,
    password: String,
    rate: Number,
    trips : [{ type: Schema.Types.ObjectId, ref: 'trip' }]
});

module.exports= mongoose.model('User', user);
