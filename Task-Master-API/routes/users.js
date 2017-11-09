module.exports = app => {
    // importing the Users model
    const Users = app.db.models.Users;

    // first we had different middlewares for finding and deleting a particular user that fetches the user id
    // from the route. (/users/:id)
    // Now, we'll combine the two as we are using the user id from the req.user object

    /*
    // find a user
    app.get("/users/:id", (req, res) => {
        Users.findById(req.params.id, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    // delete a user
    app.delete("/users/:id", (req, res) => {
        Users.destroy({ where: { id: req.params.id } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
    */

    app.route('/user')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                    attributes: ["id", "name", "email"]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Users.destroy({ where: { id: req.user.id } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })

    // create a user
    app.post("/users", (req, res) => {
        Users.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};