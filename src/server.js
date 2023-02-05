const express = require('express')
const app = express();
const cors = require('cors');

const perfilRoute = require('./routes/PerfilRoute');
const notificacaoRoute = require('./routes/NotificacaoRoute');
const loginRoute = require('./routes/LoginRoute');

const db = require('./db');
db.connect();


app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/perfil', perfilRoute); 
app.use('/notificacao', notificacaoRoute); 
app.use('/login', loginRoute); 


app.get('/', (req, res) => {
  res.send("Bem vindo a app Perfil Profissional");
})


module.exports = app;
