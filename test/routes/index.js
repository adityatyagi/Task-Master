// this is the test written to test the functioning of the index.js file
// 1. First it will check if the API (/) is responding with status: 200
// 2. Then it will check if the response body is as expected.
// We will be providing the expected value.

describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get("/")
                .expect(200)
                .end((err, res) => {
                    const expected = { status: "This is the homepage" };
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});