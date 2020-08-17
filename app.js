var express=require("express");
const PORT=1234;
var Campgrounds=require("./models/camground");
// comments requirement
var Comment=require("./models/comment");
// user model requirement
var User=require("./models/user");
// seeds.js requirement
//===============================
// REQUIRING ALL THE ROUTES FROM ROUTE FILE
//==============================
// REQUIRING METHOD OVERRIDE
var methodOverride=require("method-override");
// requiring connect flash
var flash =require("connect-flash");


//===================
var commentRoutes=require("./routes/comment");
var campgroundRoutes=require("./routes/campground");
var indexRoutes=require("./routes/index");

var passport=require("passport");
// local strategy requiring passport-local
var LocalStrategy=require("passport-local"); 
// requiring passport local mongoose 
var passportLocalMongoose=require("passport-local-mongoose");
// mongoose requirements
var mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/Yelp_camp_v13");
var app=express();
var bodyParser=require("body-parser");   
// requiring the seedDB function

passport.use ( new LocalStrategy(User.authenticate())); // THIS COMES WITH PASSPORT LOCAL MONGOOSE 
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public")); // safer way of using public directory 
// ====== authentication requirements =============
// ====PASSWORD CONFIGURATION
// using connect flash
// this must be placed here always
app.use(flash());
app.use(require("express-session")({
    secret:"i am the best in the world",
    resave:false,
    saveUninitialized:false
}));


// these two codes are for setting passport up so that they may be used by our application
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true})); 
// |||NOTE||| THIS IS CORRECT ORDER OF SETTING UP PASSPORT INITIALIZATIONS FOR OUR LOGIN TO WORK 
// PERFECTLY
// 1. REQUIRE EXPRESS-SESSION 2.PASSPORT INTIALIZE 3.PASSPORT SESSION 4. BODY PARSER ENCODED TRUE

//=====================================================
// these two codes are really important for encoding and  unecoding the data from sessions
passport.serializeUser(User.serializeUser());// BOTH THESE METHODS COME WITH PASSPORT LOCAL MONGOOSE 
passport.deserializeUser(User.deserializeUser());
// our campground schema is created 
//adding  some data  to our campgrounds schema
 /* Campgrounds.create({
    name:"bihar",
    url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg",
    description:"bihar is the land of upsc crackers "
},function(err,newcamp){
    if( err)
    {
        console.log("error!!");
    }
    else 
    {
        console.log("newly added campgrounds");
        console.log(newcamp);
    }
});  */


// adding the landing page on yelpcamp application ,like most 
// of the application landing page is on the root path

// we make the campgrounnds array of objects varaible global variable
/*var campgrounds=[{name:"new zealand",url:"https://images.squarespace-cdn.com/content/v1/56a1f10822482ece9195509f/1567689959161-I0J1M0QHHS2BW8PQ0SIJ/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/Majlis.jpg?format=2500w"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"california",url:"https://r-cf.bstatic.com/images/hotel/max1024x768/205/205603142.jpg"},
{name:"bali",url:"https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/201904161433491171-b106597a99ae11e999df0242ac110002.jpg?&output-quality=75&downsize=520:350&crop=520:350;0,20&output-format=jpg"}
];    we are not here to take input from our this array we will retrieve the data from database */ 
app.use(function(req,res,next){
 res.locals.currentUser=req.user; // CURRENT USER IS THE NAME WITH WHICH WE CALL REQ.USER FROM CAMPGROUNDS
 res.locals.error=req.flash("error"); // using the flash message when the user is not signed in
 // error is the variable with which we will retrieve it in the header.ejs file 
 res.locals.success=req.flash("success");
 next();
});
app.use(methodOverride("_method"));

//=========================
// we need to let the app.js use our routes to do so we will define app.use here
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
// enabling to use method override






 app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
   });