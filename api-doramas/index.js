const express = require('express');

const app = express();

const PORTA = 3000;

// Array dos doramas
const doramas = [
  {
    id: 1,
    nome: 'Pousando no Amor',
    categoria: 'Romance',
    ano: 2019,
    plataforma: 'Netflix',
    nota: 9.0,
  },
  {
    id: 2,
    nome: 'Pretendente Surpresa',
    categoria: 'Romance',
    ano: 2022,
    plataforma: 'Netflix',
    nota: 8.5,
  },
  {
    id: 3,
    nome: 'Beleza Verdadeira',
    categoria: 'Romance',
    ano: 2020,
    plataforma: 'Viki',
    nota: 8.7,
  },
  {
    id: 4,
    nome: 'Rainha das Lágrimas',
    categoria: 'Romance',
    ano: 2024,
    plataforma: 'Netflix',
    nota: 9.1,
  },
  {
    id: 5,
    nome: 'Flor do Mal',
    categoria: 'Suspense',
    ano: 2020,
    plataforma: 'Viki',
    nota: 9.0,
  },
  {
    id: 6,
    nome: 'Round 6',
    categoria: 'Suspense',
    ano: 2021,
    plataforma: 'Netflix',
    nota: 8.0,
  },
  {
    id: 7,
    nome: 'Uma Advogada Extraordinária',
    categoria: 'Drama',
    ano: 2022,
    plataforma: 'Netflix',
    nota: 8.9,
  },
  {
    id: 8,
    nome: 'Goblin',
    categoria: 'Fantasia',
    ano: 2016,
    plataforma: 'Viki',
    nota: 8.8,
  },
  {
    id: 9,
    nome: 'Reply 1988',
    categoria: 'Drama',
    ano: 2015,
    plataforma: 'Netflix',
    nota: 9.2,
  },
  {
    id: 10,
    nome: 'A Lição',
    categoria: 'Suspense',
    ano: 2022,
    plataforma: 'Netflix',
    nota: 8.3,
  },
];

// Middleware para registrar as requisições
app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${req.method} ${req.url}`
  );

  next();
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Doramas da Nathi!');
});

// Listar doramas e aplicar filtros
app.get('/doramas', (req, res) => {
  const categoria = req.query.categoria;
  const anoMin = req.query.anoMin;

  let resultado = doramas;

  if (categoria) {
    resultado = resultado.filter(dorama =>
      dorama.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  if (anoMin !== undefined) {
    const ano = parseInt(anoMin);

    if (isNaN(ano)) {
      return res.status(400).json({
        erro: 'O ano mínimo precisa ser um número.'
      });
    }

    resultado = resultado.filter(dorama => dorama.ano >= ano);
  }

  res.json(resultado);
});

// Mostrar quantidade de doramas total 
app.get('/doramas/total', (req, res) => {
  res.json({
    total: doramas.length
  });
});

// Buscar um dorama pelo ID
app.get('/doramas/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      erro: 'O ID precisa ser um número.'
    });
  }

  const dorama = doramas.find(item => item.id === id);

  if (!dorama) {
    return res.status(404).json({
      erro: 'Dorama não encontrado.'
    });
  }

  res.json(dorama);
});


app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
