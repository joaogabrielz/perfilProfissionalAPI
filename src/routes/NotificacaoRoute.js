const express = require('express');
const router = express.Router();

const notificacaoService = require('../services/NotificacaoService');
const { verificarCredenciais } = require('../Middlewares/AutenticacaoMiddleware');


router.get('/:id', verificarCredenciais, async (req, res) => {
  try {
    const response = await notificacaoService.buscarNotificacaoPorId(req.params.id);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }
});

router.get('/perfil/:id', verificarCredenciais, async(req, res) => {

  try {
    const response = await notificacaoService.buscarNotificacaoPorPerfilId(req.params.id);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.post('/', verificarCredenciais, async (req, res) => {

  try {
    const response = await notificacaoService.cadastrarNotificacao(req.body);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.put('/lida/:id', verificarCredenciais, async (req, res) => {

  try {
    const response = await notificacaoService.marcarNotificacaoComoLida(req.params.id);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }
 
});

module.exports = router;