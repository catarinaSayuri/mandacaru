/**
 * Testes para as rotas de serviços (servicoRoutes.js)
 * 
 * Este arquivo contém testes para verificar se as rotas de serviços estão
 * funcionando corretamente, incluindo a integração com os controllers.
 * Utilizamos supertest para simular requisições HTTP e jest para os mocks.
 */

// Mocks dos middlewares de autenticação e autorização
// Estes mocks permitem que os testes sejam executados sem autenticação real
jest.mock('../middlewares/authMiddleware', () => (req, res, next) => next());
jest.mock('../middlewares/isAdm', () => (req, res, next) => next());

// Mock do controller de serviços
// Permite simular as respostas do controller sem executar a lógica real
jest.mock('../controllers/servicoController', () => ({
  criarServico: jest.fn(),
  atualizarServico: jest.fn(),
  deletarServico: jest.fn(),
  obterServicoPorId: jest.fn(),
  filtrarServicos: jest.fn(),
  listarServicos: jest.fn()
}));

// Importações necessárias para os testes
const request = require('supertest');
const express = require('express');
const servicoRoutes = require('../routes/servicoRoutes');
const servicoController = require('../controllers/servicoController');

describe('Servico Routes', () => {
  let app;

  // Configuração antes de cada teste
  beforeEach(() => {
    // Limpa todos os mocks para evitar interferência entre testes
    jest.clearAllMocks();

    // Configura uma aplicação Express para os testes
    app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    // Registra as rotas de serviço com o prefixo /servicos
    app.use('/servicos', servicoRoutes);
  });

  /**
   * Testa se a rota GET /servicos/filtrar chama o método filtrarServicos do controller
   * e retorna os resultados corretamente
   */
  test('GET /servicos/filtrar deve chamar filtrarServicos do controller', async () => {
    // Dados de exemplo para o teste
    const mockFiltered = [{ id: 1, nome: 'Limpeza', preco: 100 }];
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.filtrarServicos.mockImplementation((req, res) => {
      res.status(200).json(mockFiltered);
    });

    // Executa a requisição de teste
    const res = await request(app).get('/servicos/filtrar').query({ nome: 'Limpeza' });

    // Verifica se a resposta está correta
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFiltered);
    
    // Verifica se o controller foi chamado
    expect(servicoController.filtrarServicos).toHaveBeenCalled();
  });

  /**
   * Testa se a rota GET /servicos lista todos os serviços corretamente
   */
  test('GET /servicos deve chamar listarServicos do controller', async () => {
    // Dados de exemplo para o teste
    const mockServicos = [
      { id: 1, nome: 'Limpeza', preco: 100 },
      { id: 2, nome: 'Pintura', preco: 200 }
    ];
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.listarServicos.mockImplementation((req, res) => {
      res.status(200).json(mockServicos);
    });

    // Executa a requisição de teste
    const res = await request(app).get('/servicos');

    // Verifica se a resposta está correta
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockServicos);
    
    // Verifica se o controller foi chamado
    expect(servicoController.listarServicos).toHaveBeenCalled();
  });

  /**
   * Testa se a rota POST /servicos cria um novo serviço corretamente
   */
  test('POST /servicos deve chamar criarServico do controller', async () => {
    // Dados de exemplo para o teste
    const novoServico = { nome: 'Novo Serviço', preco: 150 };
    const servicoCriado = { id: 3, ...novoServico };
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.criarServico.mockImplementation((req, res) => {
      res.status(201).json(servicoCriado);
    });

    // Executa a requisição de teste
    const res = await request(app)
      .post('/servicos')
      .send(novoServico);

    // Verifica se a resposta está correta
    expect(res.status).toBe(201);
    expect(res.body).toEqual(servicoCriado);
    
    // Verifica se o controller foi chamado
    expect(servicoController.criarServico).toHaveBeenCalled();
  });

  /**
   * Testa se a rota PUT /servicos/:id atualiza um serviço existente corretamente
   */
  test('PUT /servicos/:id deve chamar atualizarServico do controller', async () => {
    // Dados de exemplo para o teste
    const id = '1';
    const dadosAtualizacao = { nome: 'Serviço Atualizado', preco: 120 };
    const servicoAtualizado = { id: 1, ...dadosAtualizacao };
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.atualizarServico.mockImplementation((req, res) => {
      res.status(200).json(servicoAtualizado);
    });

    // Executa a requisição de teste
    const res = await request(app)
      .put(`/servicos/${id}`)
      .send(dadosAtualizacao);

    // Verifica se a resposta está correta
    expect(res.status).toBe(200);
    expect(res.body).toEqual(servicoAtualizado);
    
    // Verifica se o controller foi chamado
    expect(servicoController.atualizarServico).toHaveBeenCalled();
  });

  /**
   * Testa se a rota DELETE /servicos/:id remove um serviço corretamente
   */
  test('DELETE /servicos/:id deve chamar deletarServico do controller', async () => {
    // Dados de exemplo para o teste
    const id = '1';
    const servicoRemovido = { id: 1, nome: 'Serviço Removido', preco: 100 };
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.deletarServico.mockImplementation((req, res) => {
      res.status(200).json(servicoRemovido);
    });

    // Executa a requisição de teste
    const res = await request(app).delete(`/servicos/${id}`);

    // Verifica se a resposta está correta
    expect(res.status).toBe(200);
    expect(res.body).toEqual(servicoRemovido);
    
    // Verifica se o controller foi chamado
    expect(servicoController.deletarServico).toHaveBeenCalled();
  });

  /**
   * Testa se a rota GET /servicos/:id obtém um serviço específico corretamente
   */
  test('GET /servicos/:id deve chamar obterServicoPorId do controller', async () => {
    // Dados de exemplo para o teste
    const id = '1';
    const servico = { id: 1, nome: 'Serviço Específico', preco: 100 };
    
    // Configura o mock para retornar os dados de exemplo
    servicoController.obterServicoPorId.mockImplementation((req, res) => {
      res.status(200).json(servico);
    });

    // Executa a requisição de teste
    const res = await request(app).get(`/servicos/${id}`);

    // Verifica se a resposta está correta
    expect(res.status).toBe(200);
    expect(res.body).toEqual(servico);
    
    // Verifica se o controller foi chamado
    expect(servicoController.obterServicoPorId).toHaveBeenCalled();
  });
});