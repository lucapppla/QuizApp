const express = require("express");
const router = express.Router();
const glob = require("glob");
const path = require("path");

router.get("/list", (req, res) => {
    
    glob("survey/*.json" , function(err, filesInDir) {
        if(err){
            res.status(400).end("An error occurred", err);
        }
        array = [];
        for(var element in filesInDir){
            var replace = String(filesInDir[element]).replace('survey/', '');
            array[element] = replace;
        }

        res.status(200).send( array ).end();

    });

});

module.exports = router;


