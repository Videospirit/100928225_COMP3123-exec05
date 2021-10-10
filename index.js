const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
http://localhost:8081/home.html
*/
app.use("/", express.static('public'))

/*
- Return all details from user.json file to client as JSON format
*/
var users = require('./user.json')
router.get('/profile', (req,res) => {
  res.send(users);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get('/login', (req,res) => {
  let uName = req.query.username
  let pass = req.query["password"]
    if(users.username == uName){
      if(users.password == pass){
        response = {
          status: true,
          message: "User Is valid"
        }
      } else {
        response = {
          status: false,
          message: "Password is invalid"
        }
      }
    } else {
      response = {
        status: false,
        message: "User Name is invalid"
      }
    }
    res.send(response)
  });

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
app.get('/logout/:username', (req,res) => {
  let username = req.params.username
  res.send(`<b>${username} successfully logout.</b>`);
});


app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));