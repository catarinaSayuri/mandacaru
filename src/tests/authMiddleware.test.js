const jwt = require("jsonwebtoken"); // Biblioteca para criar e verificar tokens JWT
const httpMocks = require("node-mocks-http"); // Biblioteca para simular objetos de request/response do Express
const authMiddleware = require("../middlewares/authMiddleware"); // Importa o middleware de autenticação a ser testado

// Define a chave secreta usada para assinar/verificar o token JWT
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

/**
 * Teste 1: Deve permitir acesso quando o token é válido
 * Simula uma requisição com um token JWT válido e verifica se o middleware
 * adiciona os dados do usuário ao request e chama o next(), permitindo o acesso.
 */
test('authMiddleware deve permitir acesso com token válido', () => {
  // Cria um token JWT válido com informações fictícias de admin
  const token = jwt.sign({ adminId: 1, isAdm: true }, JWT_SECRET);

  // Cria um objeto de request simulado com o header de autorização contendo o token
  const req = httpMocks.createRequest({
    headers: { authorization: `Bearer ${token}` },
  });

  // Cria um objeto de response simulado
  const res = httpMocks.createResponse();

  // Cria uma função simulada para o next(), que representa o próximo middleware
  const next = jest.fn();

  // Executa o middleware de autenticação
  authMiddleware(req, res, next);

  // Verifica se os dados do usuário foram adicionados ao objeto request
  expect(req.adminId).toBe(1);
  expect(req.isAdm).toBe(true);

  // Verifica se o next() foi chamado, ou seja, o acesso foi permitido
  expect(next).toHaveBeenCalled();
});

/**
 * Teste 2: Deve bloquear acesso quando não há token
 * Simula uma requisição sem header de autorização e verifica se o middleware
 * retorna status 401 e mensagem de erro adequada, sem chamar o next().
 */
test('authMiddleware deve bloquear acesso sem token', () => {
  // Cria um objeto de request simulado sem header de autorização
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  // Executa o middleware de autenticação
  authMiddleware(req, res, next);

  // Verifica se o status retornado é 401 (não autorizado)
  expect(res.statusCode).toBe(401);

  // Verifica se a mensagem de erro está correta
  expect(res._getJSONData().message).toBe("Token não fornecido");

  // Verifica se o next() NÃO foi chamado, ou seja, o acesso foi bloqueado
  expect(next).not.toHaveBeenCalled();
});

/**
 * Teste 3: Deve bloquear acesso quando o token é inválido
 * Simula uma requisição com um token inválido e verifica se o middleware
 * retorna status 401 e mensagem de erro adequada, sem chamar o next().
 */
test('authMiddleware deve bloquear acesso com token inválido', () => {
  // Cria um objeto de request simulado com um token inválido
  const req = httpMocks.createRequest({
    headers: { authorization: "Bearer tokeninvalido" },
  });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  // Executa o middleware de autenticação
  authMiddleware(req, res, next);

  // Verifica se o status retornado é 401 (não autorizado)
  expect(res.statusCode).toBe(401);

  // Verifica se a mensagem de erro está correta
  expect(res._getJSONData().message).toBe("Token inválido");

  // Verifica se o next() NÃO foi chamado, ou seja, o acesso foi bloqueado
  expect(next).not.toHaveBeenCalled();
});


