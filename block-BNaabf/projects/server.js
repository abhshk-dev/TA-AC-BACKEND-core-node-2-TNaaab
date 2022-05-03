var http = require("http");
var fs = require("fs");
var qs=require("querystring");
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if(req.url==='/form' && req.method==='GET'){
        res.setHeader('Content-Type','text/html');
        fs.createReadStream('./form.html').pipe(res);
    }
    if(req.url==='/form' && req.method==='POST'){
        var parsedData=qs.parse(store);
        res.setHeader('Content-Type','text/html');
        res.write(`<h2>${parsedData.name}</h2>`);
        res.write(`<h3>${parsedData.email}</h3>`);
        res.write(`<h4>${parsedData.age}</h4>`);

        //console.log(store)
    }
  });
}

server.listen(5678, () => {
  console.log(`Server listening on port 5678`);
});
