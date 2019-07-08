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
app.post('/test', function (req, res) {
  var config = req.body.config;
  var test = req.body.test;
  var id = req.body.id;
  let commandToRun;
  let projectConfig;

  projectConfig = require('./backstop.config.js')({
    'project': id,
    'scenarios': config.scenarios
  });

  const testOptions = [ 'test', 'reference', 'openReport' ];
  if (req.body.test && testOptions.indexOf(req.body.test) >= 0) {
    commandToRun = req.body.test;
  }

  if (commandToRun !== '') {
    backstop(commandToRun, { config: projectConfig });
  }
  res.end('OK');
});

app.listen(3000, function () {
  console.log('Started on PORT 3000');
});

function setScenariosForProject (config) {
  const urls = [
    {
      'label': 'Home',
      'url': 'https://www.google.com/'
    },
    {
      'label': 'Result',
      'url': 'https://www.google.com/search?q=news'
    }
  ];

  return urls.map(url => {

    return {
      'label': url.label,
      'url': url.url,
      'delay': 2000,
      'misMatchThreshold': 0.1
    };
  });

}
