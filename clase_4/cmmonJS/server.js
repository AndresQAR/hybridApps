const http = require('http');
const html = require('./html.js');
console.log(html)
http.createServer(function(req, res){
    console.log("Hola, alguien entro :D")
    let recurso = req.url

    if(recurso === '/andy.html'){
        html.enviarHTML('./andy.html', res)
        res.end()
       
    }else if(recurso === '/nadie.html'){
        html.enviarHTML('./nadie.html', res)
        res.end()
    }

}).listen(1847)
