/********************************************************************************* 
 * WEB700 – Assignment 03 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 * * of this assignment has been copied manually or electronically from any other source 
 * * (including 3rd party web sites) or distributed to other students. * 
 * 
 * Name: Mahshid Farrahinia Student ID: 144091196  Date:2020/2/17 
 * 
 * * ********************************************************************************/
const HTTP_PORT =process.env.PORT || 8080;
const express = require ("express");
const app = express();
const path = require ('path');
var serverDataModule = require ("./modules/serverDataModule");

serverDataModule.initialize().then(()=>{
    app.listen(HTTP_PORT,()=> {
        console.log("Server listening on port :" + HTTP_PORT)
    })
});
app.get ("/employees" , (req, res) =>{
    if (req.query.department){
          serverDataModule.getEmployeesByDepartment(req.query.department).then((resp)=>{
          res.json(resp)
      }).catch((err)=>{
          res.send(err);
        });
    } else {
         serverDataModule.getAllEmployees().then((resp)=>{
         res.json(resp)
      }).catch((err)=>{
         res.send(err); 
      });
    }
});


app.get ("/managers" , (req, res)=>{
    serverDataModule.getManagers().then((resp)=>{
        res.json(resp)
    }).catch((err)=>{
        res.send(err);
    });
});

app.get ("/departments" , (req, res)=>{
    serverDataModule.getDepartments().then((resp)=>{
        res.json(resp)
    }).catch((err)=>{
        res.send(err);
    });
});


app.get ("/employee/:num" , (req, res) =>{
          serverDataModule.getEmployeeByNum(req.params.num).then((resp)=>{
          res.json(resp)
      }).catch((err)=>{
          res.send(err);
        });
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/home.html"));
});


app.get("/about", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
	res.sendFile(path.join(__dirname, "./views/htmlDemo.html"));
});

app.use ((req, res)=>{
    res.status(404).sendfile(path.join(__dirname, "./views/htmlDemo.html"));
});
  
  

