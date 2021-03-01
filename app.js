var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Comment    = require("./models/comment"),
    Campground = require("./models/campground"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");


    //Require Various Routes
    var commentRoutes    = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes       = require("./routes/index");



    //seedDB(); //Seed The Database

    mongoose.connect("mongodb://localhost/yelp_camp");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.use(flash());
   

// Passport Configuration
app.use(require("express-session")({
    secret: "Once again I won the Match",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Current user middleware added to all Routes AND Flash message added 367/2-min
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");  //adding flash to all
    res.locals.success = req.flash("success");
    next(); //this is added so that after this next code of that route is executed
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//listening to server
app.listen(3000, function(){
    console.log("YelpCamp server has started!");
});