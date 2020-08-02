var path = require("path");
var express = require("express");
var app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

var server = app.listen(process.env.PORT || 3002, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
