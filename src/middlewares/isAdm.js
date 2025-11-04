/**
 * isAdm.js - Middleware de autorização para administradores
 *
 * Este middleware verifica se o usuário autenticado possui privilégios de administrador.
 * Deve ser usado após o authMiddleware para garantir que apenas administradores
 * tenham acesso a rotas específicas que requerem permissões elevadas.
 */

/**
 * Middleware que verifica se o usuário tem privilégios de administrador
 * Utiliza a propriedade isAdm adicionada pelo authMiddleware na requisição
 *
 * @param {Object} req - Objeto de requisição do Express (deve conter req.isAdm)
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar controle ao próximo middleware
 */
module.exports = (req, res, next) => {
  // Verifica se o usuário possui privilégios de administrador
  if (!req.isAdm) {
    // Retorna erro 403 (Forbidden) se não for administrador
    return res
      .status(403)
      .json({ message: "Acesso restrito a administradores" });
  }

  // Se for administrador, permite continuar para o próximo middleware/controller
  next();
};
