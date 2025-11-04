// A função `jest.mock` substitui o módulo real do controller por uma versão "mock" (simulada).
// Isso é crucial para isolar o teste. Não queremos testar a lógica *dentro* do controller aqui,
// apenas se a rota está *chamando* a função correta do controller.
// Cada função do controller é substituída por uma função mock `jest.fn()`,
// que nos permite rastrear chamadas e simular retornos.
jest.mock('../controllers/enderecoController', () => ({
  buscarTodosEnderecos: jest.fn(),
  criarEndereco: jest.fn(),
}));

// Importações necessárias para o teste
const request = require('supertest'); // Biblioteca para fazer requisições HTTP simuladas ao nosso app Express.
const express = require('express'); // O próprio framework Express para criar um app de teste.
const enderecoRoutes = require('../routes/enderecoRoutes'); // O arquivo de rotas que queremos testar.
const enderecoController = require('../controllers/enderecoController'); // O controller mockado que importamos para manipulação no teste.
const { createEndereco } = require('../services/enderecoService');

// `describe` agrupa testes relacionados. Aqui, estamos agrupando todos os testes para as rotas de endereço.
describe('Endereco Routes', () => {
  let app; // Variável para armazenar a instância do nosso aplicativo Express de teste.

  // `beforeEach` é um "hook" do Jest que executa um código antes de *cada* teste (`test` ou `it`) dentro deste `describe`.
  beforeEach(() => {
    // `jest.clearAllMocks()` limpa o histórico de chamadas de todas as funções mockadas.
    // Isso garante que um teste não interfira no outro.
    jest.clearAllMocks();

    // Cria uma nova instância do Express para cada teste, garantindo um ambiente limpo.
    app = express();

    // Configura os middlewares necessários para que o app consiga interpretar os corpos das requisições.
    app.use(express.urlencoded({ extended: false })); // Para dados de formulário
    app.use(express.json()); // Para dados em formato JSON

    // Adiciona as rotas de endereço ao nosso app de teste, associando-as à raiz '/'.
    app.use('/', enderecoRoutes);
  });

  // Primeiro caso de teste: verificar a rota GET /.
  test('GET / deve chamar o controller buscarTodosEnderecos', async () => {
    // 1. Preparação (Arrange)
    // Cria um array de dados falsos que esperamos que a API retorne.
    const mockEnderecos = [{ id: 1, rua: 'Rua A', numero: 123 }];

    // Simula a implementação da função `buscarTodosEnderecos` do nosso controller mockado.
    // Quando essa função for chamada, ela deve responder com o status 200 e o JSON com os nossos dados falsos.
    enderecoController.buscarTodosEnderecos.mockImplementation((req, res) => {
      res.status(200).json(mockEnderecos);
    });

    // 2. Ação (Act)
    // Usa o `supertest` para fazer uma requisição GET para a rota raiz ('/') do nosso app de teste.
    const res = await request(app).get('/');

    // 3. Afirmação (Assert)
    // Verifica se a resposta da requisição tem o status HTTP 200 (OK).
    expect(res.status).toBe(200);
    // Verifica se o corpo (body) da resposta é exatamente igual aos dados que simulamos.
    expect(res.body).toEqual(mockEnderecos);
    // Verifica se a função `buscarTodosEnderecos` do controller foi de fato chamada durante a requisição.
    expect(enderecoController.buscarTodosEnderecos).toHaveBeenCalled();
  });

  // Segundo caso de teste: verificar a rota POST /.
  test('POST / deve chamar o controller criarEndereco', async () => {
    // 1. Preparação (Arrange)
    // Cria um objeto falso que representa o recurso que foi criado.
    const mockCreated = { id: 2, rua: 'Rua B', numero: 456 };

    // Simula a implementação da função `criarEndereco`.
    // Quando chamada, deve responder com o status 201 (Created) e o JSON do objeto criado.
    enderecoController.criarEndereco.mockImplementation((req, res) => {
      res.status(201).json(mockCreated);
    });

    // 2. Ação (Act)
    // Usa o `supertest` para fazer uma requisição POST para a rota '/',
    // enviando (`.send()`) um corpo (payload) em JSON.
    const res = await request(app)
      .post('/')
      .send({ rua: 'Rua B', numero: 456 });

    // 3. Afirmação (Assert)
    // Verifica se a resposta tem o status HTTP 201 (Created).
    expect(res.status).toBe(201);
    // Verifica se o corpo da resposta é igual ao objeto criado que simulamos.
    expect(res.body).toEqual(mockCreated);
    // Verifica se a função `criarEndereco` do controller foi chamada.
    expect(enderecoController.criarEndereco).toHaveBeenCalled();
  });
});