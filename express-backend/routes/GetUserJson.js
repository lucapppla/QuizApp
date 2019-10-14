const express = require("express");
const router = express.Router();
const glob = require("glob");
const fs = require("fs");
const path = require("path");

router.get("/userData", (req, res) => {
    glob("storage/user/*.json", function(err, filesInDir) {
        
        console.log(filesInDir)
        if(err){
            res.status(400).end("An error occurred, cannot read the folder", err);
        }

        fs.readFile( String(filesInDir), 'utf8', function (err, data) {
            if(err) {
              res.status(400).send("cannot read the file, something goes wrong with the file", err);
            }

            var jsonContent = JSON.parse(data); 
            console.log(jsonContent)

            res.status(200).send(jsonContent).end();   
        });    
    });
    
});

module.exports = router;