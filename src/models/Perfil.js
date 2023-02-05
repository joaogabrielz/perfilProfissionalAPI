const mongoose = require('mongoose');
const { Schema } = mongoose;

const perfilSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  disponibilidadeMudanca: {
    type: Boolean,
    required: true
  },
  disponibilidadeHorario: {
    type: String,
    enum: ['Meio Periodo', 'Integral'],
    required: true
  },
  usuario: {
    email: { 
      type: String, 
      required: true, 
      unique: true
    },
    senha: { 
      type: String, 
      required: true,
      select: false
    }
  },
  educacao: [
    {
      instituicao: { type: String },
      ingresso: { type: Date },
      conclusao: { type: Date },
      nivelEscolaridade: { 
        type: String,
        enum: [
          'Ensino Fundamental', 
          'Ensino Médio',
          'Ensino Superior',
          'Pós-graduação',
          'Mestrado',
          'Doutorado'
        ],
        required: true
      },
    }
  ],
  certificacoes: [
    {
      instituicao: { type: String },
      titulo: { type: String },
      cargaHoraria: { type: Number },
    }
  ],
  conexoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Perfil',
    }
  ]
},
{ timestamps: true });

module.exports = mongoose.model('Perfil', perfilSchema);