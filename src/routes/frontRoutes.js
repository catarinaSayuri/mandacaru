/**
 * frontRoutes.js - Rotas responsáveis pelas páginas do frontend da aplicação
 *
 * Este arquivo define todas as rotas relacionadas às páginas públicas do sistema,
 * incluindo página inicial e página sobre. Gerencia a renderização de views
 * e a passagem de dados para templates do frontend.
 */

// Importa o módulo 'express' para criar rotas
const express = require("express");

// Cria uma instância do roteador do Express
const router = express.Router();

// Importa o módulo 'path' do Node.js para trabalhar com caminhos de arquivos
const path = require("path");

/**
 * Rota GET para a página inicial
 * Renderiza a página principal do site com título e conteúdo personalizáveis
 * Endpoint: GET /
 */
router.get("/", (req, res) => {
  // Renderiza a view da página inicial
  res.render("pages/mapaPagina", {
    pageTitle: "Página Inicial", // Título da página passado para a view
    content: "", // Pode ser usado como conteúdo dinâmico na view
  });
});

/**
 * Rota GET para a página "Sobre"
 * Renderiza a página sobre utilizando o layout principal e incluindo conteúdo específico
 * Endpoint: GET /about
 */

router.get("/sobre", (req, res) => {
  // Renderiza a view da página sobre
  res.render("pages/sobreNosPagina", {
    pageTitle: "Sobre Nós", // Título da página passado para a view
    content: "", // Pode ser usado como conteúdo dinâmico na view
  });
});

router.get("/saude", (req, res) => {
  // Renderiza a view da página sobre
  res.render("pages/saudeMentPagina", {
    pageTitle: "Saúde Mental", // Título da página passado para a view
    content: "", // Pode ser usado como conteúdo dinâmico na view
  });
});

router.get("/esporte", (req, res) => {
  // Renderiza a view da página sobre
  res.render("pages/esportePagina", {
    pageTitle: "Esporte", // Título da página passado para a view
    content: "", // Pode ser usado como conteúdo dinâmico na view
  });
});

router.get("/cultura", (req, res) => {
  // Renderiza a view da página sobre
  res.render("pages/culturaPagina", {
    pageTitle: "Cultura", // Título da página passado para a view
    content: "", // Pode ser usado como conteúdo dinâmico na view
  });
});

// Exporta o roteador para ser usado em outros arquivos da aplicação (como app.js)
module.exports = router;
