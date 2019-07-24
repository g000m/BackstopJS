const backstop = require('backstopjs');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  // res.sendfile('index.html');
  console.log('slash');
  res.end('s-end');
});
app.post('/project/:testId/:command', function (req, res) {
  var config = req.body.config;
  var command = req.params.command.toString();
  var id = req.params.testId.toString();
  let commandToRun;
  let projectConfig;

  projectConfig = require('./backstop.config.js')({
    'project': id,
    'scenarios': config.scenarios
  });

  const testOptions = [ 'test', 'reference', 'openReport' ];
  if (command && testOptions.indexOf(command) >= 0) {
    commandToRun = command;
  }

  if (commandToRun !== '') {
    backstop(commandToRun, { config: projectConfig });
  }
  res.end(JSON.stringify({ message: 'tests started' }));
});

app.listen(3000, function () {
  console.log('Started on PORT 3000');
});
