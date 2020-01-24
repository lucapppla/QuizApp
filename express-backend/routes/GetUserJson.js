const express = require("express");
const router = express.Router();
const glob = require("glob");
const fs = require("fs");

//this request returns the contents of a Json file which saves users who have carried out a specific test
router.get("/userData", (req, res) => {
    var item = req.query.item.toLowerCase();
    var replace = item.replace('.json', '');

    glob("storage/user/user_"+replace+".json", function(err, filesInDir) {
        
        if(err) {
            res.status(400).end("An error occurred, cannot read the folder", err);
        }

        fs.readFile( String(filesInDir), 'utf8', function (err, data) {
            if(err) {
              res.status(400).send("cannot read the file, something goes wrong with the file", err);
            }

            var jsonContent = JSON.parse(data); 

            res.status(200).send(jsonContent).end();   
        });    
    });
    
});

module.exports = router;