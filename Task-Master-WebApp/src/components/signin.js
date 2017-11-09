// the component handling the signin process
// every component will emit an event name which the obsever class will handle and delegate the tasks 
// among the components

// The "body" is the DOM object from the tag <main> or <footer>

import TaskMaster from "../task-master.js";
import Template from "../templates/signin.js";

class Signin extends TaskMaster {

    constructor(body) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template.render();
        this.body.querySelector("[data-email]").focus();
        this.addEventListener();
    }

    formSubmit() {
        const form = this.body.querySelector("form");

        form.addEventListener("submit", (e) => {
            e.preventDefault(); // don't let the form to be submitted

            const email = e.target.querySelector("[data-email]");
            const password = e.target.querySelector("[data-password]");

            const opts = {
                method: "POST",
                url: `${this.URL}/token`,
                json: true,
                body: {
                    email: email.value,
                    password: password.value
                }
            };

            this.request(opts, (err, resp, data) => {
                if (err || resp.status === 401) {
                    this.emit("error", err);
                } else {
                    this.emit("signin", data.token);
                }
            });
        });
    }

    signupClick() {
        const signup = this.body.querySelector("[data-signup]");
        signup.addEventListener("click", (e) => {
            e.preventDefault();
            this.emit("signup");
        });
    }
}

module.exports = Signin;