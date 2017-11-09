// Building the parent class TaskMaster which has two important attributes which all its children will inherit
// this.URL (contains the API URL address) and this.request (contains the browser-request module loaded).
// This will help us create the component classes


import TinyEmitter from "tiny-emitter";
import request from "browser-request";

class NTask extends TinyEmitter {
    constructor() {
        super();
        this.request = request;
        this.URL = "https://localhost:3000";
    }
}

module.exports = NTask;