# API Locador

Microsserviço responsável pelo cadastro e gerenciamento de locadores de uma carteira imobiliária.

O sistema foi desenvolvido como parte de um projeto acadêmico de ADS, seguindo uma arquitetura baseada em microsserviços. Cada microsserviço possui seu próprio banco de dados e configuração independente.

---

## Visão Geral

O **Microsserviço Locador** é responsável por gerenciar:

* Locadores;
* Endereço do locador;
* Status do locador: `ATIVO` ou `INATIVO`.

O contrato de locação **não faz parte deste microsserviço**. Por decisão do grupo, a responsabilidade de contrato ficou centralizada no Microsserviço Catálogo de Imóveis, evitando duplicidade e inconsistência de status entre APIs diferentes.

---

## Tecnologias Utilizadas

* Node.js
* TypeScript
* NestJS
* Prisma ORM 7.8.0
* MariaDB/MySQL
* JWT
* RBAC
* Swagger/OpenAPI
* Docker
* Jest

---

## Versões Utilizadas

```bash
node -v
# v24.16.0
```

```bash
npx prisma -v
# prisma: 7.8.0
# @prisma/client: 7.8.0
```

---

## Estrutura Principal do Projeto

```text
src/
 ├── common/
 │    ├── auth/
 │    ├── decorators/
 │    ├── guards/
 │    ├── interfaces/
 │    └── strategies/
 │
 ├── database/
 │    ├── database.module.ts
 │    └── prisma.service.ts
 │
 ├── generated/
 │    └── prisma/
 │
 ├── modules/
 │    ├── health/
 │    └── locador/
 │         ├── controllers/
 │         ├── dto/
 │         ├── enums/
 │         ├── mappers/
 │         └── services/
 │
 ├── app.module.ts
 └── main.ts
```

---

## Banco de Dados

O banco de dados do Microsserviço Locador está hospedado no servidor da faculdade.

A API acessa esse banco através da variável `DATABASE_URL`.

O banco **não roda dentro do Docker** neste projeto. O Docker roda apenas a API.

Fluxo:

```text
API Locador
   ↓
DATABASE_URL
   ↓
Banco MySQL/MariaDB no servidor da faculdade
```

---

## Tabelas do Microsserviço Locador

O microsserviço utiliza as seguintes tabelas:

```text
locador
endereco_locador
```

### Tabela `locador`

Principais campos:

```text
id
usuario_id
nome
cpf
email
status
criado_em
atualizado_em
```

O campo `usuario_id` representa o **ID do corretor logado**, vindo do token JWT.

### Tabela `endereco_locador`

Principais campos:

```text
locador_id
logradouro
numero
complemento
bairro
cidade
estado
cep
```

---

## Regras de Negócio

