var http=require('http');

var server=http.createServer(handleRequest);

function handleRequest(req,res) {
    
}

server.listen(7000,()=>{
    console.log('Server listening at port 7000');
})