/*
Testing the token.js file in routes, which is responsible for generating tokens for authenticated users
This will have 4 tests:
1. Request authenticated by a valid user
2. Request with a valid email but a wrong password
3. Request with a unregistered email
4. Request without a email and a password
*/

// with beforeEach(), we'll be clearing the user table and making a new user everytime we hit the test
// this will allow us to test the main flow of the routes

describe("Routes: Token", () => {
    const Users = app.db.models.Users;

    describe("POST /token", () => {
        beforeEach(done => {
            // Runs before each test
            debugger;
            Users
                .destroy({ where: {} }) // clear everything in the user table
                .then(() => {
                    Users.create({
                        name: "Jhon Tyagi",
                        email: "aditya@mail.com",
                        password: "12345"
                    });
                })
                .then(() => {
                    done();
                });
        });

        describe("status 200", () => {
            it("returns authenticated user token", done => {
                // sending the email and password of a valid user
                request.post("/token")
                    .send({
                        email: "aditya@mail.com",
                        password: "12345"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys(['token']);
                        done(err);
                    });
            });
        });

        // 401: Unauthorized Access Status Code
        // here we test if the request returns the status 401
        describe("status 401", () => {
            it("Throws error when password is incorrect", done => {
                // Test's Logic
                request.post("/token")
                    .send({
                        email: "aditya@mail.com",
                        password: "456789"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });

            it("throws error when e-mail does not exist", done => {
                // Test's logic
                request.post("/token")
                    .send({
                        email: "ayush@mail.com",
                        password: "12345"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });

            it("Throws error when email and password are blank", done => {
                // Test's logic
                request.post("/token")
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    });
            });
        });
    });
});