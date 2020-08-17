var mongoose=require("mongoose");
var campgroundsSchema =new mongoose.Schema(
    { name:String, // beware the variable string must start with capital letter   
      url:String,
      price:String, // adding new thing to our campground model
      description:String,
      // associating users model with campgroundschema
     author:{
         id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         },
         username:String
     },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment" // name of our comment model.
        }
    ]
    }
); 
module.exports=mongoose.model("Campgrounds",campgroundsSchema); 