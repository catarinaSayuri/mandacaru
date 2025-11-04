/**
 * enderecoRoutes.js - Rotas responsáveis pelas operações de endereços
 *
 * Este arquivo define todas as rotas relacionadas aos endereços do sistema,
 * incluindo listagem de todos os endereços e criação de novos endereços.
 * Atua como intermediário entre as requisições HTTP e os controllers de endereço.
 */

// Importa o módulo 'express', que será usado para criar o roteador
const express = require("express");

// Cria um novo roteador usando o Router do Express
const router = express.Router();

// Importa o controller de endereços, onde está a lógica das ações relacionadas a endereços
const enderecoController = require("../controllers/enderecoController");

/**
 * Rota GET para obter todos os endereços cadastrados
 * Retorna uma lista completa de endereços disponíveis no sistema
 * Endpoint: GET /
 */
router.get("/", enderecoController.buscarTodosEnderecos);

/**
 * Rota POST para criar um novo endereço
 * Recebe dados do endereço no corpo da requisição e os persiste no banco
 * Endpoint: POST /
 */
router.post("/", enderecoController.criarEndereco);

// Exporta o roteador para que ele possa ser usado no arquivo principal da aplicação (ex: app.js)
module.exports = router;
