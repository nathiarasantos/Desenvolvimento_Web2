# Minha Biblioteca — API REST de Livros

Projeto desenvolvido como atividade prática da disciplina de Desenvolvimento Web 2, do curso Técnico em Informática para Internet do IFCE — Campus Maranguape.

## Objetivo

Desenvolver uma API REST utilizando Node.js e Express para gerenciar uma coleção de livros, permitindo cadastrar, consultar, atualizar e excluir registros.

O projeto também possui uma interface web para facilitar a interação com a API.

## Tecnologias utilizadas

- Node.js
- Express
- HTML5
- CSS3
- JavaScript
- Fetch API
- Thunder Client para testes das rotas HTTP

## Estrutura do projeto

```text
livros-api/
├── backend/
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles/
│   │   └── styles.css
│   └── scripts/
│       └── app.js
├── package.json
└── package-lock.json
```

## Como executar o projeto

1. Clone ou baixe o repositório.
2. Abra a pasta do projeto no terminal.
3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor:

```bash
node backend/server.js
```

5. Acesse no navegador:

```text
http://localhost:3000
```

## Rotas da API

| Método HTTP | Rota | Descrição |
|---|---|---|
| GET | `/livros` | Lista todos os livros |
| GET | `/livros/:id` | Consulta um livro pelo ID |
| POST | `/livros` | Cadastra um novo livro |
| PUT | `/livros/:id` | Atualiza todos os dados de um livro |
| PATCH | `/livros/:id` | Atualiza parcialmente um livro |
| DELETE | `/livros/:id` | Exclui um livro |

### Filtro

É possível filtrar os livros pelo status de leitura:

- `/livros?lido=true` — livros já lidos.
- `/livros?lido=false` — livros ainda não lidos.

## Estrutura dos dados

Cada livro possui os seguintes campos:

```json
{
  "id": 1,
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899,
  "lido": true
}
```

## Validações

A API verifica:

- Título obrigatório e do tipo texto.
- Autor obrigatório e do tipo texto.
- Ano obrigatório e representado por um número inteiro positivo.
- Campo `lido` deve receber um valor booleano (`true` ou `false`).
- Verificação da existência do livro antes de atualizações e exclusões.

## Funcionalidades da interface

- Listagem dos livros