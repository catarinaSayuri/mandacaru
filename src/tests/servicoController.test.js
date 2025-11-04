// Importa o controlador que será testado
const servicoController = require('../controllers/servicoController');

// Importa o serviço que contém a lógica de negócio
const servicoService = require('../services/servicoService');

// Cria um mock do servicoService para isolar os testes do controlador
// Substitui todas as funções do serviço por versões falsas controladas
jest.mock('../services/servicoService');

// Define a suíte de testes para o servicoController
describe('servicoController', () => {
  // Declara variáveis que serão usadas em todos os testes
  let req, res;

  // Função executada antes de cada teste individual
  // Garante que cada teste comece com objetos limpos e estruturados
  beforeEach(() => {
    // Cria um objeto de requisição com todas as propriedades possíveis
    req = { 
      query: {},   // Parâmetros de consulta da URL (?param=value)
      body: {},    // Dados enviados no corpo da requisição (POST/PUT)
      params: {}   // Parâmetros da rota (/:id)
    };
    
    // Cria um mock do objeto de resposta com métodos encadeáveis
    res = {
      // Mock da função status que retorna o próprio objeto (para encadeamento)
      status: jest.fn().mockReturnThis(),
      // Mock da função json para capturar as respostas
      json: jest.fn(),
    };
  });

  // Teste 1: Verifica se listarServicos retorna todos os serviços disponíveis
  test('listarServicos deve retornar todos os serviços', async () => {
    // Cria um array mock de serviços para simular dados do banco
    const mockServicos = [
      { id_servico: 1 }, 
      { id_servico: 2 }
    ];
    
    // Configura o mock do serviço para retornar os serviços fictícios
    servicoService.buscarTodosServicos.mockResolvedValueOnce(mockServicos);

    // Executa a função listarServicos do controlador
    await servicoController.listarServicos(req, res);

    // Verifica se todos os serviços foram retornados na resposta JSON
    expect(res.json).toHaveBeenCalledWith(mockServicos);
  });

  // Teste 2: Verifica se filtrarServicos aplica filtros corretamente
  test('filtrarServicos deve retornar serviços filtrados', async () => {
    // Simula parâmetros de filtro na query string da URL
    req.query = { estado: 'SP' };
    
    // Cria um array mock com serviços filtrados
    const mockFiltrados = [{ id_servico: 1 }];
    
    // Configura o mock do serviço para retornar apenas serviços filtrados
    servicoService.filtrarServicos.mockResolvedValueOnce(mockFiltrados);

    // Executa a função filtrarServicos do controlador
    await servicoController.filtrarServicos(req, res);

    // Verifica se apenas os serviços filtrados foram retornados
    expect(res.json).toHaveBeenCalledWith(mockFiltrados);
  });

  // Teste 3: Verifica se criarServico cria um novo serviço com sucesso
  test('criarServico deve retornar serviço criado', async () => {
    // Simula dados de entrada para criação de um novo serviço
    req.body = { nome: 'Novo Serviço' };
    
    // Cria um mock do serviço criado (com ID gerado)
    const mockServicoCriado = { 
      id_servico: 1, 
      nome: 'Novo Serviço' 
    };
    
    // Configura o mock do serviço para retornar o serviço criado
    servicoService.criarServico.mockResolvedValueOnce(mockServicoCriado);

    // Executa a função criarServico do controlador
    await servicoController.criarServico(req, res);

    // Verifica se o status 201 (Created - Criado) foi definido
    expect(res.status).toHaveBeenCalledWith(201);
    
    // Verifica se o serviço criado foi retornado na resposta
    expect(res.json).toHaveBeenCalledWith(mockServicoCriado);
  });

  // Teste 4: Verifica se atualizarServico atualiza um serviço existente
  test('atualizarServico deve retornar serviço atualizado', async () => {
    // Simula o ID do serviço a ser atualizado nos parâmetros da rota
    req.params.id = '1';
    
    // Simula dados de atualização no corpo da requisição
    req.body = { nome: 'Atualizado' };
    
    // Cria um mock do serviço após atualização
    const mockServicoAtualizado = { 
      id_servico: 1, 
      nome: 'Atualizado' 
    };
    
    // Configura o mock do serviço para retornar o serviço atualizado
    servicoService.atualizarServico.mockResolvedValueOnce(mockServicoAtualizado);

    // Executa a função atualizarServico do controlador
    await servicoController.atualizarServico(req, res);

    // Verifica se o status 200 (OK) foi definido
    expect(res.status).toHaveBeenCalledWith(200);
    
    // Verifica se o serviço atualizado foi retornado
    expect(res.json).toHaveBeenCalledWith(mockServicoAtualizado);
  });

  // Teste 5: Verifica se atualizarServico trata caso de serviço não encontrado
  test('atualizarServico deve retornar 404 se não encontrado', async () => {
    // Simula tentativa de atualizar um serviço inexistente
    req.params.id = '1';
    
    // Configura o mock do serviço para retornar null (não encontrado)
    servicoService.atualizarServico.mockResolvedValueOnce(null);

    // Executa a função atualizarServico do controlador
    await servicoController.atualizarServico(req, res);

    // Verifica se o status 404 (Not Found - Não Encontrado) foi definido
    expect(res.status).toHaveBeenCalledWith(404);
    
    // Verifica se a mensagem de erro apropriada foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      error: 'Serviço não encontrado' 
    });
  });

  // Teste 6: Verifica se deletarServico remove um serviço com sucesso
  test('deletarServico deve retornar serviço deletado', async () => {
    // Simula o ID do serviço a ser deletado
    req.params.id = '1';
    
    // Cria um mock do serviço que foi deletado (para confirmação)
    const mockDeletado = { id_servico: 1 };
    
    // Configura o mock do serviço para retornar o serviço deletado
    servicoService.deletarServico.mockResolvedValueOnce(mockDeletado);

    // Executa a função deletarServico do controlador
    await servicoController.deletarServico(req, res);

    // Verifica se o status 200 (OK) foi definido
    expect(res.status).toHaveBeenCalledWith(200);
    
    // Verifica se os dados do serviço deletado foram retornados (confirmação)
    expect(res.json).toHaveBeenCalledWith(mockDeletado);
  });

  // Teste 7: Verifica se deletarServico trata caso de serviço não encontrado
  test('deletarServico deve retornar 404 se não encontrado', async () => {
    // Simula tentativa de deletar um serviço inexistente
    req.params.id = '1';
    
    // Configura o mock do serviço para retornar null (não encontrado)
    servicoService.deletarServico.mockResolvedValueOnce(null);

    // Executa a função deletarServico do controlador
    await servicoController.deletarServico(req, res);

    // Verifica se o status 404 (Not Found - Não Encontrado) foi definido
    expect(res.status).toHaveBeenCalledWith(404);
    
    // Verifica se a mensagem de erro apropriada foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      error: 'Serviço não encontrado' 
    });
  });

  // Teste 8: Verifica se obterServicoPorId busca um serviço específico
  test('obterServicoPorId deve retornar serviço por ID', async () => {
    // Simula o ID do serviço a ser buscado
    req.params.id = '1';
    
    // Cria um mock do serviço encontrado
    const mockServico = { id_servico: 1 };
    
    // Configura o mock do serviço para retornar o serviço encontrado
    servicoService.buscarServicoPorId.mockResolvedValueOnce(mockServico);

    // Executa a função obterServicoPorId do controlador
    await servicoController.obterServicoPorId(req, res);

    // Verifica se o serviço encontrado foi retornado na resposta
    expect(res.json).toHaveBeenCalledWith(mockServico);
  });

  // Teste 9: Verifica se obterServicoPorId trata caso de serviço não encontrado
  test('obterServicoPorId deve retornar 404 se não encontrado', async () => {
    // Simula busca por um ID que não existe no banco
    req.params.id = '999';
    
    // Configura o mock do serviço para retornar null (não encontrado)
    servicoService.buscarServicoPorId.mockResolvedValueOnce(null);

    // Executa a função obterServicoPorId do controlador
    await servicoController.obterServicoPorId(req, res);

    // Verifica se o status 404 (Not Found - Não Encontrado) foi definido
    expect(res.status).toHaveBeenCalledWith(404);
    
    // Verifica se a mensagem de erro apropriada foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      error: 'Serviço não encontrado' 
    });
  });
});