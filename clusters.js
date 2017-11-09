// This is used to run multiple parallel process on a single port.

import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();

if (cluster.isMaster) {
    CPUS.forEach(() => cluster.fork());

    cluster.on("listening", worker => {
        console.log("Cluster %d connected.", worker.process.pid);
    });

    cluster.on("disconnect", worker => {
        console.log("Cluster %d disconnected.", worker.process.pid);
    });

    cluster.on("exit", worker => {
        console.log("Cluster %d is dead.", worker.process.pid);

        cluster.fork(); // ensures to start a new cluster if old one dies
    });
} else {
    require('./index.js');
}