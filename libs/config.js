/*
Our application will have to load the settings from a test
or development environment. By default, the development will be defined when "process.env.NODE_ENV" returns 
null or an empty string.
*/

module.exports = app => {
    const env = process.env.NODE_ENV;
    if (env) {
        return require(`./config.${env}.js`);
    } else {
        return require("./config.development.js");
    }
};