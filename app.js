var express =require("express");
var bodyParser= require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.render("Home");
});

app.get("/faculty",function(req,res){
    res.render("faculty");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/Facilities",function(req,res){
    res.render("facilities");
});

app.get("/lectures",function(req,res){
    res.render("lecture");
});

app.get("/resources",function(req,res){
    res.render("resources");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected");
});
