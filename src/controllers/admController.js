/**
 * admController.js - Controller responsável pelas operações de administradores
 *
 * Este controller gerencia todas as operações relacionadas aos administradores do sistema,
 * incluindo autenticação (login), visualização e atualização de perfil. Atua como intermediário
 * entre as rotas e os serviços de administração, processando requisições e formatando respostas.
 */

// Importa o serviço de administradores para realizar operações de negócio
const admService = require("../services/admService");

module.exports = {
  /**
   * Realiza o login do administrador
   * Recebe email e senha, valida credenciais e retorna dados do admin com token JWT
   */
  async login(req, res) {
    // Extrai email e senha do corpo da requisição
    const { email, senha } = req.body;

    // Chama o serviço para validar as credenciais
    const result = await admService.login(email, senha);

    // Se as credenciais são inválidas, retorna erro 401
    if (!result)
      return res.status(401).json({ message: "Email ou senha inválidos" });

    // Extrai os dados do administrador e o token do resultado
    const { admin, token } = result;

    // Retorna os dados do administrador (sem informações sensíveis) e o token
    res.json({
      admin: {
        id: admin.id_administrador,
        nome_completo: admin.nome_completo,
        email: admin.email,
      },
      token,
    });
  },

  /**
   * Obtém o perfil do administrador logado
   * Utiliza o ID do admin extraído do token JWT para buscar seus dados
   */
  async getProfile(req, res) {
    // Obtém o ID do administrador do middleware de autenticação
    const adminId = req.adminId;

    // Busca os dados do perfil através do serviço
    const admin = await admService.getProfile(adminId);

    // Se o administrador não for encontrado, retorna erro 404
    if (!admin)
      return res.status(404).json({ message: "Administrador não encontrado" });

    // Retorna os dados do perfil do administrador
    res.json(admin);
  },

  /**
   * Atualiza o perfil do administrador logado
   * Permite modificar nome completo, email e senha do administrador
   */
  async updateProfile(req, res) {
    // Obtém o ID do administrador do middleware de autenticação
    const adminId = req.adminId;

    // Extrai os dados a serem atualizados do corpo da requisição
    const { nome_completo, email, senha } = req.body;

    // Chama o serviço para atualizar o perfil com os novos dados
    const adminUpdated = await admService.updateProfile(adminId, {
      nome_completo,
      email,
      senha,
    });

    // Se o administrador não for encontrado, retorna erro 404
    if (!adminUpdated)
      return res.status(404).json({ message: "Administrador não encontrado" });

    // Retorna os dados atualizados do administrador
    res.json(adminUpdated);
  },
};
