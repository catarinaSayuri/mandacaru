const request = require('supertest');
const express = require('express');
const admRoutes = require('../routes/admRoutes');
const admController = require('../controllers/admController');

jest.mock('../controllers/admController');

describe('Adm Routes', () => {
  // Cria o app e aplica middlewares antes dos testes
  let app;

  beforeEach(() => {
    jest.clearAllMocks();

    app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/', admRoutes);
  });

  test('GET /login deve renderizar a página de login do administrador', () => {
    // Mocks de req e res
    const req = {};
    const res = {
      render: jest.fn(),
    };

    // Busca o handler da rota GET /login
    const routeHandler = admRoutes.stack.find(
      (r) => r.route && r.route.path === '/login' && r.route.methods.get
    ).route.stack[0].handle;

    // Executa o handler manualmente com mocks
    routeHandler(req, res);

    // Verifica se res.render foi chamado com os argumentos corretos
    expect(res.render).toHaveBeenCalledWith('pages/loginAdm_v1', {
      pageTitle: 'Painel de Administração',
    });
  });

  test('POST /login deve chamar o controller de login', async () => {
    // Mock da função login do controller
    admController.login.mockImplementation((req, res) => {
      res.status(200).json({ success: true });
    });

    // Faz a requisição simulada com supertest
    const res = await request(app)
      .post('/login')
      .send({ email: 'admin@exemplo.com', senha: '1234' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(admController.login).toHaveBeenCalled();
  });
});