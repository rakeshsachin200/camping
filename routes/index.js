//  ==============================
// INDEX ROUTE+AUTHENTICATION ROUTE GOES HERE
// ===============================

var express=require("express");
var router=express.Router();
// requirements of authentication routes
var passport=require("passport");
var User=require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});


// ====================AUTHENTICATION ROUTES==================
//REGISTER FORM ROUTE  show register form || sign up form 
router.get("/register",function(req,res){
    res.render("register");
});
// post route for handling sign up logic 
router.post("/register",function(req,res){

    User.register(new User ({username:req.body.username}),req.body.password,function(err,user){
        if (err)
        {      // we can show the flash message that this user already exist or some other error
            req.flash("error",err.message);
            // whatever the error thrown here is shown to the user as error messages
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            // this will let the users to get login and will create a session for him 
            // we can do whatever we want to do once the  user is logged in 
            // welcoming the user here
            req.flash("success","welcome to Yelpcamp  "  + "  "+user.username);
            res.redirect("/campgrounds");
       
    });
 });
});
// LOGIN ROUTES 
// LOGIN ROUTES  will TWO
//  get request to login form 

router.get("/login",function(req,res){
    // here we will use the key of flash message of isloggedin middleware 
    //like this 
    res.render("login");
});
// post request to verify credentials and let the user get logged in from login form 
// contains login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){});
// LOGOUT route 
router.get("/logout",function(req,res){
    // this logic will log the users out 
    req.logout();
    // right before we redirect somewhere we will add a message which will show logged you out 
    req.flash("success","logged you out!");
    // using error because we have defined only error keyword in app.use of app.js
    //redirect to somewhere aftetr logging out 
    res.redirect("/campgrounds");
});

// middleware for checking whether user is logged in and only then allowing him to add a comment

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    // otherwise 
    res.redirect("/login");
}
module.exports=router;