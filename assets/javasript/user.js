var mongoose = require ("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: string,
    password: String,
    email:String,
    name: String,
    isAdmin:Boolean,
    facebookId: String,
    provider: String,
    picture: string
});

UserSchema.statics.findOrCreate = function findOrCreate (profile, cb){
    var userObj = new this();
    console.log("profile", profile);

    this.findOne ({facebookId : profile.id}, function(err, result){
        if (err){
            console.log('err:', err);
            cb(err,result);
         }
         else{
             console.log("result", result);

             if(!result){
             userObj.name = profile.displayName;
                userObj.facebookId = profile.id;
                userObj.isAdmin = false;
                userObj.provider = "Facebook";
                userObj.picture = profile.photos[0].value;
                userObj.save(cb);
         }
         else{
             console.log('user logged in');
 //  logging in the user
            cb(err, result);   
         }
        }
    });


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);    