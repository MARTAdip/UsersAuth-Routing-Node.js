/* {
  "uuid": "1b671a64-40d5-491e-99b0-da01ff1f3341", //every user should become a uuid. https://www.npmjs.com/package/uuid
  "email":"tommy@tmy.io", //from form
  "pw":"123", //from form
  "status":"unconfirmed", //default value unconfirmed, every register is first unconfirmed
  "session": true //depending on the RememberMe checkbox
} */


require('dotenv').config()
const uuidv4 = require('uuid/v4');
const express = require('express');
const app = express()
uuidv4();
// uuidv4(options, buffer, offset);
/* const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
  ]
};
uuidv4(v4options) */

//var sample = fs.readFileSync('sample.txt', 'utf8');


var fs = require('fs');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/user/create', (req, res) => {
    console.log("Route /user")
    console.log(req.query)

    function generateUUID() {
    var d = new Date().getTime();
    if(Date.now){
        d = Date.now(); //high-precision timer
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
    var obj =  {
        "uuid": generateUUID(uuid), 
        "email": req.query.email,
        "pw":"123", //from form
        "status":"unconfirmed", //default value unconfirmed
        "session": true //depending on the RememberMe checkbox
    } 
    var file = fs.writeFile("./usersFile/file.json", obj, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
}); 

    obj = JSON.stringify(file);
    res.send('user created')

})

app.listen(process.env.PORT, () => console.log('App listening on port 4000'))