// to simply the server boot
/*
implementing a simple sync function between Sequelize and the database. This sync function performs, if 
necessary, alterations on database tables, according to what is going to be set up on the models. Let’s 
include the app.db.sync() function to ensure this action will be executed before the server starts.

*/

// To avoid the server running twice in the test environment, you need to modify the
// boot.js to run the database sync and have the server listen only when process.env.NODE_ENV does not 
// have the "test" value.

module.exports = app => {
    if (process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`Task-master API - PORT ${app.get("port")}`);
            });
        });
    }
};