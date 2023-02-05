# Perfil profissional

Projeto Perfil Profissional, Implementado Modulo 2 Curso Fabrica de Programador.

Este projeto implementa uma __API__ em **NodeJS**, utilizando **Express** como gerenciador de requisições **HTTP**, banco de dados não relacional **MongoDB** e o framework ODM **Mongoose** para intermediar a comunicação entre a aplicação e o banco de Dados.

O projeto trata-se de uma aplicação de gerenciamento de perfis profissionais e conexões entre eles. Portanto é possivel Cadastrar Perfis e a Comunicação entre Perfis por meio de Notificações.

Este documento tem por objetivo detalhar os elementos presentes no projeto do Perfil Profissional, incluindo dependências, *scripts* de execução, definição de Entidades e *Endpoints*.

<br>

# Entidades

- Perfil
- Notificacao

<br> 

## Perfil

Atributo | Tipo 
-------- | ------
nome | String*
dataNasc | Date*
disponibilidadeMudanca | Boolean*
disponibilidadeHorario | Enum["Meio Periodo", "Integral"]*
skills | Array< String >*
educacao | Array< Educacao >*
certificacoes | Array< Certificacao >
experiencias | Array< Experiencia >
usuario | Usuario*
conexoes | Array< Perfil >

<br>

## Notificacao

Atributo | Tipo 
-------- | ------
tipo | Enum["Contato", "Solicitação de Amizade"]*
titulo | String*
descricao | String
lida | Boolean*
remetente | Perfil*
destinatario | Perfil*


> Entidades marcadas com asterisco são obrigatórias.

<br>

## Entidades Internas
<br>

### Educacao

Atributo | Tipo 
-------- | ------
instituicao | String
ingresso | Date
conclusao | Date
nivelEscolaridade | Enum["Ensino Fundamental", "Ensino Médio", "Ensino Superior", "Pós-graduação", "Mestrado", "Doutorado"]
completo | Boolean

<br>

### Certificacao

Atributo | Tipo 
-------- | ------
instituicao | String
titulo | String
cargaHoraria | Number

<br>

### Experiencia

Atributo | Tipo 
-------- | ------
instituicao | String
ingresso | Date
conclusao | Date

<br>

### Usuario

Atributo | Tipo 
-------- | ------
email | String
senha | String

<br>

# Endpoints

## Perfil

Recurso | Método | Autenticado? | Objetivo | Retorno
------- | ------ | ---- | -------- | -------
/perfil | GET | Não | Últimos 5 perfis cadastrados | Lista de perfis JSON
/perfil/:id | GET | Não | Busca um perfil por ID | Perfil JSON
/perfil | POST | Não | Cadastrar um Perfil | perfil cadastrado JSON
/perfil/:id | PUT | Sim | Editar um perfil | perfil editado JSON
/perfil/conexao | POST | Sim | Conecta 2 perfis (Conexão/Amizade) | Mensagem JSON

<br>

## Login

Recurso | Método | Autenticado? | Objetivo | Retorno
------- | ------ | ---- | -------- | -------
/login | POST | Não | Efetuar Autenticação do Usuario | Token, Email e Perfil

<br>

## Notificacao

Recurso | Método | Autenticado? | Objetivo | Retorno
------- | ------ | ---- | -------- | -------
/notificacao/:id | GET | Sim | Buscar uma notificação por ID | Notificação JSON
/notificacao/perfil/:id | GET | Sim | Buscar todas as notificações do perfil por ID | Lista Notificações JSON
/notificacao | POST | Sim | Cadastrar uma nova notificação | Notificação cadastrada JSON
/notificacao/lida/:id | PUT | Sim | Muda o *status* da notificação para lida | Notificação Editada JSON

<br>

# Arquitetura

- **SERVICE** - Trata regras de negoico
- **CONTROLLER** - Executa ação efetivamente
- Outra camada que poderia existir é **REPOSITORY** Camada que tem acesso a estrutura de dados, como BD
- Ex venda, **ROTA/ROUTES** > **SERVICE** (*Regra de negocio*, ex: so pode vender > 18) > **CONTROLLER** (*Trata, executa*) > **REPOSITORY** (*Ações no BD*, como registrar venda)
    > adicionar camadas deixa o codigo nao acoplado, ou seja codigo fica organizado e caso erro mais manutenivel.

    > cada um tem sua propria funcao, sem acoplamento, nos arquitetos temos que analisar pra tambem nao colocar muita coisa em uma aplicacao pequena..
- tambem temos a camada de **MODEL** , onde são *definidas as Entidades* como Entidade Perfil, é um objeto de tal tipo, com tais campos(POO)...
- Com **FRAMEWORK ODM** (Object Document Model) teremos que cuidar da parte do modelo, para regras de adicao de modelo, campos nao nullo, tem q sere de tal tipo...
    > Framework ODM **Mongoose** (Utiliza-se como se fosse, Model & Repository juntos, pois criamos o objeto e pedimos para ele se salvar)

    > Como nao temos muitas regras de negocio, utilizaremos:
    > ###### **ROTA** > **SERVICE** (Regra de negocio e Fazendo papel de **CONTROLLER** (trata e executa)).

<br>

## Middleware

- "Como um porteiro", as **Requisições** tem definido quais recursos são bloqueados, e os que forem passarão pelo **Middleware** este *verificará as credenciais*, se válidas permite avançar senão o bloqueia, se a rota não exigir **autenticação** nao passara pelo Middleware