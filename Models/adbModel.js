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


//interface
// goz' fel mapping eb'a f e disc 3ashan marker aw haga 2ashan fe moshkla f el connecion ma3ah momken last loc not enf of tarck bs hoa ekhtafa
// oreintation hasab el dicrection last 2 3 points w a3rf el angle bat3tha fa ha3rf el hoa feen w size as well

//analysis 3ashan el behaviour 3ashan makonsh ba sum kol haga w khls w ma3mlsh leh recc eno ehsaen ezzzay

// law akbar mn el threshold eb'a unclasslfied unknown behaviour

//a3ml measurment baben kol point w el ba3ddha a observe el change le behsal fel x w y atrah el change el behsal maben el etnen dervative functionta3temd 3ala el erayt dh 3ala el tetl3 el dervative w dicard el direction
//law 3amlth summation maben points law fe fr' lbeer ekbar mn mezet dh ndependet 3an el direction bat3 el driver msh mehtag training data set momken a3rf dh eh bs
// ha3ml 2 lvls el awel ashof hoa ab wal la;a w la; aah then ashof hao aeh
// itna emota te'ol dh wehsh  w e,ta dh kwais variabel of tome wala dist wala ad eh el 3'orz dh kbera wal so3'yra abd ad eh kan seveer meshy killo meshe h fel 10 d'aya' whed kan noraml w wahed kan high fa a'ol en swa;a dh almost kwaia b 94% w  eh hia ad eh saba fel hwades
// momken ekon fe setting tezbot eh mohem w eh msh mohem
//nas bta3ml interpolation ageb hetta el fe nos amlha linear w more realiastec spline interpolation nakhod el start point w neshof el timestamp x w el y hastntegtzhom
