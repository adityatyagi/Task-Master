/*
the rorute created in token.js, (/token)
it is responsible for generating an encoded token with a payload for authenticated users.
this payload will be sent to the user that submits right email and password
the paylaod will have only id as an attribute which other routes will be using to see if the request
has come from a logged in user or not 

The token generation via module: jwt-simple
*/

import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.Users;

    app.post('/token', (req, res) => {
        // check to see if the user entered both the email and password to login
        if (req.body.email && req.body.password) {

            const email = req.body.email;
            const password = req.body.password;

            // search the database for a user with the incoming email id
            Users.findOne({ where: { email: email } })
                .then(user => {
                    // check if the passowrd entered by the user during login attempt matches the one in db
                    // user.password -> from db
                    // password -> the one entered by the user while attempting to login
                    if (Users.isPassword(user.password, password)) {
                        // password and email authentic, now create a token
                        const payload = { id: user.id };

                        // creating the response
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401); // Unauthorized access
                    }
                })
                .catch(error => res.sendStatus(401));
        } else {
            // if either the username or password is missing during the login attempt
            res.sendStatus(401);
        }
    });
};