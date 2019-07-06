// const _ = require('lodash');
const args = require('yargs').argv;
const backstop = require('backstopjs');
let projectConfig;

projectConfig = require('./backstop.config.js')({
  'project': args.p,
  'scenarios': setScenariosForProject()
});

// if (args.c) {
//   projectConfig = JSON.parse(args.c);
// }

if (args.c) {
  const configFile = args.c;
  // projectConfig =

  var fs = require('fs');
  const content = fs.readFileSync(configFile);
  let config = JSON.parse(content);
  config.id = args.p;
  projectConfig.scenarios = config.scenarios;
}

let commandToRun = '';

if (args.reference) {
  commandToRun = 'reference';
}

if (args.test) {
  commandToRun = 'test';
}

if (args.openReport) {
  commandToRun = 'openReport';
}

if (commandToRun !== '') {
  backstop(commandToRun, { config: projectConfig });
}

function setScenariosForProject () {
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
