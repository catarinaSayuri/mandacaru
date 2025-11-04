/**
 * server.js - Servidor principal da aplicação
 *
 * Este módulo inicializa o servidor Express, define as configurações principais
 * (como a engine de visualização EJS), conecta ao banco de dados PostgreSQL
 * e registra as rotas da aplicação. Também implementa middlewares de tratamento
 * de erros e controle de rotas inexistentes.
 */

require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");
const path = require("path");
// Configurações do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco de dados
db.connect()
  .then(() => {
    console.log("Conectado ao banco de dados PostgreSQL");

    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));

    // Rotas principais
    const frontendRoutes = require("./routes/frontRoutes");
    app.use("/", frontendRoutes);

    const admRoutes = require("./routes/admRoutes");
    app.use("/adm", admRoutes);

    const enderecoRoutes = require("./routes/enderecoRoutes");
    app.use("/enderecos", enderecoRoutes);

    const servicoRoutes = require("./routes/servicoRoutes");
    app.use("/servicos", servicoRoutes);

    // Middleware para rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send("Página não encontrada");
    });

    // Middleware de erro interno
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Erro no servidor");
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });


