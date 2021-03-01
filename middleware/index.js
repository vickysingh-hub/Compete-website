var Campground = require("../models/campground");
var Comment = require("../models/comment");


//===========
//MIDDLEWARES
//===========

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){  //If Logged In
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground Not Found!!!")
                res.redirect("back");
            } else {
                //If Logged in person is Owner of Campground?
                if(foundCampground.author.id.equals(req.user._id)){      //first is mongoose object while second is string
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!!!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!!!" )
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){  //If Logged In
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //If Logged in person is Owner of Comment?
                if(foundComment.author.id.equals(req.user._id)){      //first is mongoose object while second is string
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!!!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!!!");
        res.redirect("back");
    }
};


//Check Log IN
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!!");  //it is before redirect as flash exec auto before rendering next page
    res.redirect("/login");
};


module.exports = middlewareObj;