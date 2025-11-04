# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="./documentos/assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

# Mandacaru
<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="./documentos/assets/logo_mandacaru.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
</p>

## Winx

## 👩🏼‍🎓 Integrantes:

- <a href="https://www.linkedin.com/in/catarina-sayuri/">Catarina Sayuri Arashiro Braga Felipe</a>
- <a href="https://www.linkedin.com/in/giovanna-neves-rodrigues-6927262b8/">Giovanna Neves Rodrigues</a>
- <a href="https://www.linkedin.com/in/isabel-montenegro-133b5a345/">Isabel Montenegro Ruela</a>
- <a href="https://www.linkedin.com/in/lav%C3%ADnia-mendon%C3%A7a-b4b977243/">Lavínia Pietra Carvalho Mendonça</a>
- <a href="https://www.linkedin.com/in/llorengarcia/">Lorena Gabriela da Silva Garcia</a>
- <a href="https://www.linkedin.com/in/nicoleriedla/">Nicole Riedla Paiva Neves</a>
- <a href="https://www.linkedin.com/in/vitor-lopes-91763b34a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Vitor Lopes Lucena</a>

## 👩🏼‍🏫 Professores:

### Orientador(a)

- <a href="https://www.linkedin.com/in/fabiana-martins-de-oliveira-8993b0b2/">Fabiana Martins de Oliveira
  </a>

### Instrutores

- <a href="https://www.linkedin.com/in/bryan-kano/">Bryan Kano Ferreira</a>
- <a href="https://www.linkedin.com/in/gui-cestari/">Guilherme Henrique de Oliveira Cestari</a>
- <a href="https://www.linkedin.com/in/egondaxbacher/">Egon Ferreira Daxbacher</a>
- <a href="https://www.linkedin.com/in/profclaudioandre/">Cláudio Fernando André</a>
- <a href="https://www.linkedin.com/in/luciano-galdino-26191b36/">Luciano Galdino</a>

## 📝 Descrição

O produto desenvolvido é um website, um serviço digital que permite a diferentes tipos de usuários, em diversas localidades, realizarem pesquisas rápidas e simples sobre locais e serviços próximos. A plataforma conta com uma ampla gama de filtros que personalizam a busca, tornando a experiência cada vez mais alinhada ao perfil do usuário, promovendo auxílio e acolhimento. Sobretudo, trata-se de uma solução desenvolvida em parceria com o Instituto Cactos, organização que atua na prevenção de doenças mentais, mais do que no tratamento.

Sua infraestrutura é sólida, com uma interface que permite ao administrador responsável gerenciar as localidades, garantindo dinamismo e constante atualização conforme as mudanças nos serviços. Por ser uma plataforma web, pode ser acessada tanto em dispositivos desktop quanto mobile, com um design pensado para facilitar o acesso ao serviço.

O Mandacaru tem como missão democratizar o acesso a serviços de apoio, mantendo as informações sempre atualizadas e seguras. Embora seja uma solução abrangente, seu público-alvo principal são mulheres de até 25 anos e adolescentes em geral.

O desenvolvimento do projeto ocorrerá ao longo de 10 semanas e contará com um grupo formado por sete estudantes de diversos cursos, como Sistemas da Informação, Engenharia de Software, Administração Tech, entre outros, além do apoio de profissionais especializados que auxiliarão na orientação e no desenvolvimento. O produto se destaca no mercado por sua funcionalidade de mapas totalmente gerenciáveis, que asseguram a veracidade e a atualização das informações para o usuário final, além de uma interface desenvolvida com base em conceitos aprofundados de UX e design.

O nome “Mandacaru” está profundamente associado à marca para a qual está sendo desenvolvido, o Instituto Cactos, refletindo não apenas na identidade visual e no nome, mas também na temática central da prevenção, que permeia toda a proposta da plataforma.

## 📝 Link de demonstração

https://drive.google.com/file/d/1SeB0nccKeNzk7LxCHnLGgxUHri6TjeCE/view?usp=drive_link

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>document</b>: aqui estão todos os documentos do projeto, como o Web Application Document (WAD) bem como documentos complementares, na pasta "other".

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto de aplicação web.

- <b>.gititributtes</b>: Manipula comportamentos específicos do Git para certos tipos de arquivos.

- <b>.gitignore</b>: Define para o Git quais arquivos ou pastas não devem não devem entrar no versionamento.

- <b>README.md</b>: arquivo que serve como guia introdutório e explicação geral sobre o projeto e a aplicação (o mesmo arquivo que você está lendo agora).

## 💻 Configuração para desenvolvimento e execução do código

Neste documento, encontram-se todas as instruções necessárias para a instalação dos programas, bibliotecas e ferramentas essenciais à configuração do ambiente de desenvolvimento. O sistema em questão é desenvolvido com base na arquitetura MVC e pode ser executado em um servidor local (localhost). Com base nisso, segue um passo a passo para configurar o ambiente e executar o sistema

1. Baixar e instalar pacotes - para que o sistema rode de acordo com o esperado, é necessário instalar os seguintes pacotes:

