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





var fs = require('fs');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
        "session": true //depending on the RememberMe checkbox
} 
    console.log(obj)
    fs.writeFile(`${id}.json`, JSON.stringify(obj), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
}); 

    res.send('user created')

})

app.listen(process.env.PORT, () => console.log('App listening on port 4000'))