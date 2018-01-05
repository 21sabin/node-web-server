
const express=require("express");

//process.env contains all our environment variable
const port=process.env.PORT || 3000
const fs=require("fs");

var app=express();

const hbs=require('hbs');

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
})

//specifiyins that we are using hbs as view engine

app.set("view engine","hbs");
//specifying folder structure for file requested
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

// app.use((req,res,next)=>{
//   res.render("maintenance.hbs")
// })

app.get('/',(req,res)=>{
    // res.send({
    //     status:"ok"
    // })
    res.render("home.hbs",{
      page:"welcome to node js",
    //  year:new Date().getFullYear()
    })
})

app.get('/project',(req,res)=>{
  res.render("project.hbs")
})

app.get("/about",(req,res)=>{
   res.render("about.hbs",{
    page:"About page",
  //  year:new Date().getFullYear()
   });
});

app.listen(port,()=>{
    console.log(`server started at port 3000 ${port}`)
})
