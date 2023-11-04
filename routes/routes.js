const Rotas = function(app){

    app.get('/',(req,res) => {
        res.send('umus')
    })

} 

module.exports = {
    Rotas
}