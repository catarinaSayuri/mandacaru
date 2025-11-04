// Cria um mock personalizado do enderecoService antes de importá-lo
// Isso substitui o módulo real por versões falsas das funções
jest.mock("../services/enderecoService", () => ({

  // Mock da função que busca todos os endereços
  buscarTodosEnderecos: jest.fn(),
    
     // Mock da função que cria um novo endereço
  criarEndereco: jest.fn(),

}));

// Importa o serviço mockado (já substituído pelas versões falsas)
const enderecoService = require("../services/enderecoService");
// Importa o controlador que será testado
const enderecoController = require("../controllers/enderecoController");

// Define a suíte de testes para o enderecoController
describe("enderecoController", () => {
  // Declara variáveis que serão usadas em todos os testes
  let req, res;

  // Função executada antes de cada teste individual
  // Garante que cada teste comece com um estado limpo
  beforeEach(() => {
    // Cria um objeto de requisição vazio
    req = {};
    
    // Cria um mock do objeto de resposta com métodos encadeáveis
    res = {
      // Mock da função status que retorna o próprio objeto (para encadeamento)
      status: jest.fn().mockReturnThis(),
      // Mock da função json para capturar as respostas
      json: jest.fn(),
    };
    
    // Limpa todos os mocks antes de cada teste
    // Isso remove histórico de chamadas anteriores e reseta contadores
    jest.clearAllMocks();
  });

  // Teste 1: Verifica se buscarTodosEnderecos retorna todos os endereços com sucesso
  test("buscarTodosEnderecos deve retornar todos os endereços", async () => {

    const mockEnderecos = [
      { id_endereco: 1 }, 
      { id_endereco: 2 }
    ];
   
    enderecoService.getAllEnderecos.mockResolvedValueOnce(mockEnderecos);

    // Executa a função getAllEnderecos do controlador
    await enderecoController.getAllEnderecos(req, res);

    expect(enderecoService.getAllEnderecos).toHaveBeenCalled();
    

      // Cria um array mock de endereços para simular dados do banco

    const mockEnderecos = [{ id_endereco: 1 }, { id_endereco: 2 }];
    
     
    // Configura o mock do serviço para retornar os endereços fictícios
    // mockResolvedValueOnce simula uma Promise resolvida uma única vez
    
    enderecoService.buscarTodosEnderecos.mockResolvedValueOnce(mockEnderecos);
    
    // Executa a função getAllEnderecos do controlador

    await enderecoController.buscarTodosEnderecos(req, res);

        // Verifica se o serviço foi chamado corretamente

    expect(enderecoService.buscarTodosEnderecos).toHaveBeenCalled();

    
        // Verifica se o status 200 (OK) foi definido

    expect(res.status).toHaveBeenCalledWith(200);
    
    // Verifica se os endereços foram retornados na resposta JSON
    expect(res.json).toHaveBeenCalledWith(mockEnderecos);
  });

  // Teste 2: Verifica se criarEndereco cria um novo endereço com sucesso
  test("criarEndereco deve retornar o ID do novo endereço", async () => {

      // Simula dados de entrada para criação de um novo endereço

    req.body = { estado: "SP", cidade: "São Paulo" };
    
        // Simula o ID que seria retornado após a criação (geralmente auto-incremento)

    enderecoService.criarEndereco.mockResolvedValueOnce(10);
    
        // Executa a função createEndereco do controlador

    await enderecoController.criarEndereco(req, res);
    
        // Verifica se o serviço foi chamado com os dados corretos

    expect(enderecoService.criarEndereco).toHaveBeenCalledWith(req.body);
    
        // Verifica se o status 201 (Created - Criado) foi definido

    expect(res.status).toHaveBeenCalledWith(201);
    
        // Verifica se o ID do novo endereço foi retornado

    expect(res.json).toHaveBeenCalledWith({ id_endereco: 10 });

  });

  // Teste 3: Verifica se criarEndereco trata erros adequadamente
  test("criarEndereco deve retornar 500 em caso de erro", async () => {
    // Simula dados de entrada inválidos (objeto vazio)
    req.body = {};

  // Configura o mock do serviço para rejeitar a Promise com erro
    // mockRejectedValueOnce simula uma Promise rejeitada uma única vez
    enderecoService.criarEndereco.mockRejectedValueOnce(
      new Error("Erro ao criar endereço")
    );
    
    // Executa a função createEndereco do controlador
    await enderecoController.criarEndereco(req, res);

    // Verifica se o status 500 (Internal Server Error) foi definido
    expect(res.status).toHaveBeenCalledWith(500);
    
    // Verifica se a mensagem de erro foi retornada corretamente
    expect(res.json).toHaveBeenCalledWith({ 
      error: "Erro ao criar endereço" 
    });
  });
});