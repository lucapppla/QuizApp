const express = require("express");
const router = express.Router();
const fs = require("fs");

//this request write a Json file for saving the results of the tests made by users
router.post("/createUserJson", (req, res) => {
    if(!req.body){
        return res.status(400).send('Body is missing');
    }

    const date = getDate();
    const QuizName = req.body.params.QuizName;
    const name = req.body.params.name;
    const surname = req.body.params.surname;

    checkExistAndUpdate(QuizName, name, surname, date);
})

function checkExistAndUpdate(QuizName, name, surname, date) {
    var replace = QuizName.replace('.json', '');

    fs.exists((__dirname + '/../storage/User/'+"user_"+replace+".json"), function(exists) { 
        if(exists) {
            fs.readFile((__dirname + '/../storage/User/'+"user_"+replace+".json"), 'utf8', function readFileCallback(err, dataJson) {
                if (err) {
                    console.log(err);
                } else {
                    jsonReaded = updateContenteJson(dataJson, name, surname, date)
                    fs.writeFile((__dirname + '/../storage/User/'+"user_"+replace+".json"), jsonReaded, 'utf8', function (err) {
                        if (err) throw err;               
                        console.log('JSON of User created');
                    }); 
                }
            });
        } else {
            json = updateContenteJson(null, name, surname, date);
            fs.writeFile((__dirname + '/../storage/User/'+"user_"+replace+".json"), json, 'utf8', function (err) {
                if (err) throw err;               
                console.log('JSON of User created');
            }); 
        }
    })
}

function updateContenteJson(dataJson, name, surname, date) {
    
    var obj = {
        "data": []
    };
    
    if(dataJson !== null) {
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
    } else if(dataJson == null) {
        obj.data.push( 
            {
                "surname" : surname, 
                "name": name,
                "date": date
            }, 
        );
    }
    finalJson = JSON.stringify(obj);
    return finalJson;
}

function getDate() {

    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year;

};

module.exports = router;