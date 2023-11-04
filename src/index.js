const {Utils, Packages, StartServer, Server} = require("../app-packages.js")
const {Rotas} = require("../routes/routes.js")

StartServer(3000)

Rotas(Server.app)