* O usuário logado representa o corretor.
* O corretor gerencia sua própria carteira de locadores.
* O campo `locador.usuario_id` recebe o ID do corretor autenticado.
* O front-end não deve enviar `usuario_id` no body.
* O ID do corretor é obtido através do token JWT.
* Um corretor só pode acessar locadores vinculados ao próprio `usuario_id`.
* A exclusão de locador é lógica.
* O endpoint `DELETE /locadores/:id` altera o status para `INATIVO`.
* Um locador inativo pode ser reativado.
* O endpoint `GET /locadores` retorna apenas locadores ativos por padrão.
* Para listar inativos, deve ser usado `GET /locadores?status=INATIVO`.

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
PORT=3001
DATABASE_URL=mysql://USUARIO:SENHA@SERVIDOR:3306/NOME_DO_BANCO
JWT_SECRET=SUA_CHAVE_JWT
```

Importante:

* Não usar aspas na `DATABASE_URL`.
* Não subir o `.env` para o Git.
* A chave real do JWT deve ficar apenas no `.env`.
* O arquivo `.env.example` deve conter apenas valores genéricos.

Exemplo de `.env.example`:

```env
PORT=3001
DATABASE_URL=mysql://USUARIO:SENHA@SERVIDOR:3306/NOME_DO_BANCO
JWT_SECRET=SUA_CHAVE_JWT_AQUI
```

---

## Instalação do Projeto

Instale as dependências:

```bash
npm install
```

Gere o Prisma Client:

```bash
npx prisma generate
```

---

## Rodar Localmente

```bash
npm run start:dev
```

A API será executada em:

```text
http://localhost:3001
```

---

## Swagger

A documentação da API está disponível em:

```text
http://localhost:3001/api/docs
```

---

## HealthCheck

Endpoint público para verificar se a API e o banco estão funcionando:

```http
GET /health
```

Exemplo:

```text
http://localhost:3001/health
```

Resposta esperada:

```json
{
  "status": "UP",
  "servico": "api-locador",
  "database": "UP",
  "timestamp": "2026-05-23T20:00:00.000Z"
}
```

---

## Autenticação e Autorização

As rotas de `/locadores` são protegidas por JWT.

O token deve ser enviado no header:

```http
Authorization: Bearer TOKEN_JWT
```

As roles permitidas são:

```text
USER
ADMIN
```

O Gateway apenas repassa o token para o Microsserviço Locador.

O Microsserviço Locador valida o token localmente usando a variável:

```env
JWT_SECRET
```

O ID do usuário autenticado pode vir no token como:

```text
sub
id
usuarioId
```

O `JwtStrategy` converte esse valor para:

```ts
usuario.id
```

Esse ID é usado internamente como:

```text
locador.usuario_id
```

---

## Gerar Token Local de Desenvolvimento

Enquanto o microsserviço de Auth não estiver disponível, é possível gerar um token local para testes.

Com o `.env` configurado, execute:

```bash
node scripts/generate-dev-token.js
```

Copie o token gerado e use como Bearer Token no Swagger ou Insomnia.

Esse token é apenas para desenvolvimento local.

No fluxo final do sistema, o token será gerado pelo Microsserviço de Login/Auth e repassado pelo API Gateway.

---

## Endpoints

### Locadores

| Método | Endpoint                    | Protegido | Descrição                                 |
| ------ | --------------------------- | --------: | ----------------------------------------- |
| POST   | `/locadores`                |       Sim | Cadastra locador com endereço             |
| GET    | `/locadores`                |       Sim | Lista locadores ativos do corretor logado |
| GET    | `/locadores?status=ATIVO`   |       Sim | Lista locadores ativos                    |
| GET    | `/locadores?status=INATIVO` |       Sim | Lista locadores inativos                  |
| GET    | `/locadores/:id`            |       Sim | Busca locador por ID                      |
| PATCH  | `/locadores/:id`            |       Sim | Atualiza locador e/ou endereço            |
| DELETE | `/locadores/:id`            |       Sim | Inativa locador                           |
| PATCH  | `/locadores/:id/reativar`   |       Sim | Reativa locador                           |

### Health

| Método | Endpoint  | Protegido | Descrição                     |
| ------ | --------- | --------: | ----------------------------- |
| GET    | `/health` |       Não | Verifica saúde da API e banco |

---

## Exemplos de Requisição

### Cadastrar Locador

```http
POST /locadores
```

Body:

```json
{
  "nome": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@email.com",
  "endereco": {
    "cep": "01001000",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apartamento 45",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP"
  }
}
```

---

### Listar Locadores Ativos

```http
GET /locadores
```

---

### Listar Locadores Inativos

```http
GET /locadores?status=INATIVO
```

---

### Buscar Locador por ID

```http
GET /locadores/1
```

---

### Atualizar Locador

```http
PATCH /locadores/1
```

Body:

```json
{
  "nome": "João Carlos da Silva",
  "email": "joao.carlos@email.com",
  "endereco": {
    "cep": "01311000",
    "logradouro": "Avenida Paulista",
    "numero": "1000",
    "complemento": "Sala 1201",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP"
  }
}
```

---

### Inativar Locador

```http
DELETE /locadores/1
```

Esse endpoint não apaga fisicamente o registro. Ele altera:

```text
status = INATIVO
```

---

### Reativar Locador

```http
PATCH /locadores/1/reativar
```

Esse endpoint altera:

```text
status = ATIVO
```

---

## Testes

Rodar todos os testes:

```bash
npm test
```

Resultado esperado:

```text
Test Suites: 2 passed
Tests: 13 passed
```

Rodar testes com cobertura:

```bash
npm run test:cov
```

---

## Build

```bash
npm run build
```

---

## Docker

Criar a imagem Docker:

```bash
docker build -t api-locador .
```

Rodar o container:

```bash
docker run --rm --name api-locador -p 3001:3001 --env-file .env api-locador
```

Depois acessar:

```text
http://localhost:3001/health
```

e:

```text
http://localhost:3001/api/docs
```

---

## Observações sobre Docker

O Docker deste projeto sobe apenas a API Locador.

O banco de dados continua sendo externo, hospedado no servidor da faculdade.

O container acessa o banco usando a variável:

```env
DATABASE_URL
```

---

## Prisma

O projeto utiliza Prisma `7.8.0`.

O Prisma Client é gerado em:

```text
src/generated/prisma
```

Se ocorrer erro relacionado ao Prisma Client, execute:

```bash
npx prisma generate
```

Se houver mudança estrutural no banco, execute:

```bash
npx prisma db pull
npx prisma generate
```

---

## Comandos Úteis

Instalar dependências:

```bash
npm install
```

Gerar Prisma Client:

```bash
npx prisma generate
```

Rodar local:

```bash
npm run start:dev
```

Rodar testes:

```bash
npm test
```

Gerar build:

```bash
npm run build
```

Criar imagem Docker:

```bash
docker build -t api-locador .
```

Rodar Docker:

```bash
docker run --rm --name api-locador -p 3001:3001 --env-file .env api-locador
```

---

## Possíveis Problemas

### Porta 3001 já está em uso

Erro:

```text
EADDRINUSE: address already in use :::3001
```

Solução:

Verificar se existe container rodando:

```bash
docker ps
```

Parar container:

```bash
docker stop api-locador
```

Ou parar o `npm run start:dev` em outro terminal.

---

### Erro no Prisma Client

Solução:

```bash
npx prisma generate
```

---

### Docker não conecta no banco

Verifique se o `.env` está sem aspas:

```env
DATABASE_URL=mysql://USUARIO:SENHA@SERVIDOR:3306/NOME_DO_BANCO
```

Não usar:

```env
DATABASE_URL="mysql://USUARIO:SENHA@SERVIDOR:3306/NOME_DO_BANCO"
```

---

## Status do Projeto

Funcionalidades implementadas:

* CRUD de locador;
* Cadastro de endereço junto com locador;
* Listagem por status;
* Inativação lógica;
* Reativação;
* Autenticação JWT;
* RBAC com `USER` e `ADMIN`;
* HealthCheck;
* Swagger/OpenAPI;
* Prisma 7.8.0;
* Docker;
* Testes unitários.
