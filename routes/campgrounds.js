var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //It Automatically Takes In Index.js as it is special

//INDEX - Show all Campgrounds
router.get("/", function(req,res){
    //get all campground from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user}); 
        }
    });
    
});

//CREATE - Add New Campground to Database
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from body
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};

    //creating new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            //redirect to campground page
            res.redirect("/campgrounds");
        }
    });
});


//NEW- show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//SHOW Route - show more info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render template with associated campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//UPDATE Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    //find and upadate correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY - Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;