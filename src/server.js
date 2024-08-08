const express = require('express');
const router = require('./router/router');
const sequelize = require('./config/config');
const User = require("./models/User")
const app = express();
// modelo da api em JSON
app.use(express.json());
app.use('/api/user', router);

// RES - response
app.get('/healthcheck', (req, res) =>{
    return res.status(200).json({
        msg: 'Estamos vivos!',
        alive:true
    });
});

// listen ouvir, ou seja, em qual porta está funcionando a aplicação
sequelize.authenticate()
.then(async() => {
    console.log("Connexão establecida com sucesso");
    await sequelize.sync();
})
.then(() =>{
    app.listen(8080, () =>{
        console.log("==========================");
        console.log("FUNCIONANDO NA PORTA 8080");
        console.log("==========================");
    });
})
.catch((error) => {
    console.log("Erro ao se conectar com o banco:", error);
});