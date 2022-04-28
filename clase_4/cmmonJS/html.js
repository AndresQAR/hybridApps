const fs = require('fs');

function enviarHTML(path,res){
    fs.readFile(path, function(err, data){
        if(!err){
            res.write(data)
            res.end()
        }else{
            res.write('<h1>Me parece que te mandaste un 404 pa...</h1>')
            res.end()
        }
        
    })
}

module.exports = {
    enviarHTML
}