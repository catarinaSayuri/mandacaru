/**
 * enderecoService.js - Serviço de gerenciamento de endereços
 *
 * Este arquivo contém a lógica de acesso ao banco de dados para operações
 * relacionadas a endereços, incluindo busca e criação de registros.
 * É responsável por manipular os dados da tabela de endereços no sistema.
 */

// Importa a configuração de conexão com o banco de dados
const db = require("../config/db");

/**
 * Busca todos os endereços cadastrados no sistema
 * @returns {Array} Lista de objetos contendo os dados dos endereços
 */
const buscarTodosEnderecos = async () => {
  try {
    // Executa query para selecionar todos os registros da tabela "enderecos"
    const result = await db.query("SELECT * FROM enderecos");

    // Retorna as linhas (endereços) obtidas da consulta
    return result.rows;
  } catch (error) {
    // Lança erro descritivo caso a consulta falhe
    throw new Error("Erro ao obter endereços: " + error.message);
  }}
// Se este arquivo não existir, crie-o com estas funções básicas

/**
 * Cria um novo endereço no banco de dados
 * @param {Object} endereco - Objeto contendo os campos do novo endereço
 * @param {string} endereco.estado - Estado (UF) do endereço
 * @param {string} endereco.cidade - Cidade do endereço
 * @param {string} endereco.bairro - Bairro do endereço
 * @param {string} endereco.cep - CEP do endereço
 * @param {string} endereco.rua - Nome da rua
 * @param {string|number} endereco.numero - Número da residência
 * @param {string|number} endereco.latitude - Coordenada de latitude
 * @param {string|number} endereco.longitude - Coordenada de longitude
 * @returns {number} ID do novo endereço criado
 */
const criarEndereco = async ({
  estado,
  cidade,
  bairro,
  cep,
  rua,
  numero,
  latitude,
  longitude,
}) => {
  try {
    // Executa query de inserção e retorna o ID do novo endereço
    const result = await db.query(
      `INSERT INTO enderecos (
         estado, cidade, bairro, cep, rua, numero, latitude, longitude
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id_endereco`,
      [estado, cidade, bairro, cep, rua, numero, latitude, longitude]
    );

    // Loga o resultado da operação para depuração (opcional)
    console.log(result);

    // Retorna apenas o ID do novo endereço
    return result.rows[0].id_endereco;
  } catch (error) {
    // Lança erro descritivo caso a inserção falhe
    throw new Error("Erro ao criar endereço: " + error.message);
  }
}
// Exporta as funções para uso em outros módulos
module.exports = {
  buscarTodosEnderecos,
  criarEndereco,
};