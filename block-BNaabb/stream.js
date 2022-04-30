var http=require('http');


var server=http.createServer(handleRequest);

function handleRequest(req,res){

    var store=""; 
    req.on('data',(chunk)=>{
        store=chunk+store;
    });

    req.on('end',()=>{
        res.write(store);
        res.end();
    });
    
   
}

server.listen(3456,()=>{
    console.log(`Server listening on port 3456`);
})