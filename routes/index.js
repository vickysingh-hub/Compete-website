var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//making landing page
router.get("/", function(req,res){
    res.render("landing");
});

//==========
//AUTH ROUTE
//==========

//Show Register Form
router.get("/register", function (req,res){
    res.render("register");
});
//Handling User Sign up
router.post("/register", function(req,res){
    req.body.username
    req.body.password
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login", function(req,res){
    res.render("login");
});
//Handling User Login
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}), function (req,res){
});

//LOGOUT Route
router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success", "Logged You Out");
    res.redirect("/campgrounds");
});


module.exports = router;