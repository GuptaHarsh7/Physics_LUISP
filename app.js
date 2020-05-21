var express =require("express"),
    bodyParser= require("body-parser"),
    app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    console.log("OK");
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected");
});