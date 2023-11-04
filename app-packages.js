const Packages = {
    express : require("express"),
    bcrypt : require("bcrypt"),
    uid : require("uuid"),
    fs : require("fs"),
    cors : require("cors"),
    bodyparser : require("body-parser"),
    path : require("path"),
    io : require("socket.io"),
}
const Utils = {
    "Save" : Save,
    "SearchJson" : SearchJson,
    "Delete" : Delete
}
const Server = {
    app : Packages.express(),
    httpserver : '',
    io : ''
}

Server.httpserver = require('http').createServer(Server.app)
Server.io = require('socket.io')(Server.server)


function StartServer(PORT){
    //  Configurações do Servidor

    Server.app.set('view engine', 'ejs');
    Server.app.use(Packages.bodyparser.urlencoded({ extended: false }));
    Server.app.use(Packages.bodyparser.json());
    Server.app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    Server.app.use(Packages.express.static('public'));
    Server.app.use(Packages.cors());

    // Abri o server
    Server.httpserver.listen(PORT, () => {
let Str = `
========================================
            Servidor Online
========================================
       Link: http://localhost:${PORT}/      
` 
console.log(Str);
    });
}

function Save(Local,Conteudo){
    Packages.fs.writeFileSync(Local, JSON.stringify(Conteudo))
}
    
function SearchJson(Local){
    return JSON.parse(Packages.fs.readFileSync(Local))
}
    
function Delete(Local){
    Packages.fs.unlink(Local, (err) => {
        if (err) {
            console.error('Erro ao excluir o arquivo:', err);
            return;
        }
            console.log('Arquivo excluído com sucesso!');
        });
}

module.exports = {
    Utils,
    Packages,
    Server,
    StartServer
}