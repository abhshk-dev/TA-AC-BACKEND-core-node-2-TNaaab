var http=require('http');
var qs=require('querystring');

var server=http.createServer(handleRequest);

function handleRequest(req,res) {
    var store='';
    req.on('data',(chunk)=>{
        store+=chunk;
    });

    req.on('end',()=>{
        if(req.method==='POST'&& req.url==='/'){
            console.log(store);
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(store));
        }

        if(req.method==='POST'&& req.url==='/'){
            var formData=qs.parse(store);
            //res.setHeader('Content-Type','application/form');
            res.end(JSON.stringify(formData));
        }
    })
    
}

server.listen(7000,()=>{
    console.log(`Server listening on port 7000`)
})