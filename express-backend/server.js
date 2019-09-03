const express = require('express');
const app = express();
const cors = require('cors');
const SurveyList = require ('./routes/GetAllSurvey');
const SurveyJsonContent = require ('./routes/GetJsonContent');
const bodyParser = require ('body-parser');

app.use(bodyParser.json());
app.use(SurveyList);
app.use(SurveyJsonContent);

app.use(cors());

app.listen(3000, function () {
  console.log('Server listen to the port -> 3000');
});


module.exports = app;
