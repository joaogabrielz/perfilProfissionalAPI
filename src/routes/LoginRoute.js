const express = require("express");
const router = express.Router();

const loginService = require("../services/LoginService");

router.post("/", async (req, res) => {
  try {
    let response = await loginService.autenticar(req.body);
    res.json(response);
  } catch (error) {
    console.log(JSON.stringify(error))
    res.status(error.status).json({
      message: error.message,
    });
  }
});

module.exports = router;
