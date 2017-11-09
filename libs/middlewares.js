import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import logger from "./logger.js";
import compression from "compression";


module.exports = app => {
    app.set("port", 3000);

    app.set("json spaces", 4);

    // use the module logger to generate the request’s logs. To do this, let’s use the module morgan and include 
    // at the top of the middlewares the function app.use(morgan("common")) to log all requests.
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));

    app.use(helmet());

    app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(compression());

    app.use(bodyParser.json());

    app.use(app.auth.initialize());

    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });

    app.use(express.static("public"));
};