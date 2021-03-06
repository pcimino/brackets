#!/usr/bin/env node

var commander   = require("commander"),
    brackets    = require("./server"),
    pkg         = require("../package.json"),
    open        = require("open"),
    path        = require("path"),
    homeDir     = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || process.cwd();

commander
    .version(pkg.version)
    .option("-p, --port <port>", "Specifies TCP <port> for Brackets service. The default port is 6800.")
    .option("-o, --open", "Opens Brackets in the default web browser.")
    .option("-s, --supp-dir <path>", "Specifies the root directory for Brackets supporting files such as user extensions, configurations and state persistence. The default locations is ~/runtime/data.")
    .option("-j, --proj-dir <path>", "Specifies the root directory for projects. The default locations is ~/runtime/root.")
    .option("-d, --user-domains", "Allows Node domains to be loaded from user extensions.")
    .parse(process.argv);

brackets.start(commander.port, {
    supportDir: commander.suppDir || path.join(homeDir, "runtime","data"),
    projectsDir: commander.projDir || path.join(homeDir, "runtime","root"),
    allowUserDomains: commander.userDomains
});

if (commander.open) {
    open("http://localhost:" + brackets.httpServer.address().port);
}
