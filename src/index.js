const app = require('./server');
require('dotenv').config();
require('process');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;

process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1)
});

app.listen(port, hostname, () => {
  //console.log(` Perfil Profissional API running at http://${hostname}:${port}... `);
  console.log(` Perfil Profissional API running at PORT:${port}... `);
});
