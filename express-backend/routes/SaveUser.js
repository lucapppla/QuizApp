const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/createUserJson", (req, res) => {
    if(!req.body){
        return res.status(400).send('Body is missing');
    }

    const date = getDate();
    const name = req.body.params.name;
    const surname = req.body.params.surname;
    
    checkExistAndUpdate(name, surname, date);
})

function checkExistAndUpdate(name, surname, date){
    fs.exists((__dirname + '/../storage/User/'+"UserFile.json"), function(exists) { 
                
        if(exists) {
            fs.readFile((__dirname + '/../storage/User/'+"UserFile.json"), 'utf8', function readFileCallback(err, dataJson) {
                if (err){
                    console.log(err);
                } else {
                    jsonReaded = createJson(dataJson, name, surname, date)
                    fs.writeFile((__dirname + '/../storage/User/'+"UserFile.json"), jsonReaded, 'utf8', function (err)
                    {
                        if (err) throw err;               
                        console.log('JSON of User created');
                    }); 
                }
            });
        } else {
            json = createJson( name, surname, date);
            fs.writeFile((__dirname + '/../storage/User/'+"UserFile.json"), json, 'utf8', function (err) {
                if (err) throw err;               
                console.log('JSON of User created');
            }); 
        }
    })
}

function createJson(dataJson, name, surname, date) {
    
    var obj = {
        data: []
    };

    if(dataJson !== 'undefined') {
        dataStored = JSON.parse(dataJson);

        obj.data.push(
            {
                "surname" : surname, 
                "name": name,
                "date": date 
            }
        );
        dataStored.data.forEach(element => {
            obj.data.push( element )
        });
    } else if(dataJson == 'undefined') {
        obj.data.push( 
            {
                "surname" : surname, 
                "name": name,
                "date": date
            }, 
        );
    }
    finalJson = JSON.stringify(obj)
    return finalJson;
}

function getDate() {

    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + ":" + month + ":" + year;

};

module.exports = router;