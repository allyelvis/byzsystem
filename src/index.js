// index.js

const { exec } = require("child_process");
const path = require("path");

// Define the path to the server.js file
const serverPath = path.join(
  __dirname,
  "byzsystem",
  "aenzbi_management",
  "server.js",
);

// Execute the server.js file
exec(`node ${serverPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Server stderr: ${stderr}`);
    return;
  }
  console.log(`Server stdout: ${stdout}`);
});
