const express = require("express");
const router = express.Router();
const glob = require("glob");
const fs = require("fs");
const path = require("path");

//this request returns the content of a specific test
router.get("/list/jsonContent", (req, res ) => {
    if(!req.body) {
        return res.status(400).send('Body is missing');
    }

    glob("survey/*.json", function(err, filesInDir) {
        if(err) {
            res.status(400).end("An error occurred, cannot read the folder", err);
        }

        for(var element in filesInDir) {
            var quiz;
            var replace = String(filesInDir[element]).replace('survey/', '');

            if(replace == req.query.title) {
                quiz = replace;
            }
        }

        fs.readFile( path.join( process.cwd(), '/survey', quiz) , 'utf8', function (err, data) {
            if(err) {
              res.status(400).send("cannot read the file, something goes wrong with the file", err);
            }

            var jsonContent = JSON.parse(data); 

            res.status(200).send(jsonContent).end();   
        });    
    });
    
});

module.exports = router;

