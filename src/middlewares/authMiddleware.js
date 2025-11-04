/**
 * authMiddleware.js - Middleware de autenticação JWT
 *
 * Este middleware é responsável por validar tokens JWT em requisições protegidas.
 * Verifica a presença, formato e validade do token, extraindo informações do usuário
 * autenticado e disponibilizando-as para os próximos middlewares e controllers.
 */

// Importa a biblioteca jsonwebtoken para manipulação de tokens JWT
const jwt = require("jsonwebtoken");

// Define a chave secreta para verificação do JWT (usa variável de ambiente ou fallback)
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

/**
 * Middleware de autenticação que valida tokens JWT
 * Verifica o header Authorization, valida o formato Bearer e decodifica o token
 *
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 * @param {Function} next - Função para passar controle ao próximo middleware
 */
function authMiddleware(req, res, next) {
  // Obtém o header de autorização da requisição
  const authHeader = req.headers.authorization;

  // Verifica se o header de autorização foi fornecido
  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  // Divide o header para separar o tipo do token (Bearer token)
  const parts = authHeader.split(" ");

  // Valida se o formato está correto: "Bearer <token>"
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ message: "Token mal formatado" });

  // Extrai o token da segunda parte do header
  const token = parts[1];

  try {
    // Verifica e decodifica o token JWT usando a chave secreta
    const decoded = jwt.verify(token, JWT_SECRET);

    // Adiciona o ID do administrador ao objeto de requisição
    req.adminId = decoded.adminId;

    // Adiciona a flag de administrador ao objeto de requisição (importante para controle de acesso)
    req.isAdm = decoded.isAdm;

    // Chama o próximo middleware na cadeia
    next();
  } catch {
    // Retorna erro 401 se o token for inválido ou expirado
    return res.status(401).json({ message: "Token inválido" });
  }
}

// Exporta o middleware para uso nas rotas protegidas
module.exports = authMiddleware;
