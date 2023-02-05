require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {

  gerarToken: (usuario) => {
    try {
      return jwt.sign(usuario, process.env.SECRET);
    } catch (error) {
      console.log("Error: " , error.message);
      throw {
        message: "Erro ao gerar token",
        status: 500,
      }
    }
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      console.log("Error: " ,error.message);
      throw {
        message: "Erro ao autenticar: Token inválido!",
        status: 500,
      }
    }
  }

}