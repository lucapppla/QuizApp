const express = require("express");
const router = express.Router();
const fs = require("fs");

var obj = {
    data: []
};

router.post("/createUserJson", (req, res) => {
    if(!req.body){
        return res.status(400).send('Body is missing');
    }

    const name = req.body.params.name;
    const surname = req.body.params.surname;

    fs.readFile((__dirname + '/../storage/User/'+"UserFile.json"), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            json = stringifyObj(data, name, surname);

            fs.writeFile((__dirname + '/../storage/User/'+"UserFile.json"), json, 'utf8', function (err)
            {
                if (err) throw err;               
                console.log('JSON of User created');
            }); 
        }
    });
})

function stringifyObj(data, name, surname) {
    obj = JSON.parse(data);
        obj.data.push( 
            {
                "surname" : surname, 
                "name": name
            }, 
        );
    return json = JSON.stringify(obj);
}

module.exports = router;