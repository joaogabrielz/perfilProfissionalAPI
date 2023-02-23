const perfilModel = require('./../models/Perfil');
const bcrypt = require('bcrypt');

module.exports = {

  buscarUltimosPerfis: async (req, res) => {
    try {
      return await perfilModel.find().sort({ _id: -1 }).limit(5);
    } 
    catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  buscarPerfilPorId: async (id) => { 
    try {
      return await perfilModel.findOne({ _id: id });
    } 
    catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

  cadastrarPerfil: async (perfil) => {
    try {

      perfil.usuario.senha = await bcrypt.hash(perfil.usuario.senha, 10);

      let novoPerfil = await perfilModel.create(perfil);
      novoPerfil.usuario.senha = undefined;

      return novoPerfil;
    } 
    catch (error) {
      throw { message: error.message, status: 500 };
    }
  },


  editarPerfil: async (id, perfil) => {
    try {
      const { usuario } = await perfilModel.findOne({_id: id})
      .select("usuario.senha")
      .exec()
      perfil.usuario.senha = usuario.senha
      return await perfilModel.updateOne({ _id: id }, perfil);
    } 
    catch (error) {
      throw { message: error.message, status: 500 };
    }
},


  conectarPerfis: async (info) => {
    try {
      let remetente  = await perfilModel.findOne({ _id: info.remetente });
      let destinatario  = await perfilModel.findOne({ _id: info.destinatario });

      if(!info.remetente || !info.destinatario){
        throw { message: `Perfil não encontrado`, status: 404 };
      }
      else if(info.remetente == info.destinatario){
        throw { message: `Erro ao definir conexao, Um Perfil não pode conectar-se a si mesmo`, status: 400 };
      }
      else{
        remetente.conexoes.push(destinatario);
        destinatario.conexoes.push(remetente);


        await perfilModel.updateOne({ _id: remetente._id }, { $set: { conexoes: remetente.conexoes }})
        await perfilModel.updateOne({ _id: destinatario._id }, { $set: { conexoes: destinatario.conexoes }})
      }

      return { message: "Conexão estabelecida com sucesso!", status: 200}
    } 
    catch (error) {
      throw { message: error.message, status: 500 };
    }
  },

}




