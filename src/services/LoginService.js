const perfilModel = require("./../models/Perfil");
const bcrypt = require("bcrypt");
const tokenUtil = require('./../utils/TokenUtil');

module.exports = {
  autenticar: async (usuario) => {
    try {
      if (usuario.email && usuario.senha) {
        let perfilComEmailEncontrado = await perfilModel.findOne({
          "usuario.email": usuario.email,
        })
        .select("+usuario.senha").exec();

        if (perfilComEmailEncontrado) {
          const match = await bcrypt.compare(
            usuario.senha,
            perfilComEmailEncontrado.usuario.senha
          );

          if (match) {
            const { usuario } = perfilComEmailEncontrado;
            const token = tokenUtil.gerarToken(JSON.stringify(usuario));

            return {
              token: token,
              nome: perfilComEmailEncontrado.nome,
              email: perfilComEmailEncontrado.usuario.email,
              perfil: perfilComEmailEncontrado._id,
            };
          }
          else{
            throw {
              message: "Erro ao efetuar Login, Credenciais inválidas",
              status: 400,
            };
          }
        }
        
        throw {
          message: "Erro ao efetuar Login, Usuario Não Encontrado",
          status: 404,
        };

      } else {
        throw {
          message: "Erro ao efetuar Login, Credenciais Inválidas!",
          status: 400,
        };
      }
    } catch (error) {
      console.log(`\n Error: ${error.message} \n`);
      throw error;
    }
  },
};
