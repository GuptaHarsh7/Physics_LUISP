var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
	Video                 = require("./models/video"),
    User                  = require("./models/user"), 
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
	seedDB                = require("./seeds"),
	methodOverride        = require("method-override");

 // mongoose.connect("mongodb+srv://Faculty_ClassicalPhysics:<Admin@LUSIP_17>@cluster0.tzg1d.mongodb.net/<Resources>?retryWrites=true&w=majority",
 //  { useNewUrlParser:true ,useCreateIndex:true,useUnifiedTopology:true, useFindAndModify: false });
 // var db = mongoose.connection;
 // db.on('error',console.error.bind(console, 'connection error:'));
 // db.once('open', function(){
 //    console.log('connected to db server successfully');
 // });

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/classical_physics';

mongoose.connect("mongodb+srv://Faculty_ClassicalPhysics:Admin@LUSIP_17@cluster0.tzg1d.mongodb.net/<Resources>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false, useFindAndModify: false})
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

mongoose.set('useFindAndModify', false);


var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(require("express-session")({
    secret: "Rusy",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));

app.use(methodOverride('_method'));

seedDB(); //seed the database

app.get("/",function(req,res){
	var c = isLoggedIn(req,res);
    res.render("Home",{isLoggedIn: c});
});

app.get("/faculty",function(req,res){
	var c = isLoggedIn(req,res);
    res.render("faculty",{isLoggedIn: c});
});

app.get("/contact",function(req,res){
	var c = isLoggedIn(req,res);
    res.render("contact",{isLoggedIn: c});
});

//Register Page
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/resources");
        });
    });
});

//Login Page
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/resources",
    failureRedirect: "/login"
}) , function(req, res){

});

app.get("/logout", function(req, res){
	var c = isLoggedIn(req,res);
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res){
    if(req.isAuthenticated()){
        return true;
    }
    else{
        return false;
    }
}

app.get("/Facilities",function(req,res){
	var c = isLoggedIn(req,res);
    res.render("facilities",{isLoggedIn: c});
});

app.get("/lectures",function(req,res){
	var c = isLoggedIn(req,res);
    res.render("lecture",{isLoggedIn: c});
});

app.get("/resources",function(req,res){
    var c = isLoggedIn(req,res);
	Video.find({}, function(err,allVideos){
		if(err){
			console.log(err);
		}
		else{
			res.render("resources", {isLoggedIn: c , videoCollection : allVideos });
		}
	})
    
});

app.post("/resources",function(req,res){
	var c = isLoggedIn(req,res);
	if(!c){
		res.redirect("/resources");
	}
	else{
		Video.create(req.body.video, function(err, video){
			if(err){
				console.log(err);
			}
			else{
				video.save();
				res.redirect("/resources");
			}
		})
	}
});

app.delete("/resources/:id",function(req,res){
	var c = isLoggedIn(req,res);
	if(!c){
		res.redirect("/resources");
	}
	else{
		Video.findByIdAndRemove(req.params.id, function(err){
			if(err){
				console.log(err);
				res.redirect("/resources");
			}
			else{
				res.redirect("/resources");
			}
		});
	}
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
	var c = isLoggedIn(req,res); 
   res.redirect("/",{isLoggedIn: c});
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Connected");
});
