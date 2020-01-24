const express = require("express");
const router = express.Router();
const glob = require("glob");
const fs = require("fs");
const path = require("path");

//this request returns the content of a specific test made by a user 
function readJson(filePattern, res) {

    glob(filePattern, function(err, filesInDir) {
        if(err) {
            res.status(400).end("An error occurred, cannot read the folder", err);
            return;
        }

        var replace = String(filesInDir).replace('storage/', '');

        json = fs.readFileSync( path.join( process.cwd(), '/storage', replace), 'utf8');
        if(err) {
            res.status(400).end("cannot read the file, something goes wrong with the file", err);
            return;
        }
        jsonContent = JSON.parse(json);
        jsonContent = jsonContent.data;

        res.status(200).send({data: (jsonContent)}).end();
    })

}

router.get("/ReadJsonContent", (req, res) => {
    if(!req.body) {
        return res.status(400).send('Body is missing');
    }

    var json = req.query.item.toLowerCase();

    readJson("storage/"+json, res);

});

module.exports = router;