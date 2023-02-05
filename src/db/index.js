const mongooseODM = require('mongoose');
require('dotenv').config();
const currentEnv = process.env;

const { DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,  DB_OPTIONS } = currentEnv;
const URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`

let db;

module.exports = {

  connect: async () => {
    //console.log(`Tentando Conexão com banco: ${URI}`)
    try {
      mongooseODM.set("strictQuery", true);
      db = await mongooseODM.connect(URI);
      console.log(" Conectado ao MongoDB...\n");
    } catch (error) {
      console.log("\n")
      console.log(" Erro ao conectar ao Banco de Dados: " + error);
    }
  },

  getDB: () => {
    return db;
  }

}

