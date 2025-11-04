/**
 * init.sql - Script de inicialização do banco de dados
 *
 * Este arquivo contém a estrutura completa do banco de dados da aplicação,
 * definindo todas as tabelas necessárias com suas respectivas relações,
 * constraints e validações. É usado para setup inicial do sistema.
 */

-- =====================================================
-- LIMPEZA DO BANCO DE DADOS
-- =====================================================
-- Remove tabelas existentes para evitar conflitos durante a criação
-- A ordem é importante devido às dependências de chave estrangeira

-- Tabela de Administradores
DROP TABLE IF EXISTS administradores CASCADE;
DROP TABLE IF EXISTS enderecos CASCADE;
DROP TABLE IF EXISTS servicos CASCADE;

-- =====================================================
-- CRIAÇÃO DAS TABELAS
-- =====================================================

/**
 * Tabela: administradores
 * Armazena informações dos usuários administradores do sistema
 * Responsável pela autenticação e autorização de operações administrativas
 */
CREATE TABLE administradores (
    -- Chave primária com UUID gerado automaticamente
    id_administrador UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    
    -- Nome completo do administrador (até 100 caracteres)
    nome_completo VARCHAR(100),
    
    -- Email único para login (obrigatório e único no sistema)
    email VARCHAR(150) UNIQUE NOT NULL,
    
    -- Senha criptografada (armazenada com hash bcrypt)
    senha VARCHAR(255) NOT NULL
);

/**
 * Tabela: enderecos
 * Armazena informações de localização dos serviços
 * Permite geolocalização através de coordenadas latitude/longitude
 */
-- Tabela de Endereços
CREATE TABLE enderecos (
    -- Chave primária com UUID gerado automaticamente
    id_endereco UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    
    -- Estado onde o serviço está localizado
    estado VARCHAR(50),
    
    -- Cidade onde o serviço está localizado
    cidade VARCHAR(100),
    
    -- Bairro onde o serviço está localizado
    bairro VARCHAR(100),
    
    -- Código postal do endereço
    cep VARCHAR(20),
    
    -- Nome da rua/avenida
    rua VARCHAR(100),
    
    -- Número do endereço
    numero VARCHAR(10),
    
    -- Coordenada de latitude para geolocalização (9 dígitos, 6 decimais)
    latitude NUMERIC(9,6),
    
    -- Coordenada de longitude para geolocalização (9 dígitos, 6 decimais)
    longitude NUMERIC(9,6)
);

/**
 * Tabela: servicos
 * Armazena informações dos serviços oferecidos no sistema
 * Relaciona-se com endereços e contém dados de funcionamento e público-alvo
 */
-- Tabela de Serviços
CREATE TABLE servicos (
    -- Chave primária com UUID gerado automaticamente
    id_servico UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    
    -- Referência ao endereço onde o serviço está localizado (obrigatório)
    id_endereco UUID NOT NULL,
    
    -- Nome do serviço (obrigatório)
    nome VARCHAR(100) NOT NULL,
    
    -- Descrição detalhada do serviço oferecido
    descricao VARCHAR(500),
    
    -- Categoria ou tipo de localidade do serviço
    categoria_localidade VARCHAR(100),
    
    -- Dias de funcionamento do serviço
    data_funcionamento VARCHAR(100),
    
    -- Horários de funcionamento do serviço
    horario_funcionamento VARCHAR(100),
    
    -- Telefone para contato do serviço
    telefone VARCHAR(100),
    
    -- Gênero do público-alvo atendido pelo serviço
    genero VARCHAR(30),
    
    -- Faixa etária do público-alvo atendido pelo serviço
    faixa_etaria VARCHAR(30),

    -- =====================================================
    -- CONSTRAINTS E RELACIONAMENTOS
    -- =====================================================
    
    -- Chave estrangeira: referência ao endereço do serviço
    -- CASCADE: se o endereço for deletado, o serviço também será removido
    CONSTRAINT fk_servicos_endereco
        FOREIGN KEY (id_endereco)
        REFERENCES enderecos(id_endereco)
        ON DELETE CASCADE,

    -- Validação dos valores permitidos para o campo genero
    -- Garante que apenas valores específicos sejam aceitos
    CONSTRAINT chk_genero
        CHECK (genero IN ('Masculino', 'Feminino', 'Outro', 'Todos')),

    -- Validação dos valores permitidos para o campo faixa_etaria
    -- Garante que apenas faixas etárias pré-definidas sejam aceitas
    CONSTRAINT chk_faixa_etaria
        CHECK (faixa_etaria IN ('Infantil', 'Adolescente', 'Adulto', 'Idoso', 'Todos'))
);

