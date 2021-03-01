var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name:"Ooty 1",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AGpbdS-R9ZJWderrtCDTQRriUaeJLMhPihuIHqvwddb1KIOxKQ&s",
        description:"Luxury may be an element, as in early 20th century African safaris, but including accommodations in fully equipped fixed structures such as high-end sporting camps under the banner of camping. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew more democratic, and varied. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    },
    {
        name:"Ooty 2",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AGpbdS-R9ZJWderrtCDTQRriUaeJLMhPihuIHqvwddb1KIOxKQ&s",
        description:"Luxury may be an element, as in early 20th century African safaris, but including accommodations in fully equipped fixed structures such as high-end sporting camps under the banner of camping. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew more democratic, and varied. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    },
    {
        name:"Ooty 3",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AGpbdS-R9ZJWderrtCDTQRriUaeJLMhPihuIHqvwddb1KIOxKQ&s",
        description:"Luxury may be an element, as in early 20th century African safaris, but including accommodations in fully equipped fixed structures such as high-end sporting camps under the banner of camping. Camping as a recreational activity became popular among elites in the early 20th century. With time, it grew more democratic, and varied. Modern campers frequent publicly owned natural resources such as national and state parks, wilderness areas, and commercial campgrounds. Camping is a key part of many youth organizations around the world, such as Scouting, which use it to teach both self-reliance and teamwork."
    }
]

//crete  function to remove data
function seedDB(){

    //Remove all campground and the Add some
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds");

            //Add few campgrounds
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added Campground");
                    
                    //Create A Comment
                    Comment.create(
                        {
                            text: "this is great place",
                            author: "sid"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comments");
                            }
                        }
                    )
                }
            });
        });
             }
    });

    
    //Add few comments
}
module.exports = seedDB;
