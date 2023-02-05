
const tokenUtil = require('../utils/TokenUtil');

module.exports = {

  verificarCredenciais: (req, res, next) => {
   const token = req.headers.token;

   if(!token){
    res.status(401).json({
      message: "Autenticação necessária!"
     })
   } 
   else {
    try {
      tokenUtil.verifyToken(token);
      next();
    } catch (error) {
      res.status(error.status).json({
        message: error.message
      })
    }

   }
  
  }
}