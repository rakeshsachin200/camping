var mongoose=require("mongoose");
// this is necessary requirement for authetication part
var passportLocalMongoose=require("passport-local-mongoose");

var UserSchema =new mongoose.Schema(
    { username:String,  
      password:String
    }
); 
// enabling all the methods of passport local mongoose into our user model 
// we do that through this approach
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema); 