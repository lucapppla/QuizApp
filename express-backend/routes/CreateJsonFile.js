const express = require("express");
const router = express.Router();
const fs = require("fs");

var obj = {
    data: []
};

router.post("/createJson", (req, res) => {
    if(!req.body){
        return res.status(400).send('Body is missing');
    }

    //parameters from react-front-end to be included in the JSON file to save in storage
    const name = req.body.params.name;
    const surname = req.body.params.surname;
    const testName = req.body.params.testName;
    const array = req.body.params.array;

    //parameter data/hour to be included in the JSON file to save in storage
    const data = getDate();
    const hour = getHour();

    //parameter total point of a Quiz and single point of an answer to be included in the JSON file to save in storage
    totalPoint = totalPoint(array);
    pointForAnswer = getPointForAnswer(array);

    //pushing all the data in the array obj for create the JSON file
    obj.data.push(
        {"surname" : surname}, 
        {"name": name}, 
        {"data": data},
        {"hour": hour}, 
        {"testName": testName}, 
        {"array": pointForAnswer}, 
        {"point": totalPoint}
    );
    
    var finalJson = JSON.stringify(obj);
    JsonName = createJsonName(name, surname, testName);

    fs.writeFile( (__dirname + '/../storage/'+JsonName), finalJson, 'utf8', function (err) {
        if (err) throw err;               
        console.log('JSON created');
      }); 

      res.status(200).send("JSON created").end();   
});

function getPointForAnswer(array){
    newArray = []
    array.map( elem =>{
        if(elem.givenAnswer ==  elem.rightAnswer)
            newArray.push( {"givenAnswer" : elem.givenAnswer, "point": "1"} );
        else if ( elem.givenAnswer !=  elem.rightAnswer)
            newArray.push( {"givenAnswer" : elem.givenAnswer, "point": "0"} );
    })
    return newArray;
};

function totalPoint(answerList){
    return answerList.filter(elem => elem.givenAnswer == elem.rightAnswer).length;
};

function createJsonName (name, surname, testCode){
    return String(name+"_"+surname+"_"+testCode);
};

function getDate() {

    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + ":" + month + ":" + year;

};

function getHour() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;

};

module.exports = router;
