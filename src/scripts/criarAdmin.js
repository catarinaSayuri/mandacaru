/**
 * criarAdmin.js - Script para criação de usuário administrador padrão
 *
 * Este arquivo é um utilitário que cria um usuário administrador inicial
 * no sistema. É usado para configuração inicial da aplicação, inserindo
 * um admin com credenciais pré-definidas no banco de dados.
 */

// Carrega as variáveis de ambiente do arquivo .env localizado em /src/
require("dotenv").config({
  path: require("path").resolve(__dirname, "/src/.env"),
});

// Importa a configuração de conexão com o banco de dados
const db = require("../config/db"); // ajuste o caminho conforme a estrutura

// Importa o módulo bcrypt para criptografia de senhas
const bcrypt = require("bcrypt");

/**
 * Função assíncrona para criar um administrador padrão
 * Insere um novo registro na tabela 'administradores' com dados pré-definidos
 * e senha criptografada usando bcrypt
 */
async function criarAdmin() {
  // Define os dados do administrador padrão
  const nome = "Admin Exemplo";
  const email = "admin@teste.com";
  const senhaTexto = "senha123";

  // Criptografa a senha usando bcrypt com salt de 10 rounds
  const senhaCriptografada = await bcrypt.hash(senhaTexto, 10);

  try {
    // Executa a query de inserção no banco de dados
    await db.query(
      "INSERT INTO administradores (nome_completo, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhaCriptografada]
    );

    // Confirma a criação bem-sucedida do administrador
    console.log("Administrador criado com sucesso!");
  } catch (err) {
    // Captura e exibe erros que possam ocorrer durante a inserção
    console.error("Erro ao criar administrador:", err);

    
  } finally {
    // Encerra o processo independentemente do resultado
    process.exit();
  }
}

// Executa a função de criação do administrador
criarAdmin();
