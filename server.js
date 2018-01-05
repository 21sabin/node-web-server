
const express=require("express");
const fs=require("fs");

var app=express();

const hbs=require('hbs');

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})

//specifiyins that we are using hbs as view engine

app.set("view engine","hbs");

app.use(express.static(__dirname + "/public"));

app.use((req,res,next)=>{
  var time=new Date();
  var log=`${time}:${req.url},${req.method}`
  fs.appendFile("server.log",log+ "\n",(err)=>{
      if(err){
        console.log("unable to append to file")
      }
  })
    console.log(req.method+" " + req.url)
next();
});

app.use((req,res,next)=>{
  res.render("maintenance.hbs")
})

app.get('/',(req,res)=>{
    // res.send({
    //     status:"ok"
    // })
    res.render("home.hbs",{
      page:"welcome to node js",
    //  year:new Date().getFullYear()
    })
})

app.get("/about",(req,res)=>{
   res.render("about.hbs",{
    page:"About page",
  //  year:new Date().getFullYear()
   });
});

app.listen(3000,()=>{
    console.log("server started at port 3000 ")
})
