
# Express TypeScript API
Esse repositório pode ser usado como uma base para desenvolvimento de API's usando Nodejs, Typescript. O ambiente de desenvolvimento usa o `docker-compose` para inicializar serviços independentes tais como o mongodb.

Alguns pontos à serem observados no projeto:
* **[Dockerfile](https://github.com/johngrandson/ewally-api/blob/master/Dockerfile)** - Arquivo Dockerfile para gerar o build.
* **[docker-compose](https://github.com/johngrandson/ewally-api/blob/master/docker-compose.yml)** - Script Docker compose para iniciar o serviço em ambiente de produção.
* **[Containerized MongoDB for development](#development)** - Inicia uma instância local do container do MongoDB.
* **[MongoDB Connection Helper](https://github.com/johngrandson/ewally-api/blob/master/src/mongo-connection.ts)** - Um helper para conectar ao MongoDB de forma segura.
* **Joi** - Validação declarativa para payloads
* **[Middleware for easier async/await](https://github.com/johngrandson/ewally-api/blob/master/src/middleware/request-middleware.ts)** - Trata erros das rotas e as delega para o express error handler para previnir que o app quebre devido à erros não tratados.
* **[OpenAPI 3.0 Spec](https://github.com/johngrandson/ewally-api/blob/master/openapi.json)** - Um template para começar à desenvolver a documentação usando o OpenAPI 3.0. Toda documentação da API estará disponível na rota `http://localhost:3000/dev/api-docs`
* **[.env file for configuration](#environment)** - Configuração do servidor tais como porta, url do mongodb e etc.
* **[Winston Logger](#logging)** - Usa a lib winston como o logger padrão da aplicação.
* **ESLINT** - ESLINT configurado para linting.
* **Jest** - Lib Jest para rodar casos de testes.

## I. Instalação

### Usando `curl`

```
$ bash <(curl -s https://raw.githubusercontent.com/johngrandson/public/master/scripts/generate-express-ts-app.sh)
```

### Manualmente

#### 1. Clone o repositório

```
$ git clone git@github.com:johngrandson/ewally-api.git your-app-name
$ cd your-app-name
```

#### 2. Instalação das dependencias

```
$ npm i
```

## II. Rodando a api em ambiente de dev

### Iniciar o servidor em dev
Iniciar o servidor em ambiente de dev também irá iniciar o MongoDB como um serviço em um container do docker usando o comando `docker-compose.dev.yml`.

```
$ npm run dev
```
Rodar os comandos acima irá resultar em:
* 🌏**API Server** rodando em `http://localhost:3000`
* ⚙️**Swagger UI** em `http://localhost:3000/dev/api-docs`
* 🛢️**MongoDB** rodando em `mongodb://localhost:27017`

## III. Packing e Deployment
O container do mongo só é disponível no ambiente de dev. Quando você buildar e fizer o deploy da imagem do docker, certifique-se de fornecer as **[variáveis de ambiente corretas](#ambiente)**

#### 1. Build e iniciar sem o Docker

```
$ npm run build && npm run start
```

#### 2. Iniciar com o Docker

```
$ docker build -t ewally-api .
$ docker run -t -i \
      --env NODE_ENV=production \
      --env MONGO_URL=mongodb://host.docker.internal:27017/boletos \
      -p 8080:8080 \
      ewally-api
```

#### 3. Iniciar com o docker-compose

```
$ docker-compose up
```

---

## Ambiente
Para editar as variáveis de ambiente, crie um novo arquivo com o nome `.env` e copie todo o conteúdo do `.env.default` para iniciar.

| Nome da variável  | Tipo  | Valor | Descrição  |
|---|---|---|---|
| NODE_ENV  | string  | `development` | Ambiente da API. ex: `staging`  |
|  PORT | number  | `8080` | Porta para rodar o servidor da API. |
|  MONGO_URL | string  | `mongodb://localhost:27017/boletos` | URL do MongoDB |

## Logging
A aplicação usa o [winston](https://github.com/winstonjs/winston) como o logger padrão. O arquivo de configuração está em `src/logger.ts`.
* Todos os logs são salvos na pasta `./logs` e em `/logs` diretamente no container do Docker.
* O `docker-compose` tem um volume anexado ao container para expor o diretório do host ao container para escrever os logs.

### Estrutura do Projeto

```
+-- scripts
|   +-- dev.sh
+-- src
|   +-- controllers
|   |   +-- boleto
|   |   |   +-- add.ts
|   |   |   +-- one.ts
|   |   |   +-- index.ts
|   +-- errors
|   |   +-- application-error.ts
|   |   +-- bad-request.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   +-- models
|   |   +-- Boleto.ts
|   +-- public
|   |   +-- index.html
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- LICENSE
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- setup-github-actions.sh
+-- tsconfig.json
```
