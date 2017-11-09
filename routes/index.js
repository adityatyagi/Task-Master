// this will render the homepage
module.exports = app => {
    app.get('/', (req, res) => {
        res.json({ status: "This is the homepage" });
    });
};