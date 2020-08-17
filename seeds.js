
var mongoose=require("mongoose");
var Campgrounds=require("./models/camground");
// comments requirements
var Comment=require("./models/comment");


// removing everything in thhe campground models
// this is how we remove everyuthing from any models
// by creating a seed file 
// creating new campgrounds  with objects in accordance with the model expectations
/*
var data=[
    {name:"lonely planet",
     url:"https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I",
     description:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
     {name:"lovely planet",
     url:"https://picsum.photos/id/1084/536/354?grayscale",
     description:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
     {name:"scary planet",
     url:"https://picsum.photos/seed/picsum/536/354",
     description:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
]
function seedDB()
{
    Campgrounds.remove({},function(err){
        if (err)
        {
            console.log(err);
        }
        else{
            console.log("!removed campgrounds");
            // doing this will ensure that first our all campgrounds are deleted and then 
            // new campgrounds are added 
            data.forEach(function(seed){
                Campgrounds.create(seed,function(err,campground){
                if (err)
                {
                    console.log(err);
                }
                else{
                    console.log("added new data ");
                    // adding comment on each campgrounds 
                    Comment.create({
                        text:"this is a nice place",
                        author:"rakesh kumar" 
                    },function(err,comment){
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created a new comment");

                    });
                }
                });
            });
            

        }
        
    });
    
} 
// adding few campgrounds


module.exports=seedDB; */