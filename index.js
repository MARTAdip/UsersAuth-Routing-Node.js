

/* var fs = require('fs');
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); */
/* Switch to this routestructure: 
`/` List of just the confirmed users registered on the page
`/register` the former index.html login 
`/admin`   List ALL users apart from their confirmed state. Provide buttons to confirm the unconfirmed ones
Keep `/users/verify` and `/users/verify:id` */

// include nav +nav -> mixins
//extends layout.pug / block content


require('dotenv').config();
const uuidv4 = require('uuid/v4');
const express = require('express');
var fs = require('fs');
const app = express();
var path = require('path');



app.set('view engine', 'pug')

app.get('/confirmed', (req, res) => {
    console.log("Route /confirmed users")
    var filesArray = fs.readdirSync('./usersFile')
    console.log(filesArray)
    var confirmedUsers = [];
    filesArray.forEach(file => {
        var readingFile = fs.readFileSync(`./usersFile/${file}`)
        var user = JSON.parse(readingFile)
        if( user.status !== 'unconfirmed') {
            confirmedUsers.push(user)
        }
    })
    console.log(confirmedUsers)

    res.render('confirmed', {users: confirmedUsers})
    
})

app.get('/register', (req, res) => {
    res.render('register', {h1: 'Registration', button: 'Complete Registration'} )
    console.log("Route /register")
})

app.get('/admin', (req, res) => {
    console.log("Route /admin")
    var usersArray = fs.readdirSync('./usersFile')
    var allUsers = [];
    usersArray.forEach(list => {
        var readingFile = fs.readFileSync(`./usersFile/${list}`)
        var registredUser = JSON.parse(readingFile)
        if( registredUser.status === 'unconfirmed' && 'confirmed') {
            allUsers.push(registredUser)
        }
    })
   
    res.render('admin', {users: allUsers})
})


app.get('/user/create', (req, res) => {
    console.log("Route /user")
    console.log(req.query)

  
var id = uuidv4() // will generate random and all diverse unique ids 
var obj =  {
    "uuid": id,
    "email": req.query.email,
    "pw": req.query.pw, //from form
    "status":"unconfirmed", //default value unconfirmed
    "session": true  //depending on the RememberMe checkbox
} 
console.log(obj)
fs.writeFile(`./usersFile/${id}.json`, JSON.stringify(obj), function(err) {
    if(err) {
        return console.log(err);
    }
console.log("The file was saved!");
}); 

res.send('user created')

})



app.listen(process.env.PORT, () => console.log('App listening on port 4000'))