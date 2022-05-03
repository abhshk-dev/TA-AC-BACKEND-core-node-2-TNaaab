var http = require("http");
var fs = require("fs");

var usersPath = __dirname + "/users/";
var server = http.createServer(handleRequest);
var qs = require("querystring");
var url = require("url");

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    //Creating User
    if (req.method === "POST" && req.url === "/users") {
      let username = JSON.parse(store).username;
      fs.open(usersPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created Sucessfully`);
          });
        });
      });
    }

    //Reading User
    if (parsedUrl.pathname === "/users" && req.method === "GET") {
      //console.log(parsedUrl);
      var username = parsedUrl.query.username;
      fs.readFile(usersPath + username + ".json", (err, content) => {
        if (err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        return res.end(content);
        //console.log(err,content)
      });
    }

    //Updating User
    if (parsedUrl.pathname === "/users" && req.method === "PUT") {
      var username = parsedUrl.query.username;
      fs.open(usersPath + username + ".json", "r+", (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} updated sucessfully`);
            });
          });
        });
      });
    }

    if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
      var username = parsedUrl.query.username;
      fs.unlink(usersPath + username + ".json", (err) => {
        if (err) return console.log(err);
        return res.end(`${username} is deleted`);
      });
    }

    res.statusCode = 404;
    res.end("Page Not Found");
  });
}

server.listen(4000, () => {
  console.log(`Server listening on 4000`);
});
