import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;

    let token;

    beforeEach(done => {
        // runs before each test
        Users
            .destroy({ where: {} })
            .then(() => Users.create({
                name: "Anant",
                email: "anant@gmail.com",
                password: "anant12345"
            }))
            .then(user => {
                token = jwt.encode({ id: user.id }, jwtSecret);
                done();
            });
    });

    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                // This sends a token and recieves the user's data created in beforeEach(): valid user
                request.get('/user')
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Anant");
                        expect(res.body.email).to.eql("anant@gmail.com");
                        done(err);
                    });

            });
        });
    });

    describe("DELETE /user", () => {
        describe("status 204", () => {
            it("deletes an authenticated user", done => {
                // you just need to send a token and wait for the 204 response
                request.delete("/user")
                    .set("Authorization", `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });

    // create a new user doesnt require a token, it is an open route for new user to register an account in API
    describe("POST /users", () => {
        describe("status 200", () => {
            it("creates a new user", done => {
                //Test's logic
                request.post("/users")
                    .send({
                        name: "Saksham",
                        email: "saksham@gmail.com",
                        password: "sam789"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Saksham");
                        expect(res.body.email).to.eql("saksham@gmail.com")
                        done(err);
                    });
            });
        });
    });

});