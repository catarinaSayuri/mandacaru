/**
 * admService.js - Serviço de gerenciamento de administradores
 *
 * Este arquivo contém a lógica de negócio relacionada aos administradores
 * do sistema, incluindo autenticação, autorização e operações de CRUD.
 * Gerencia login, perfil e atualização de dados dos administradores.
 */

// Importa a configuração de conexão com o banco de dados
const db = require("../config/db");

// Importa o módulo bcrypt para criptografia e comparação de senhas
const bcrypt = require("bcrypt");

// Importa o módulo jsonwebtoken para geração e verificação de tokens JWT
const jwt = require("jsonwebtoken");

// Define a chave secreta para assinatura dos tokens JWT (obtida do .env ou valor padrão)
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

module.exports = {
  /**
   * Realiza autenticação do administrador
   * Verifica credenciais e gera token JWT para sessão autenticada
   * @param {string} email - Email do administrador
   * @param {string} senha - Senha em texto plano
   * @returns {Object|null} Objeto contendo dados do admin e token, ou null se inválido
   */

  async login(email, senha) {
    // Busca administrador no banco de dados pelo email fornecido
    const query = "SELECT * FROM administradores WHERE email = $1";
    const { rows } = await db.query(query, [email]);

    // Verifica se o email existe no sistema
    if (rows.length === 0) {
      console.log("Email não encontrado:", email);
      return null;
    }

    // Obtém os dados do administrador encontrado
    const admin = rows[0];
    console.log("Hash da senha no banco:", admin.senha);

    // Compara a senha fornecida com o hash armazenado no banco
    const validPassword = await bcrypt.compare(senha, admin.senha);
    console.log("Senha válida?", validPassword);

    // Retorna null se a senha não for válida
    if (!validPassword) return null;

    // Gera token JWT com informações do administrador
    // Adicionando isAdm: true no payload do token
    const token = jwt.sign(
      {
        adminId: admin.id_administrador, // ID único do administrador
        isAdm: true, // Flag indicando que é um administrador
      },
      JWT_SECRET, // Chave secreta para assinatura
      { expiresIn: "1m" } // Token expira em 1 minuto
    );

    // Retorna dados do administrador e token de acesso
    return { admin, token };
  },

  /**
   * Obtém perfil do administrador
   * Busca informações básicas do administrador pelo ID
   * @param {string} adminId - UUID do administrador
   * @returns {Object|null} Dados do perfil ou null se não encontrado
   */

  async getProfile(adminId) {
    // Busca dados básicos do administrador (exclui senha por segurança)
    const query =
      "SELECT id_administrador, nome_completo, email FROM administradores WHERE id_administrador = $1";
    const { rows } = await db.query(query, [adminId]);

    // Retorna primeira linha encontrada ou null se não existir
    return rows[0] || null;
  },

  /**
   * Atualiza perfil do administrador
   * Permite atualizar nome, email e opcionalmente a senha
   * @param {string} adminId - UUID do administrador
   * @param {Object} dados - Objeto contendo nome_completo, email e senha (opcional)
   * @returns {Object} Dados atualizados do administrador
   */

  async updateProfile(adminId, { nome_completo, email, senha }) {
    let query, params;

    // Verifica se uma nova senha foi fornecida para atualização
    if (senha) {
      // Criptografa a nova senha usando bcrypt com salt de 10 rounds
      const hash = await bcrypt.hash(senha, 10);

      // Query para atualizar todos os campos incluindo senha
      query = `
        UPDATE administradores 
        SET nome_completo = $1, email = $2, senha = $3 
        WHERE id_administrador = $4 
        RETURNING id_administrador, nome_completo, email
      `;
      params = [nome_completo, email, hash, adminId];
    } else {
      // Query para atualizar apenas nome e email (mantém senha atual)
      query = `
        UPDATE administradores 
        SET nome_completo = $1, email = $2 
        WHERE id_administrador = $3 
        RETURNING id_administrador, nome_completo, email
      `;
      params = [nome_completo, email, adminId];
    }

    // Executa a query de atualização e retorna os dados atualizados
    const { rows } = await db.query(query, params);
    return rows[0];
  },
};
