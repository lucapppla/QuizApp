const express = require('express');
const app = express();
const cors = require('cors');
const SurveyList = require('./routes/GetAllSurvey');
const SurveyJsonContent = require('./routes/GetJsonContent');
const CreateJsonFile = require('./routes/CreateJsonFile');
const CreateUserJson = require('./routes/SaveUser');
const GetUserJson = require('./routes/GetUserJson');
const GetUserList = require('./routes/GetUserList');
const GetFinishQuizData = require('./routes/GetFinishQuizData');
const ReadJsonContent = require('./routes/ReadJsonContent');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(SurveyList);
app.use(SurveyJsonContent);
app.use(CreateUserJson);
app.use(GetUserJson);
app.use(CreateJsonFile);
app.use(GetFinishQuizData);
app.use(GetUserList);
app.use(ReadJsonContent);

app.use(cors());

app.listen(3000, function() {
  console.log('Server listen to the port -> 3000');
});

module.exports = app;
