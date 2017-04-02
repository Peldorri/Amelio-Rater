var mongoose= require('mongoose'),
    Schema=mongoose.Schema;

var behaviour= new Schema({

  ADBType:String,
  behviour: String,
  weight: Number,


});
module.exports= mongoose.model('Behaviour', behaviour);
