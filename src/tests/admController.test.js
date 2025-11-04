// Importa o controlador que será testado
const admController = require('../controllers/admController');

// Importa o serviço que contém a lógica de negócio
const admService = require('../services/admService');

// Cria um mock do admService para isolar os testes do controlador
// Isso significa que as funções do serviço serão substituídas por versões falsas
jest.mock('../services/admService');

// Define a suíte de testes para o admController
describe('admController', () => {
  // Declara variáveis que serão usadas em todos os testes
  let req, res;

  // Função executada antes de cada teste individual
  // Garante que cada teste comece com objetos limpos
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
  });

  // Teste 1: Verifica se o login funciona corretamente com credenciais válidas
  test('login deve retornar token e admin quando credenciais são válidas', async () => {
    // Simula dados de entrada válidos na requisição
    req.body = { 
      email: 'admin@example.com', 
      senha: 'senha123' 
    };
    
    // Cria um objeto mock representando um administrador
    const mockAdmin = {
      id_administrador: '1',
      nome_completo: 'Admin Teste',
      email: 'admin@example.com',
    };
    
    // Token fictício que seria retornado pelo serviço
    const token = 'mocked-token';

    // Configura o mock do serviço para retornar sucesso no login
    // mockResolvedValueOnce simula uma Promise resolvida uma única vez
    admService.login.mockResolvedValueOnce({ admin: mockAdmin, token });

    // Executa a função de login do controlador
    await admController.login(req, res);

    // Verifica se a resposta JSON foi chamada com os dados corretos
    expect(res.json).toHaveBeenCalledWith({
      admin: {
        // Mapeia os campos do admin para o formato de resposta
        id: mockAdmin.id_administrador,
        nome_completo: mockAdmin.nome_completo,
        email: mockAdmin.email,
      },
      token,
    });
  });

  // Teste 2: Verifica se o login retorna erro 401 com credenciais inválidas
  test('login deve retornar 401 quando credenciais são inválidas', async () => {
    // Simula dados de entrada com senha incorreta
    req.body = { 
      email: 'admin@example.com', 
      senha: 'senhaErrada' 
    };
    
    // Configura o mock do serviço para retornar null (falha no login)
    admService.login.mockResolvedValueOnce(null);

    // Executa a função de login do controlador
    await admController.login(req, res);

    // Verifica se o status 401 (Não Autorizado) foi definido
    expect(res.status).toHaveBeenCalledWith(401);
    
    // Verifica se a mensagem de erro correta foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      message: 'Email ou senha inválidos' 
    });
  });

  // Teste 3: Verifica se getProfile retorna os dados do administrador
  test('getProfile deve retornar o perfil do administrador', async () => {
    // Simula um ID de administrador na requisição (geralmente vem do middleware de auth)
    req.adminId = '1';
    
    // Cria um mock dos dados do administrador
    const mockAdmin = { 
      id_administrador: '1', 
      nome_completo: 'Admin', 
      email: 'admin@example.com' 
    };
    
    // Configura o mock do serviço para retornar os dados do admin
    admService.getProfile.mockResolvedValueOnce(mockAdmin);

    // Executa a função getProfile do controlador
    await admController.getProfile(req, res);

    // Verifica se os dados do admin foram retornados corretamente
    expect(res.json).toHaveBeenCalledWith(mockAdmin);
  });

  // Teste 4: Verifica se getProfile retorna 404 quando admin não é encontrado
  test('getProfile deve retornar 404 se admin não encontrado', async () => {
    // Simula um ID que não existe no banco de dados
    req.adminId = '999';
    
    // Configura o mock do serviço para retornar null (admin não encontrado)
    admService.getProfile.mockResolvedValueOnce(null);

    // Executa a função getProfile do controlador
    await admController.getProfile(req, res);

    // Verifica se o status 404 (Não Encontrado) foi definido
    expect(res.status).toHaveBeenCalledWith(404);
    
    // Verifica se a mensagem de erro correta foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      message: 'Administrador não encontrado' 
    });
  });

  // Teste 5: Verifica se updateProfile atualiza e retorna os dados do admin
  test('updateProfile deve retornar admin atualizado', async () => {
    // Simula um ID de administrador válido
    req.adminId = '1';
    
    // Simula dados de atualização enviados no corpo da requisição
    req.body = { 
      nome_completo: 'Novo Nome', 
      email: 'novo@email.com', 
      senha: 'novaSenha' 
    };
    
    // Cria um mock dos dados atualizados do administrador
    const mockUpdatedAdmin = { 
      id_administrador: '1', 
      nome_completo: 'Novo Nome', 
      email: 'novo@email.com' 
    };

    // Configura o mock do serviço para retornar os dados atualizados
    admService.updateProfile.mockResolvedValueOnce(mockUpdatedAdmin);

    // Executa a função updateProfile do controlador
    await admController.updateProfile(req, res);

    // Verifica se os dados atualizados foram retornados corretamente
    expect(res.json).toHaveBeenCalledWith(mockUpdatedAdmin);
  });

  // Teste 6: Verifica se updateProfile retorna 404 quando admin não existe
  test('updateProfile deve retornar 404 se admin não encontrado', async () => {
    // Simula um ID de administrador válido
    req.adminId = '1';
    
    // Simula dados de atualização (valores mínimos para teste)
    req.body = { 
      nome_completo: 'X', 
      email: 'x@x.com', 
      senha: '123' 
    };
    
    // Configura o mock do serviço para retornar null (admin não encontrado)
    admService.updateProfile.mockResolvedValueOnce(null);

    // Executa a função updateProfile do controlador
    await admController.updateProfile(req, res);

    // Verifica se o status 404 (Não Encontrado) foi definido
    expect(res.status).toHaveBeenCalledWith(404);
    
    // Verifica se a mensagem de erro correta foi retornada
    expect(res.json).toHaveBeenCalledWith({ 
      message: 'Administrador não encontrado' 
    });
  });
});