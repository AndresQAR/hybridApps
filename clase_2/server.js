const http = require('http');

http.createServer(function(req, res){
    console.log('Me llamaron')
    res.write('Hola mundo, probando nodeJS')
    res.end()
}).listen(9001);