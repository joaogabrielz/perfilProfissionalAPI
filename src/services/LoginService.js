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
              email: perfilComEmailEncontrado.usuario.email,
              perfil: perfilComEmailEncontrado._id,
            };
          }
        }

        throw {
          message: "Erro ao efetuar Login, Credenciais Inválidas!",
          status: 200,
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
