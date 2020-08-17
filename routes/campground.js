var express = require("express");
var router  = express.Router();
var Campgrounds= require("../models/camground");

var middleware=require("../middleware")
// here we are specifying index.js beacause that is already specified once we 
// name our file inside middleware as index.js

//INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campgrounds.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});


//NEW - show form to create new campground
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); 
 });
//CREATE - add new campground to DB
router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price=req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,price: price, url: image, description: desc, author:author}
    // Create a new campground and save to DB
    Campgrounds.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    
     Campgrounds.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground})
     });
});

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
// middleware added to protect the delete route from getting used by anyone to destroy the campgrounds 
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campgrounds.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});
/*
function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} */
// defining another middleware 
/*
function checkCampgroundOwnership(req,res,next)
{
    if (req.isAuthenticated()){

        Campgrounds.findById(req.params.id, function(err, foundCampground){
            if (err){
                res.redirect("back"); // to go to the place where users has been previuosly
            }
            else{ // check does user owm the campground
                if ( foundCampground.author.id.equals(req.user._id)){
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
*/
module.exports = router;