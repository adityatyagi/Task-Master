// before this file, tasks2.js was created. This is the upgraded file of tasks.js
// CRUDIFY the tasks resource
// 1: Create outline of the needed routes to manage

// http://docs.sequelizejs.com/manual/tutorial/models-usage.html
// http://mongoosejs.com/docs/2.7.x/docs/finding-documents.html

// after user authentication and token generation's logic, we use app.auth.authenticate() to validate
// the token sent by clients and allow/deny them access to the routes/app
// When a client sends a valid token, their access will be authenticated successfully and the object
// req.user appears to be used inside the route. This object (user) is only created when auth.js returns true

module.exports = app => {
    const Tasks = app.db.models.Tasks;

    // route: /tasks
    app.route('/tasks')
        .all(app.auth.authenticate())
        .get((req, res) => {
            // middleware for getting the tasks list
            // will display/send all the data from the "tasks" models
            Tasks.findAll({
                    where: { user_id: req.user.id }
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message }); // 412: precondition failed
                });
        })
        .post((req, res) => {
            // middleware for saving new task
            req.body.user_id = req.user.id;
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    // route: /tasks/:id
    app.route('/tasks/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {
            // middleware for finding a particular task by task id
            Tasks.findOne({
                    where: {
                        id: req.params.id, // task id
                        user_id: req.user.id // user id
                    }
                })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404); // 404: Not Found
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            // middleware for updating details of a particular task identified by it's  id
            Tasks.update(req.body, {
                    where: {
                        id: req.params.id,
                        user_id: req.body.id
                    }
                }) // this uses "req.params.id" to work 
                .then(result => res.sendStatus(204)) // 204: No Content, but the request is a success
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            // middleware for deleting a particular task
            Tasks.destroy({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                })
                .then(result => res.sendStatus(204)) // request to delete is a success but no content to respond
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });
};