var mongoose= require('mongoose'),
    trip= require('./tripModel'),
    Schema=mongoose.Schema;

var consumer= new Schema({
    name: String,
    number: Number,
    email: String,
    password: String,
    trips : [{ type: Schema.Types.ObjectId, ref: 'trip' }]
});

module.exports= mongoose.model('Consumer', consumer);
