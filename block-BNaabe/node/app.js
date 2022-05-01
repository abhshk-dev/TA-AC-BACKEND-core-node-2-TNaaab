var http =require('http');
var qs=require('querystring');
var server=http.createServer(handleRequest);

function handleRequest(req,res){
    var store='';
    console.log(req.headers['content-type']);
   req.on('data',(chunk)=>{
       store+=chunk;
   })
   req.on('end',()=>{
       if(req.headers['content-type']==='application/x-www-form-urlencoded'){
           var formData=qs.parse(store);
           res.setHeader('Content-Type','text/html');
           res.end(`<h2>${formData.name}</h2><p>${formData.email}</p>`);
       }
       
       if(req.headers['content-type']==='application/json'){
           var jsonData=JSON.parse(store);
           res.setHeader('Content-Type','text/html');
           res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</p>`);
    }
   })
    
}

server.listen(9000,()=>{
    console.log(`Server listening on port 9000`)
})