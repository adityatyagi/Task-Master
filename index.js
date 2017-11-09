import express from "express";
import consign from "consign";

const app = express();

// using the model-view-router (MVR) to load the modules in a proper sequence
// disable the logs created by the consign module via consign({verbose: false}) settings to not 
// pollute the test report.
consign({ verbose: false })
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

module.exports = app;
// we are going to export our main API module, so that it can be started during the test
// now the app will be started automatically using supertest module



// importing "models" directory using consign is eliminated because all the models are not imported 
// directly using db.js using "sequelize.import()"