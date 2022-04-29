var http=require('http');
var fs=require('fs');

var server=http.createServer(handleServer);

function handleServer(req,res){
    res.setHeader('Content-Type','text/plain');
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(4000,()=>{
    console.log(`Server listening at 4000`);
})