# API de Doramas

## Sobre o projeto

Esta API foi desenvolvida como atividade da disciplina de Desenvolvimento Web 2, do curso Técnico em Informática para Internet do IFCE Campus Maranguape.

O projeto apresenta um catálogo de doramas com informações como nome, categoria, ano de lançamento, plataforma e nota.

## Tecnologias utilizadas

- Node.js
- Express

## Como instalar e executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node index.js
```

3. Acesse no navegador:

http://localhost:3000

## Rotas disponíveis

| Método | Endereço | Descrição |
|---|---|---|
| GET | `/` | Exibe mensagem de boas-vindas. |
| GET | `/doramas` | Retorna todos os doramas. |
| GET | `/doramas/3` | Retorna o dorama com ID 3. |
| GET | `/doramas/total` | Informa a quantidade de doramas cadastrados. |
| GET | `/doramas?categoria=romance` | Filtra os doramas por categoria. |
| GET | `/doramas?anoMin=2020` | Retorna doramas lançados a partir de 2020. |
| GET | `/doramas?categoria=romance&anoMin=2020` | Combina os filtros de categoria e ano. |

## Tratamento de erros

- Código 400: quando o ID ou o filtro numérico informado é inválido.
- Código 404: quando o ID não corresponde a nenhum dorama cadastrado.

## Middleware

A API possui um middleware global que registra no terminal a data, o horário, o método e o endereço de cada requisição.

## Requisito próprio

Foi desenvolvida a rota `/doramas/total`, que retorna a quantidade total de doramas cadastrados no array.

## Dados

O catálogo possui 10 doramas cadastrados diretamente no código, sem utilização de banco de dados.