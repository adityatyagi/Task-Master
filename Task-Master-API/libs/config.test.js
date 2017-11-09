module.exports = {
    database: "task-master",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "task-master.sqlite",
        logging: false, // disables the SQL log output
        define: {
            underscored: true // standardizes the table field's names to appear in lowercase with _
        }
    },
    jwtSecret: "Task-Manager-api",
    jwtSession: { session: false } // informs Passport that the api will not manage the sessions
};