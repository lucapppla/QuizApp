const express = require("express");
const router = express.Router();
const glob = require("glob");
const fs = require("fs");
const path = require("path");

//this request returns the right answer percentage of a test carried out by choosing it from the statistics screen
getCorrectAnswerPoint = (json) => {
    return json.point;
}

getTotalAnswerPoint = (json) => {
    return json.array.length;
}

function readAndCalculatePoint(filePattern, res) {
    glob(filePattern, function(err, filesInDir) {
        var totalPoint = 0;
        var totalQuestions = 0;
        var fileName = [];

        if(err) {
            res.status(400).end("An error occurred, cannot read the folder", err);
            return;
        }
        if(filesInDir.length == 0) {
            res.status(400).send("User not Found").end();
            return;
        }
        
        for(var element in filesInDir) {
            var replace = String(filesInDir[element]).replace('storage/', '');
            
            fileName.push(replace);
        }

        fileName.forEach( (elem) => {             
            json = fs.readFileSync( path.join( process.cwd(), '/storage', elem), 'utf8');
            if(err) {
                res.status(400).end("cannot read the file, something goes wrong with the file", err);
                return;
            }
            jsonContent = JSON.parse(json);

            jsonContent = jsonContent.data;
            totalPoint+= getCorrectAnswerPoint(jsonContent);
            totalQuestions+= getTotalAnswerPoint(jsonContent);
            totalTest = filesInDir.length;
        });    
        
        res.status(200).send({totalPointPerc: ((totalPoint/totalQuestions)*100).toFixed(2), totalTest: totalTest}).end();
    });
}

router.get("/GetFinishQuizData", (req, res) => {
    if(!req.body) {
        return res.status(400).send('Body is missing');
    }

    var QuizName = req.query.item.toLowerCase();

    readAndCalculatePoint("storage/"+"*"+QuizName+".json", res);

});

module.exports = router;