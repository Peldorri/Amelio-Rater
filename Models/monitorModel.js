var mongoose= require('mongoose'),
    Schema=mongoose.Schema;

var monitor= new Schema({
    name: String,
    number: String,
    email: String,
    password: String,
    wId:String
});

module.exports= mongoose.model('Monitor', monitor);
