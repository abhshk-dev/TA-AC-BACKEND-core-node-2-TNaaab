
var http=require('http');
var qs=require('querystring');

var server=http.createServer(handleRequest);

function handleRequest(req,res) {
    if(req.method==='POST' && req.url==='/'){
        var store='';
        req.on('data',(chunk)=>{
            store+=chunk;
        })
        req.on('end',()=>{
            res.statusCode=201;
            var parsedData=qs.parse(store);
            res.end(JSON.stringify(parsedData))
        })
    }
    
    
    
}

server.listen(7000,()=>{
    console.log(`Server listening on port 7000`)
})
