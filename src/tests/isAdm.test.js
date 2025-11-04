const httpMocks = require("node-mocks-http"); // Biblioteca para simular objetos de request/response do Express
const isAdm = require("../middlewares/isAdm"); // Importa o middleware que verifica se o usuário é administrador

// Teste: Deve permitir acesso quando req.isAdm é true
test('deve permitir acesso quando req.isAdm é true', () => {
  // Arrange: cria um request simulado e define isAdm como true (usuário é admin)
  const req = httpMocks.createRequest();
  req.isAdm = true;
  const res = httpMocks.createResponse();
  const next = jest.fn(); // Função simulada para o próximo middleware

  // Act: executa o middleware
  isAdm(req, res, next);

  // Assert: verifica se o next() foi chamado (acesso permitido)
  expect(next).toHaveBeenCalled();
  // Verifica se nenhuma resposta foi enviada (middleware apenas passa adiante)
  expect(res._isEndCalled()).toBe(false);
});

// Teste: Deve bloquear acesso quando req.isAdm é false
test('deve bloquear acesso quando req.isAdm é false', () => {
  // Arrange: cria um request simulado e define isAdm como false (usuário não é admin)
  const req = httpMocks.createRequest();
  req.isAdm = false;
  const res = httpMocks.createResponse();
  const next = jest.fn();

  // Act: executa o middleware
  isAdm(req, res, next);

  // Assert: verifica se o status retornado é 403 (proibido)
  expect(res.statusCode).toBe(403);
  // Verifica se a mensagem de erro está correta
  expect(res._getJSONData().message).toBe("Acesso restrito a administradores");
  // Verifica se o next() NÃO foi chamado (acesso bloqueado)
  expect(next).not.toHaveBeenCalled();
});

// Teste: Deve bloquear acesso quando req.isAdm está ausente
test('deve bloquear acesso quando req.isAdm está ausente', () => {
  // Arrange: cria um request simulado sem definir isAdm
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  // Act: executa o middleware
  isAdm(req, res, next);

  // Assert: verifica se o status retornado é 403 (proibido)
  expect(res.statusCode).toBe(403);
  // Verifica se a mensagem de erro está correta
  expect(res._getJSONData().message).toBe("Acesso restrito a administradores");
  // Verifica se o next() NÃO foi chamado (acesso bloqueado)
  expect(next).not.toHaveBeenCalled();
});