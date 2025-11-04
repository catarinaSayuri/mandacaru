// Importa o serviço de endereços para realizar operações de negócio
const enderecoService = require("../services/enderecoService");


/**
 * Busca todos os endereços cadastrados no sistema
 * Retorna uma lista completa de endereços disponíveis
 */
const buscarTodosEnderecos =  async (req, res) => {

  try {
    // Chama o serviço para buscar todos os endereços
    const enderecos = await enderecoService.buscarTodosEnderecos();

    // Retorna os endereços com status 200 (sucesso)
    res.status(200).json(enderecos);
    } catch (error) {
    // Log do erro para depuração
    console.log(error);

    // Retorna erro 500 (erro interno do servidor) com a mensagem de erro
    res.status(500).json({ error: error.message });

    }
};

/**
 * Cria um novo endereço no sistema
 * Recebe os dados do endereço no corpo da requisição e os persiste no banco
 */
const criarEndereco = async (req, res) => {
  try {
     // Chama o serviço para criar um novo endereço com os dados recebidos
    const idEndereco = await enderecoService.criarEndereco(req.body);

    // Retorna o ID do endereço criado com status 201 (criado com sucesso)
    res.status(201).json({ id_endereco: idEndereco });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Exporta os métodos do controller para uso nas rotas
module.exports = {
  buscarTodosEnderecos, // Método para buscar todos os endereçosAdd commentMore actions
  criarEndereco, // Método para criar novo endereço
};