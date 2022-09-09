var express = require("express");
var server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Welcome to the Dasboard Backend</h1>");
});

module.exports = server;
