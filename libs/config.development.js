// database connection to the api


module.exports = {
    database: "task-master",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "task-master.sqlite",
        define: {
            underscored: true // standardizes the table field's names to appear in lowercase with _
        }
    },
    jwtSecret: "Task-Manager-api",
    jwtSession: { session: false } // informs Passport that the api will not manage the sessions
};

// jwtSecret: keeps a secret key string as a base to encode and decode tokens.