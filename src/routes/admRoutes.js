/**
 * admRoutes.js - Rotas responsáveis pelas operações de administradores
 *
 * Este arquivo define todas as rotas relacionadas aos administradores do sistema,
 * incluindo renderização da página de login e processamento da autenticação.
 * Atua como intermediário entre as requisições HTTP e os controllers de administração.
 */

// Importa o módulo 'express' para criar rotas
const express = require("express");

// Cria um novo roteador do Express para definir rotas específicas deste módulo
const router = express.Router();

// Importa o controller do administrador, que contém a lógica das requisições
const admController = require("../controllers/admController");

/**
 * Rota GET para exibir a página de login do administrador
 * Renderiza a view de login quando acessada pelo navegador
 * Endpoint: GET /login
 */
router.get("/login", (req, res) => {
  // Renderiza a página de login do administrador
  res.render("pages/loginAdm_v1", {
    pageTitle: "Painel de Login", // Título da página, enviado para a view
  });
});

/**
 * Rota POST para processar os dados do formulário de login
 * Recebe credenciais e chama o controller para autenticação
 * Endpoint: POST /login
 */
router.post("/login", admController.login);


router.get("/gerenciamento", (req, res) => {
  // Renderiza a página de login do administrador
  res.render("pages/gerenciamentoPagina", {
    pageTitle: "Painel de Administração", // Título da página, enviado para a view
  });
});
// Exporta o roteador para ser usado no arquivo principal da aplicação (geralmente app.js ou server.js)
module.exports = router;
