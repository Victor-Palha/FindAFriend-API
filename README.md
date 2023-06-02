# FindAFriend-API
uma API para a adoção de animais

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# Endpoints
Os endpoints seguem as seguintes especificações:
## Registro e Login
### Registro de uma ORG
**/signup/org** -> POST
```json
{
    "name": "Nome da ONG",
    "email": "email@org.com",
    "password": "senha123",
    "address": "Rua da ONG, 123",
    "cep": "12345678",
    "cnpj": "12345678000190",
    "city": "Cidade da ONG",
    "phone": "1234567890"
}
```
Retorna **status code** 201.
### Registro de um usuário
**/signup/user** -> POST
```json
{
    "name": "Nome do usuário",
    "email": "email@user.com",
    "password": "senha123",
    "cpf": "12345678901",
    "birthdate": "1990-01-01"
}
```
Retorna **status code** 201.
### Login
Usuários e ORGS fazem login pelo mesmo endpoint
*   **/signin** -> POST
```JSON
{
    "email": "email@test.com",
    "password": "password123"
}
```
Retorna **status code** 200 e um token JWT de autenticação no header da resposta.

## Pets
### Cadastrar um pet
Para cadastrar um pet, é necessário estar autenticado como uma **ORG**.
*   **/pet** -> POST
```JSON
{
    "species": "dog",
    "race": "vira-lata",
    "castrated": false,
    "vaccine_record": true
}
```
Retorna **status code** 201 e os dados do pet cadastrado.
### Listar pets
Para listar os pets, é necessário passar pelo menos a cidade como parâmetro.
*   Parâmetros:
```JSON
    {
        "city": "Cidade do pet", //OBRIGATÓRIO
        "species": "espécie do pet",
        "race": "raça do pet",
        "castrated": true ou false,
        "vaccine_record": true ou false,
        "page": 1 //Página da listagem OBRIGATÓRIO
    }
```
*   **/pet/fetch** -> GET
*   Retorna **status code** 200 e um **ARRAY DE OBJETOS** com os dados dos pets cadastrados.
### Listar um pet
Para listar um pet, é necessário passar o id do pet como parâmetro.
*  **/pet/:id_pet** -> GET
*  Retorna **status code** 200 e um **OBJETO** com os dados do pet cadastrado.

## Usuários e ORGS
### Listar um usuário
Para listar um usuário, é necessário estar autenticado como um **USUÁRIO**.
*  **/profile/user** -> GET
*  Retorna **status code** 200 e um **OBJETO** com os dados do usuário cadastrado.

### Listar ORGS
Para listar as ORGS, é necessário passar pelo menos a cidade como parâmetro.
*   Parâmetros:
```JSON
    {
        "city": "Cidade da ONG" //OBRIGATÓRIO
    }
```
*   **/org/fetch?city=cidade** -> GET
*   Retorna **status code** 200 e um **ARRAY DE OBJETOS** com os dados das ORGS cadastradas.

### Listar uma ORG
Para listar uma ORG, é necessário passar o id da ORG como parâmetro.
*  **/org/:id** -> GET
*  Retorna **status code** 200 e um **OBJETO** com os dados da ORG cadastrada.

## Adoções
### Adotar um pet
Para adotar um pet, é necessário estar autenticado como um **USUÁRIO**.
*   O usuário deve passar o id do pet como parâmetro.
*   **/contact/:id_pet** -> GET
*   Retorna **status code** 200 e um objeto contendo o número de WhatsApp da ORG responsável pelo pet.

### Finalizar uma adoção
Para finalizar uma adoção, é necessário estar autenticado como uma **ORG**.
*  A organização responsável pelo pet deve passar o id do pet e o cpf do usuário como parâmetro.
*  **/adoption/:cpf/:pet_id** -> PATCH
*  Retorna **status code** 200 e um **OBJETO** com os dados do pet cadastrado.

# Tecnologias utilizadas
*   Node.js
*   Fastify
*   PostgreSQL
*   TypeORM Prisma
*   JWT
*   Vitest
*   Docker
*   TypeScript

# Arquitetura
A arquitetura do projeto foi pensada para ser o mais simples possível, porém, sem deixar de lado a escalabilidade e a manutenibilidade. Para isso, foi utilizado o padrão de arquitetura **MVC** (Model-View-Controller), que separa as responsabilidades de cada parte do projeto. Além disso, foi utilizado o padrão de arquitetura **Repository**, que separa as responsabilidades de acesso ao banco de dados e de regras de negócio além de facilitar a manutenção do código e testar a aplicação com os testes unitários. Além disso foi utilizado o padrão de arquitetura **Factory**, que separa as responsabilidades de criação de objetos e de regras de negócio juntamente com a metodologia **TDD** (Test Driven Development), que consiste em escrever os testes antes de escrever o código, para garantir que o código escrito atenda aos requisitos da aplicação. Todo os projeto foi pensado utilizando o padrão **SOLID**

# Como rodar o projeto
Para rodar o projeto, é necessário ter o **Docker** e o **Docker Compose** instalados na máquina. Após isso, basta rodar o comando `docker-compose up` na raiz do projeto para subir o banco de dados. Após isso basta rodar os comandos `npm` para instalar as dependências.
*   `npm install` //Instala as dependências
*   `npm run test:ce` //Configurar env para testes
*   `npm run test:ie` //Configurar env para testes 
*   `npm run test`  //Rodar os testes
*   `npm run dev` //Rodar o projeto em modo de desenvolvimento
*   `npm run build` //Compilar o projeto
*   `npm run start` //Rodar o projeto compilado
# váriaveis de ambiente
Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes váriaveis:
*   DATABASE_URL="postgresql://docker:docker@localhost:5432/find-a-friend?schema=public" <-URL de conexão com o banco de dados no docker

*   PORT=   <- Porta em que o servidor irá rodar

*   CPF_TEST= <- CPF para testes de criação de usuário

*   JWT_TOKEN= <- Chave secreta para geração de token JWT

# Estrutura do banco de dados
![Diagrama do banco de dados](./faf.png)