var http=require('http');


var server=http.createServer(handleRequest);

function handleRequest(req,res){

    var store=""; 
    req.on('data',(chunk)=>{
        store=chunk+store;
    });

    req.on('end',()=>{
        console.log(store);
    });
    
    res.write(store,'utf-8',()=>{
        console.log(`sending response, ${store}`);
    });
}

server.listen(3456,()=>{
    console.log(`Server listening on port 3456`);
})