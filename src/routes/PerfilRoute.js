const express = require('express');
const router = express.Router();

const perfilService = require('../services/PerfilService');
const { verificarCredenciais } = require('../Middlewares/AutenticacaoMiddleware');


router.get('/', async (req, res) => {
  
  try {
    const response = await perfilService.buscarUltimosPerfis();
    res.json(response);
  }
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.get('/:id', async (req, res) => {

  try {
    const response = await perfilService.buscarPerfilPorId(req.params.id);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.post('/', async (req, res) => { 

  try {
    const response = await perfilService.cadastrarPerfil(req.body);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.put('/:id', verificarCredenciais, async (req, res) => {

  try {
    const response = await perfilService.editarPerfil(req.params.id, req.body);
    res.json(response);
  }  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }

});

router.post('/conexao',verificarCredenciais, async (req, res) => {

  try {
    const response = await perfilService.conectarPerfis(req.body);
    res.json(response);
  } 
  catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status ?? 500).json({
      message: error.message,
    });
  }
  
})

module.exports = router;