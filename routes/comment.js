
// ===========================
   //  COMMENTS ROUTE GOES HERE 
// ===========================
// new route which will take us to form for adding comments 
var express=require("express");
var router=express.Router(); // we need to define this at the top of every routes


var Campgrounds=require("../models/camground");
var Comment=require("../models/comment");
var middleware=require("../middleware")
// here we are specifying index.js beacause that is already specified once we 
// name our file inside middleware as index.js

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    // find a campground for commenting
    Campgrounds.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    });
  
});
// SETTING UP THE POST ROUTE  for comments section
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground){
   if (err)
   {
       console.log(err);
       res.redirect("/campgrounds");
   }
   else{
       // create new comment
       Comment.create(req.body.comment,function(err,comment){
           if (err)
           { // we can add error flash message here 
            req.flash("error","something went wrong");
               console.log(err);
           }
           else{
               // here we are creating new comment
               // we need to add user model info to comment model
               // add username and id to comment model
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               // we add a flash message showing successfully added comments
             
               res.redirect("/campgrounds/"+ campground._id);
           }
       })
   }
    });
});
// adding edit route for comments
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if (err)
        {
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
        }
    });
  
});
// adding update route for comments
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    // finding the comment by id and editing it 
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
     });
});
// adding delete route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           // adding flash messahe to so comment deleted
           req.flash("success","Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
 });
 /*
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    // otherwise 
    res.redirect("/login");
} */
// defining another middleware  for commment section
/*function checkCommentOwnership(req,res,next)
{
    if (req.isAuthenticated()){

        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                res.redirect("back"); // to go to the place where users has been previuosly
            }
            else{ // check does user owm the campground
                if ( foundComment.author.id.equals(req.user._id)){
                // this is a moiddleware so if the above condition sattisfies we will add
                next();
                }
                else {
                 res.redirect("back");
                }
               
            }
           
        });
    } 
    else { 
        // if the userr not logged in to handle that
          res.redirect("back");
    }
} */
module.exports=router;