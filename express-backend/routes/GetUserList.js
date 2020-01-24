const express = require("express");
const router = express.Router();
const glob = require("glob");

//this request returns the users list in the statistics screen
router.get("/UserList", (req, res) => {
    var QuizName = req.query.item.toLowerCase();

    glob("storage/"+"*"+QuizName+".json" , function(err, filesInDir) {
        if(err) {
            res.status(400).end("An error occurred", err);
        }

        array = [];
        for(var element in filesInDir){
            var replace = String(filesInDir[element]).replace('storage/', '');
            array[element] = replace;
        }
        
        res.status(200).send( array ).end();

    });

});

module.exports = router;


