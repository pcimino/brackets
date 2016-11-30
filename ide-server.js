// ide-server.js
// Not sure if it's because I'm new to brackets or what but the README isn't really clear on how this is supposed to work
// I'm not currently making any changes beyond documentation so can install node-ide
// follow this process for an empty project, or adapt it to an existing
//     npm init
//     npm install node-ide   {NOTE: installing globally, npm couldn't find the package}
// Next take this file and copy it to your project/server.js
// Modify the MY_PROJECT_DIR variable at the top to match your directory
// be sure to create a subdirectory in your project named 'brackets', this is where preferences and bracket extensions get stored
//     mkdir brackets
//     npm start
// Navigate to the URL
//     http://localhost:9092/brackets/
// At this point the nodeserver seems to crash for me after the page loads
// Keep the browser open and restart the server
// npm start
 
var MY_PROJECT_DIR = 'test'; 
var path = require("path"),
    http = require("http"),
    brackets = require("node-ide/lib/server"),
    server = http.createServer(function(req,res) {});
require('child_process').spawn('node',
   [
      path.join(__dirname, "node_modules", "node-ide", "lib", "run.js"),
      '--port', '9092',
      '--proj-dir', path.join(__dirname, "..", "$MY_PROJECT_DIR" ),
      '--supp-dir', path.join(__dirname, "..", "$MY_PROJECT_DIR/brackets"),
      '--user-domains', 'false'
   ]);
 
var options = {
   httpRoot: "/brackets",
   projectsDir: path.join(__dirname, "..", "$MY_PROJECT_DIR" ),
   supportDir: path.join(__dirname, "..", "$MY_PROJECT_DIR/brackets"),
   allowUserDomains: false,
};
 
brackets.start(server, options);
server.listen(9092);
console.log("You can access Brackets on http://localhost:9092/brackets/");
