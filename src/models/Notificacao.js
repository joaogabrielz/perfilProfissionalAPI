const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificacaoSchema = new Schema({
    tipo: {
      type: String,
      enum: ['Contato', 'Solicitação de Amizade'],
      required: true
    },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    lida: { type: Boolean, required: true },
    remetente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfil'
    },
    destinatario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfil'
    }
  }, 
{ timestamps: true });

module.exports = mongoose.model('Notificacao', notificacaoSchema);