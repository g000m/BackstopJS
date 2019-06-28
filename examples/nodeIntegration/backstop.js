const _ = require('lodash');
const args = require('yargs').argv;
const backstop = require('backstopjs');


let projectConfig = require("./backstop.config.js")({
    "project": args.p,
    "scenarios": setScenariosForProject()
});

if( args.c ) {
    projectConfig = JSON.parse(args.c);
}

let commandToRun = "";

if( args.reference ) {
    commandToRun = "reference";
}

if( args.test ) {
    commandToRun = "test";
}

if( args.openReport ) {
    commandToRun = "openReport";
}

if( "" !== commandToRun ) {
    backstop(commandToRun, { config: projectConfig });
}


function setScenariosForProject() {
    const urls = [
        {
            "label" : "Home",
            "url" : "https://www.google.com/"
        },
        {
            "label" : "Result",
            "url" : "https://www.google.com/search?q=news"
        }
    ];

    scenarios = urls.map(url => {
        // const scenarioLabel = file.split(".")[0].split("-").join(" ");

        return {
            "label": url.label,
            "url": url.url,
            "delay": 2000,
            "misMatchThreshold" : 0.1
        }
    });

    return scenarios;
}
