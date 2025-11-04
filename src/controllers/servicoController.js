/**
 * servicoController.js - Controller responsável pelas operações de serviços
 *
 * Este controller gerencia todas as operações CRUD relacionadas aos serviços do sistema,
 * incluindo listagem, filtragem, criação, atualização e exclusão de serviços. Atua como
 * intermediário entre as rotas e os serviços de negócio, processando requisições e formatando respostas.
 */

// Importa o serviço de serviços para realizar operações de negócio
const servicoService = require("../services/servicoService");

/**
 * Lista todos os serviços cadastrados no sistema
 * Retorna uma lista completa de serviços disponíveis
 */
const listarServicos = async (req, res) => {
  try {
    // Chama o serviço para buscar todos os serviços
    const servicos = await servicoService.buscarTodosServicos();

    // Retorna os serviços encontrados
    res.json(servicos);
  } catch (error) {
    // Retorna erro 500 em caso de falha na operação
    res.status(500).json({ error: error.message });
  }
};

/**
 * Filtra serviços baseado em critérios específicos
 * Permite filtrar por estado, faixa etária, categoria de localidade e gênero
 */
const filtrarServicos = async (req, res) => {
  try {
    // Extrai os parâmetros de filtro da query string
    const { estado, faixa_etaria, categoria_localidade, genero } = req.query;

    // Organiza os filtros em um objeto
    const filtros = { estado, faixa_etaria, categoria_localidade, genero };

    // Chama o serviço para filtrar os serviços com base nos critérios
    const servicos = await servicoService.filtrarServicos(filtros);

    // Retorna os serviços filtrados
    res.json(servicos);
  } catch (error) {
    // Retorna erro 500 em caso de falha na operação
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cria um novo serviço no sistema
 * Recebe os dados do serviço no corpo da requisição e os persiste no banco
 */
const criarServico = async (req, res) => {
  try {
    // Chama o serviço para criar um novo serviço com os dados recebidos
    const servicoCriado = await servicoService.criarServico(req.body);

    // Retorna o serviço criado com status 201 (criado com sucesso)
    res.status(201).json(servicoCriado);
  } catch (error) {
    // Retorna erro 500 em caso de falha na operação
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualiza um serviço existente no sistema
 * Recebe o ID do serviço via parâmetro da URL e os novos dados no corpo da requisição
 */
const atualizarServico = async (req, res) => {
  try {
    const id_servico = req.params.id;
    const {
      nome,
      descricao,
      categoria_localidade,
      horario_funcionamento,
      genero,
      faixa_etaria,
      telefone,
      estado,
      cidade,
      bairro,
      cep,
      rua,
      numero,
      latitude,
      longitude,
    } = req.body;

    // Organiza os dados do endereço em um objeto
    const endereco = {
      estado,
      cidade,
      bairro,
      cep,
      rua,
      numero,
      latitude,
      longitude,
    };

    // Chama o serviço para atualizar o serviço e o endereço
    const servicoAtualizado = await servicoService.atualizarServico(
      id_servico,
      nome,
      descricao,
      categoria_localidade,
      horario_funcionamento,
      genero,
      faixa_etaria,
      telefone,
      endereco // Passa o objeto de endereço
    );

    if (servicoAtualizado) {
      res.status(200).json(servicoAtualizado);
    } else {
      res.status(404).json({ error: "Serviço não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Remove um serviço do sistema
 * Recebe o ID do serviço via parâmetro da URL e o remove permanentemente
 */
const deletarServico = async (req, res) => {
  try {
    // Chama o serviço para deletar o serviço pelo ID
    const servicoDeletado = await servicoService.deletarServico(req.params.id);

    // Verifica se o serviço foi encontrado e deletado
    if (servicoDeletado) {
      // Retorna os dados do serviço deletado com status 200 (sucesso)
      res.status(200).json(servicoDeletado);
    } else {
      // Retorna erro 404 se o serviço não foi encontrado
      res.status(404).json({ error: "Serviço não encontrado" });
    }
  } catch (error) {
    // Retorna erro 500 em caso de falha na operação
    res.status(500).json({ error: error.message });
  }
};

const obterServicoPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const servico = await servicoService.buscarServicoPorId(id);
    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }
    res.json(servico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar serviço" });
  }
};


// Exporta todos os métodos do controller para uso nas rotas
module.exports = {
  listarServicos, // Método para listar todos os serviços
  filtrarServicos, // Método para filtrar serviços por critérios
  criarServico, // Método para criar novo serviço
  atualizarServico, // Método para atualizar serviço existente
  deletarServico, // Método para deletar serviço
  obterServicoPorId
};
