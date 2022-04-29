let http=require('http');
let fs=require('fs');

var server=http.createServer(handleServer);

function handleServer(req,res){
    var file=fs.createReadStream('./readme.txt');
    res.end(file.toString());
}

server.listen(3000,()=>{
    console.log(`Server listening at 3000`);
})