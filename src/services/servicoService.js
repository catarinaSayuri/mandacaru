/**
 * servicoService.js - Serviço de gerenciamento de serviços sociais
 *
 * Este módulo contém funções responsáveis por manipular os dados da tabela
 * "servicos", incluindo criação, leitura, atualização, exclusão (CRUD),
 * além de filtros avançados com base em critérios diversos.
 */

const db = require("../config/db"); // Importa conexão com o banco de dados

/**
 * Busca todos os serviços com seus respectivos dados de endereço
 * @returns {Array} Lista de serviços com informações completas
 */
const buscarTodosServicos = async () => {
  try {
    const result = await db.query(`
      SELECT s.*, e.estado, e.cidade, e.bairro, e.cep, e.rua, e.numero, e.latitude, e.longitude
      FROM servicos s
      JOIN enderecos e ON s.id_endereco = e.id_endereco
    `);

    return result.rows;
  } catch (error) {
    throw new Error("Erro ao obter serviços: " + error.message);
  }
};

/**
 * Filtra os serviços com base em critérios opcionais
 * @param {Object} filtros - Objeto contendo filtros como estado, faixa etária, categoria e gênero
 * @returns {Array} Lista de serviços que atendem aos critérios
 */
const filtrarServicos = async (filtros) => {
  const valores = [];
  const condicoes = [];

  // Filtros dinâmicos
  if (filtros.estado) {
    valores.push(filtros.estado);
    condicoes.push(`e.estado = $${valores.length}`);
  }
  if (filtros.faixa_etaria) {
    valores.push(filtros.faixa_etaria);
    condicoes.push(`s.faixa_etaria = $${valores.length}`);
  }
  if (filtros.categoria_localidade) {
    valores.push(filtros.categoria_localidade);
    condicoes.push(`s.categoria_localidade = $${valores.length}`);
  }
  if (filtros.genero) {
    valores.push(filtros.genero);
    condicoes.push(`s.genero = $${valores.length}`);
  }

  let query = `
    SELECT s.*, e.estado, e.cidade, e.bairro, e.cep, e.rua, e.numero, e.latitude, e.longitude
    FROM servicos s
    JOIN enderecos e ON s.id_endereco = e.id_endereco
  `;

  if (condicoes.length > 0) {
    query += ` WHERE ${condicoes.join(" AND ")}`;
  }

  try {
    const result = await db.query(query, valores);
    return result.rows;
  } catch (error) {
    throw new Error("Erro ao filtrar serviços: " + error.message);
  }
};

/**
 * Cria um novo serviço com os dados fornecidos
 * @param {Object} servico - Objeto contendo os dados do serviço
 * @returns {Object} Serviço recém-criado
 */
const criarServico = async (servico) => {
  const {
    nome,
    descricao,
    categoria_localidade,
    horario_funcionamento,
    genero,
    faixa_etaria,
    telefone,
    id_endereco,
  } = servico;

  try {
    const result = await db.query(
      `INSERT INTO servicos 
       (nome, descricao, categoria_localidade, horario_funcionamento, genero, faixa_etaria, telefone, id_endereco)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        nome,
        descricao,
        categoria_localidade,
        horario_funcionamento,
        genero,
        faixa_etaria,
        telefone,
        id_endereco,
      ]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar serviçoo: " + error.message);
  }
};

/**
 * Atualiza os dados de um serviço existente
 * @param {number} id_servico - ID do serviço a ser atualizado
 * @param {string} nome - Nome do serviço
 * @param {string} descricao - Descrição do serviço
 * @param {string} categoria_localidade - Categoria de localidade
 * @param {string} horario_funcionamento - Horário de funcionamento
 * @param {string} genero - Gênero atendido
 * @param {string} faixa_etaria - Faixa etária atendida
 * @param {string} telefone - Telefone de contato
 * @returns {Object} Serviço atualizado
 */
const atualizarServico = async (
  id_servico,
  nome,
  descricao,
  categoria_localidade,
  horario_funcionamento,
  genero,
  faixa_etaria,
  telefone,
  endereco // Novo parâmetro para os dados do endereço
) => {
  try {
    // Inicia uma transação para garantir consistência
    await db.query("BEGIN");

    // Atualiza a tabela servicos
    const resultServico = await db.query(
      `UPDATE servicos 
       SET nome = $1, 
           descricao = $2, 
           categoria_localidade = $3, 
           horario_funcionamento = $4, 
           genero = $5, 
           faixa_etaria = $6,
           telefone = $7 
       WHERE id_servico = $8
       RETURNING *`,
      [
        nome,
        descricao,
        categoria_localidade,
        horario_funcionamento,
        genero,
        faixa_etaria,
        telefone,
        id_servico,
      ]
    );

    if (!resultServico.rows[0]) {
      throw new Error("Serviço não encontrado");
    }

    // Busca o id_endereco associado ao serviço
    const id_endereco = resultServico.rows[0].id_endereco;

    // Atualiza a tabela enderecos
    const { estado, cidade, bairro, cep, rua, numero, latitude, longitude } =
      endereco;
    const resultEndereco = await db.query(
      `UPDATE enderecos 
       SET estado = $1, 
           cidade = $2, 
           bairro = $3, 
           cep = $4, 
           rua = $5, 
           numero = $6, 
           latitude = $7, 
           longitude = $8
       WHERE id_endereco = $9
       RETURNING *`,
      [
        estado,
        cidade,
        bairro,
        cep,
        rua,
        numero,
        latitude,
        longitude,
        id_endereco,
      ]
    );

    if (!resultEndereco.rows[0]) {
      throw new Error("Endereço não encontrado");
    }

    // Confirma a transação
    await db.query("COMMIT");

    // Retorna o serviço atualizado com os dados do endereço
    return {
      ...resultServico.rows[0],
      ...resultEndereco.rows[0],
    };
  } catch (error) {
    // Reverte a transação em caso de erro
    await db.query("ROLLBACK");
    throw new Error("Erro ao atualizar serviço: " + error.message);
  }
};

/**
 * Deleta um serviço a partir de seu ID
 * @param {number} id_servico - ID do serviço a ser deletado
 * @returns {Object} Serviço removido
 */
const deletarServico = async (id_servico) => {
  try {
    const result = await db.query(
      "DELETE FROM servicos WHERE id_servico = $1 RETURNING *",
      [id_servico]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao deletar serviço: " + error.message);
  }
};

const buscarServicoPorId = async (id_servico) => {
  try {
    const result = await db.query(
      `
      SELECT s.*, e.estado, e.cidade, e.bairro, e.cep, e.rua, e.numero, e.latitude, e.longitude
      FROM servicos s
      JOIN enderecos e ON s.id_endereco = e.id_endereco
      WHERE s.id_servico = $1
      `,
      [id_servico]
    );

    return result.rows[0]; // retorna o primeiro serviço (ou undefined se não existir)
  } catch (error) {
    throw new Error("Erro ao buscar serviço por ID: " + error.message);
  }
};

// Exporta as funções para uso externo
module.exports = {
  buscarTodosServicos,
  filtrarServicos,
  buscarServicoPorId,
  criarServico,
  atualizarServico,
  deletarServico,
};
