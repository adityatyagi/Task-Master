// creating a connection file between sequelize and sqlite3
// This connection code adopts the "singleton pattern" to ensure that the Sequelize connection will be
// instantiated only once. This is going to allow us to import the module multiple times with 
// single db connection

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

let db = null;
module.exports = app => {
    if (!db) {
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };


        // LOADS ALL THE MODELS FROM THE DIRECTORY "models"
        const dir = path.join(__dirname, "models");
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        // ENSURES MODELS RELATIONSHIPS
        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }
    return db;
};


//  fs.readdirSync(dir).forEach(file) ---> returns an array of strings referring to the file names from the 
//                                         directory "models"

// Then this array is iterated to import and load all models using sequelize.import(modelDir)









/*
const config = require('./libs/config.js');
let sequelize = null;
module.exports = () => {
    if (!sequelize) {
        sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
    }
    return sequelize;
};
*/