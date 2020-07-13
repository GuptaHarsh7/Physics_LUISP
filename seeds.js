var mongoose = require("mongoose");
var Video = require("./models/video");


var data = [
    {
        title: "Gyroscope",
		embedUrl: "https://www.youtube.com/embed/XPUuF_dECVI"
    },
    {
        title: "Rotational Motion",
		embedUrl: "https://www.youtube.com/embed/fDJeVR0o__w"
    },
	{
        title: "Lagrangian",
		embedUrl: "https://www.youtube.com/embed/l7o6FN7rsb4"
    },
	{
        title: "Circular Motion",
		embedUrl: "https://www.youtube.com/embed/mWj1ZEQTI8I"
    },
	{
        title: "Weight and realted topics",
		embedUrl: "https://www.youtube.com/embed/Z07tTuE1mwk"
    },
	{
        title: "Friction",
		embedUrl: "https://www.youtube.com/embed/FWh-enOdXM4"
    }
	
]

function seedDB(){
   //Remove all videos
   Video.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed videos!");
         //add a few campgrounds
        data.forEach(function(seed){
            Video.create(seed, function(err, video){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a video");
                    //create a video
                }
            });
        });
    }); 
    //add a few videos
}

module.exports = seedDB;