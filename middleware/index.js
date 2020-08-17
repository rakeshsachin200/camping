// here we will define all of our middleware files
// middleware goes here 
// here we require all our models so we do this
var Campgrounds=require("../models/camground")
var Comment=require("../models/comment")

var middlewareObj={};
// all the middleware comes inside her
// in the way i have shown in below code 
// checkcampgroundownership middleware here 

middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    if (req.isAuthenticated()){

        Campgrounds.findById(req.params.id, function(err, foundCampground){
            if (err){
                // we can flash message campground not found
                req.flash("error","campground not found");
                res.redirect("back"); // to go to the place where users has been previuosly
            }
            else{ // check does user owm the campground
                if ( foundCampground.author.id.equals(req.user._id)){
                // this is a moiddleware so if the above condition sattisfies we will add
                next();
                }
                else {
                    // adding the error message that you dont have permission to do so
                    req.flash("error","you dont have permission to do so");
                 res.redirect("back");
                }
               
            }
           
        });
    } 
    else { 
        req.flash("error","You need to be logged in first"); 
        // if the userr not logged in to handle that
          res.redirect("back");
    }
}
// middleware for checkcomment ownership
middlewareObj.checkCommentOwnership=function(req,res,next)
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
}
// middleware for isloggedin ownership
middlewareObj.isLoggedIn=function(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    // otherwise 
    // showing message to the user that he is not logged in 
    req.flash("error", "You need to be logged in to do ");
    //after this it should redirect the login route so we need to go to the login route and use this 
    // key ===error to show the flash messages
    res.redirect("/login");
}


module.exports=middlewareObj;