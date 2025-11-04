    /**
     * servicoRoutes.js - Rotas responsáveis pelo gerenciamento de serviços
     *
     * Este arquivo define todas as rotas relacionadas aos serviços do sistema,
     * incluindo operações de CRUD e filtragem. Gerencia tanto rotas públicas
     * para consulta quanto rotas protegidas para administração dos serviços.
     */

    // Importa o módulo 'express' para criar rotas
    const express = require("express");

    // Cria uma instância do roteador do Express
    const router = express.Router();

    // Importa o controller responsável pela lógica de negócio dos serviços
    const servicoController = require("../controllers/servicoController");

    // Importa o middleware de autenticação para validar tokens JWT
    const authMiddleware = require("../middlewares/authMiddleware");

    // Importa o middleware para verificar se o usuário possui perfil de administrador
    const isAdm = require("../middlewares/isAdm");

    /**
     * Rota GET para filtrar serviços
     * Permite busca pública de serviços com filtros por critérios específicos
     * Endpoint: GET /filtrar
     */
    // Rota pública para buscar serviços filtrados por critérios (ex: estado, faixa etária)
    router.get("/filtrar", servicoController.filtrarServicos);

        router.get("/", servicoController.listarServicos);

    /**
     * Rota POST para criar novo serviço
     * Requer autenticação e perfil de administrador para criar serviços
     * Endpoint: POST /
     */
    // Criar novo serviço - Requer: autenticação + perfil administrativo
    router.post("/", authMiddleware, isAdm, servicoController.criarServico);

    /**
     * Rota PUT para atualizar serviço existente
     * Requer autenticação e perfil de administrador para modificar serviços
     * Endpoint: PUT /:id
     */
    // Atualizar serviço pelo ID - Requer: autenticação + perfil administrativo
    router.put("/:id", authMiddleware, isAdm, servicoController.atualizarServico);

    /**
     * Rota DELETE para remover serviço
     * Requer autenticação e perfil de administrador para deletar serviços
     * Endpoint: DELETE /:id
     */
    // Deletar serviço pelo ID - Requer: autenticação + perfil administrativo
    router.delete("/:id", authMiddleware, isAdm, servicoController.deletarServico);

    /**
     * Rota GET para obter serviço pelo ID
     * Requer autenticação e perfil de administrador para visualizar serviço específico
     * Endpoint: GET /:id
     */
    router.get("/:id", authMiddleware, isAdm, servicoController.obterServicoPorId);


    // Exporta o roteador para ser usado em outros arquivos da aplicação (como app.js)
    module.exports = router;