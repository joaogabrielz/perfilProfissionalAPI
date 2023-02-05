const notificacaoModel = require('./../models/Notificacao');

module.exports = {

  buscarNotificacaoPorId: async (id) => {
    try {
      return await notificacaoModel.findOne({ _id: id });
    } 
    catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  buscarNotificacaoPorPerfilId: async (perfilId) => {
   try {
    return await notificacaoModel.find({ 
      $or: [{ remetente: perfilId }, { destinatario: perfilId }] 
    });
   } 
   catch (error) {
    throw { message: error.message, status: 500 }
   }
  },

  cadastrarNotificacao: async (notificacao) => {
    try {
      return await notificacaoModel.create(notificacao);
    } 
    catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

  marcarNotificacaoComoLida: async (id) => {
    try {
      let notificacaoLida = await notificacaoModel.findOne({ _id: id });
      if(!notificacaoLida.lida){
        notificacaoLida.lida = true;
        return await notificacaoModel.updateOne({ _id: id }, notificacaoLida);
      }
      return { message: "Notificação já lida", status: 200 };
    } 
    catch (error) {
      throw { message: error.message, status: 500 }
    }
  },

}