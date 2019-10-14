const express = require('express');
const app = express();
const cors = require('cors');
const SurveyList = require ('./routes/GetAllSurvey');
const SurveyJsonContent = require ('./routes/GetJsonContent');
const CreateJsonFile = require ('./routes/CreateJsonFile');
const createUserJson = require ('./routes/SaveUser');
const GetUserJson = require ('./routes/GetUserJson');
const bodyParser = require ('body-parser');

app.use(bodyParser.json());
app.use(SurveyList);
app.use(SurveyJsonContent);
app.use(createUserJson);
app.use(GetUserJson);
app.use(CreateJsonFile);

app.use(cors());

app.listen(3000, function () {
  console.log('Server listen to the port -> 3000');
});


module.exports = app;
