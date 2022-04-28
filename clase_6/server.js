import http from 'http';
import {enviarHTML} from './html.js';
http.createServer(function(req, res){
    console.log("Hola, alguien entro :D")
    let recurso = req.url

    if(recurso === '/andy.html'){
        enviarHTML('./views/andy.html', res)  
         
    }else if(recurso === '/nadie.html'){
        enviarHTML('./views/nadie.html', res)

    }else{
        res.write('<h1>Te mandas un 404 amigo...</h1>')
        res.end()
    }

}).listen(1847)
