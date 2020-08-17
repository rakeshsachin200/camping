var mongoose=require("mongoose");
var commentSchema =new mongoose.Schema(
    { text:String,  
      author: {
        id:  { // we want to draw username and the id of the user from user model and  
          type:mongoose.Schema.Types.ObjectId,  // associate that in our comment model
          ref:"User" 
        },
        username:String
      }
    }
); 
module.exports=mongoose.model("Comment",commentSchema);