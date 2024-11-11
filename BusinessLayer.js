var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var bodyParser = require("body-parser");

var url="mongodb://127.0.0.1:27017";
var app=express();
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use(express.static("Images"));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    res.header("Access-Control-Allow-Methods","GET","POST","PUT");
    next();
  
  });


//API Requests

app.post("/RegisterUser", function(req, res){
   mongoClient.connect(url, function(err, db){
      if(!err) {
          var dbo = db.db("ishopdb");
          dbo.collection("tblregister").insertOne({UserName:req.body.UserName, Password:req.body.Password, Email:req.body.Email, City:req.body.City, State:req.body.State, PinCode:req.body.PinCode},function(err,result){
              if(!err) {
                  console.log("Registered Successfully..");
              } else {
                  console.log(err);
              }
          });
      }
   })
})

app.get("/userDetails", function(req, res){
    mongoClient.connect(url,function(err, db){
        var dbo=  db.db("ishopdb");
        dbo.collection("tblregister").find({}).toArray(function(err, documents){
           if(!err) {
            res.send(documents);
           } else {
               console.log(err);
           }
        })
    })
})
app.get("/productDetails", function(req, res){
    mongoClient.connect(url,function(err, db){
        var dbo=  db.db("ishopdb");
        dbo.collection("tblproducts").find({}).toArray(function(err, documents){
           if(!err) {
            res.send(documents);
           } else {
               console.log(err);
           }
        })
    })
})


app.listen(8080);
console.log("Server Started");