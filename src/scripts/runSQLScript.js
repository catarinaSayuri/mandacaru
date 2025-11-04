/**
 * runSQLScript.js - Executor de scripts SQL para inicialização do banco
 *
 * Este arquivo é responsável por executar scripts SQL no banco de dados,
 * especificamente o arquivo init.sql que contém a estrutura das tabelas.
 * É usado para setup e inicialização automática do banco de dados.
 */

// Importa o módulo 'fs' para operações de sistema de arquivos
const fs = require("fs");

// Importa o módulo 'path' para manipulação de caminhos de arquivos
const path = require("path");

// Importa a classe Pool do PostgreSQL para gerenciamento de conexões
const { Pool } = require("pg");

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

/**
 * Configuração do pool de conexões PostgreSQL
 * Utiliza variáveis de ambiente para configuração segura da conexão
 * Inclui configuração SSL para conexões em produção
 */
const pool = new Pool({
  // Usuário do banco de dados obtido das variáveis de ambiente
  user: process.env.DB_USER,

  // Host/servidor do banco de dados
  host: process.env.DB_HOST,

  // Nome do banco de dados
  database: process.env.DB_DATABASE,

  // Senha do banco de dados
  password: process.env.DB_PASSWORD,

  // Porta de conexão do banco de dados
  port: process.env.DB_PORT,

  // Configuração SSL para conexões seguras
  ssl: {
    // Permite conexões SSL mesmo com certificados não verificados
    rejectUnauthorized: false,
  },
});

/**
 * Função assíncrona para executar script SQL
 * Lê o arquivo init.sql e executa seu conteúdo no banco de dados
 * Gerencia conexões e trata erros durante a execução
 */
const runSQLScript = async () => {
  // Constrói o caminho completo para o arquivo init.sql
  const filePath = path.join(__dirname, "init.sql");

  // Lê o conteúdo do arquivo SQL como string UTF-8
  const sql = fs.readFileSync(filePath, "utf8");

  try {
    // Executa o script SQL completo no banco de dados
    await pool.query(sql);

    // Confirma a execução bem-sucedida do script
    console.log("Script SQL executado com sucesso!");
  } catch (err) {
    // Captura e exibe erros que possam ocorrer durante a execução
    console.error("Erro ao executar o script SQL:", err);
  } finally {
    // Encerra o pool de conexões independentemente do resultado
    await pool.end();
  }
};


// Executa a função de execução do script SQL
runSQLScript();