IDE utilizada: [Visual Code](https://code.visualstudio.com/) <br>
Ambiente de execução de JavaScript: [Node](https://nodejs.org/pt)

2. Clone o repositório em questão.
3. No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```

5. Agora você pode acessar a aplicação através do link http://localhost:3000/

6. O servidor está online e acessível.

## 🔧 Configuração das credenciais do banco de dados (Supabase ou local)

Para que o sistema se conecte corretamente ao banco de dados, é necessário configurar as credenciais de acesso. Siga os passos abaixo:

1. **Arquivo de variáveis de ambiente (.env)**  
    Crie ou renomeie um arquivo chamado `.env` na pasta src do projeto. 
    Preencha as variáveis com os dados de acesso ao banco de dados **local** ou **Supabase**. Utilize o modelo abaixo:
    
    ```.env```
    
    `DB_HOST=localhost DB_PORT=5432 DB_NAME=mandacaru DB_USER=seu_usuario DB_PASSWORD=sua_senha`
    
    Para o Supabase, utilize as credenciais fornecidas no painel do Supabase, substituindo os valores acima.
    
2. **Atenção:** Nunca compartilhe seu arquivo `.env` publicamente, pois ele contém informações sensíveis.

## 🛠️ Inicialização e configuração do banco de dados

O projeto conta com um script de inicialização que automatiza a criação das tabelas no banco de dados. Para executá-lo:

1. Certifique-se de que o banco de dados informado no `.env` esteja criado e acessível.
    
2. Execute o seguinte comando na pasta src do projeto:
    
    ```bash```
    
    `npm run init-db`
    
    Esse script está localizado em:
    
    ```swift```
    
    `src/scripts/init.sql`
    
    Ele criará as tabelas necessárias e inserirá dados iniciais para testes.

## 🗃 Histórico de lançamentos

## 0.5.0 - 26/06/2025

* Revisão geral da documentação;
* Refinamento do projeto e lançamento do MVP
## 0.4.0 - 13/06/2025

* Segunda versão do sistema web:
	* Integração completa de back-end e front-end;
    - Relatório de desenvolvimento (seção 4.2);
* Relatório de Testes Automatizados e atualizações de documentação:
* Relatório de testes automatizados (seção 5.1)
- Atualizações de documentação:
    - Atualização da arquitetura (seção 3.1);
    - Atualização do protótipo e do guia de estilos (seções 3.3 e 3.4);
    - Atualização da modelagem do banco de dados (seção 3.5);
    - Atualização da documentação de webAPI e endpoints (seção 3.6).
## 0.3.0 - 30/05/2025

* Primeira versão do sistema web:
    - Implementação de endpoints;
    - Front-end rudimentar;
    - Algumas requisições já sendo feitas para o backend e obtendo dados;
    - Relatório de desenvolvimento (Seção 4.1)
- Atualizações da Arquitetura, Modelagem do Banco e Protótipo:
    - Atualização da arquitetura (seção 3.1);
    - Atualização do protótipo e do guia de estilos (seções 3.3 e 3.4);
    - Atualização da modelagem do banco de dados (seção 3.5).
- Documentação de WebAPI e endpoints:
    - Seção 3.6;
    - Arquivo `endpoints.md`.
- Lógica proposicional das consultas sql:
    - Seção 3.5.2.
## 0.2.0 - 16/05/2025
* Modelagem do banco de dados:
    * Seção 3.5.1;
    - Modelo relacional do banco de dados;
    - Modelo físico do banco de dados;
    - Protótipo de alta fidelidade e guia de estilos:
        - Seção 3.3;
        - Seção 3.4.
## 0.1.0 - 02/05/2025
    
* Entendimento do negócio e do usuário:
	* Seção 1.Intodução;
	* Seção 2.Visão Geral da Aplicação Web:
        * Escopo do projeto, contexto da indústria, modelo de 5 forças de Porter, análise SWOT, descrição da solução, proposta de valor, matriz de risco, personas e user stories.
    - Wireframes:
        - Seção 3.2
    - Arquitetura da solução:
        - Seção 3.1


## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Inteli-College/2025-1B-T17-IN02-G01/tree/main">Winx</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Intelihub/Template_M2">Inteli</a>, <a href="https://www.linkedin.com/in/catarina-sayuri/">Catarina Sayuri Arashiro Braga Felipe</a>, <a href="https://www.linkedin.com/in/giovanna-neves-rodrigues-6927262b8/">Giovanna Neves Rodrigues</a>, <a href="https://www.linkedin.com/in/isabel-montenegro-133b5a345/">Isabel Montenegro Ruela</a>, <a href="https://www.linkedin.com/in/lav%C3%ADnia-mendon%C3%A7a-b4b977243/">Lavínia Pietra Carvalho Mendonça</a>, <a href="https://www.linkedin.com/in/llorengarcia/">Lorena Gabriela da Silva Garcia</a>, <a href="https://www.linkedin.com/in/nicoleriedla/">Nicole Riedla Paiva Neves</a>, <a href="https://www.linkedin.com/in/vitor-lopes-91763b34a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Vitor Lopes Lucena</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
