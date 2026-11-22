const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

let livros = [
    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899,
        lido: true
    },
    {
        id: 2,
        titulo: "Capitães da Areia",
        autor: "Jorge Amado",
        ano: 1937,
        lido: false
    },
    {
        id: 3,
        titulo: "O Cortiço",
        autor: "Aluísio Azevedo",
        ano: 1890,
        lido: false
    },
];

let proximoId = 4;

app.get("/livros", (req, res) => {
    let resultado = livros;

    if (req.query.lido !== undefined) {
        resultado = resultado.filter(l => String(l.lido) === req.query.lido);
    }

    res.json(resultado);
});

function validar(dados, parcial = false) {
    const { titulo, autor, ano, lido } = dados;

    if (!parcial || titulo !== undefined) {
        if (typeof titulo !== "string" || titulo.trim() === "") {
            return "O título é obrigatório e deve ser um texto";
        }
    }

    if (!parcial || autor !== undefined) {
        if (typeof autor !== "string" || autor.trim() === "") {
            return "O autor é obrigatório e deve ser um texto";
        }
    }

    if (!parcial || ano !== undefined) {
        if (!Number.isInteger(ano) || ano < 1) {
            return "O ano é obrigatório e deve ser um número inteiro";
        }
    }

    if (lido !== undefined && typeof lido !== "boolean") {
        return "O campo lido deve ser true ou false";
    }

    return null;
}


app.get("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "O id deve ser um número" });
    }

    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(livro);
});


app.post("/livros", (req, res) => {
    const erro = validar(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    const { titulo, autor, ano, lido = false } = req.body;

    const novo = {
        id: proximoId++,
        titulo: titulo.trim(),
        autor: autor.trim(),
        ano,
        lido
    };

    livros.push(novo);

    res.status(201).location(`/livros/${novo.id}`).json(novo);
});

app.put("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "O id deve ser um número" });
    }

    const indice = livros.findIndex(l => l.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const erro = validar(req.body);

    if (erro) {
        return res.status(400).json({ erro });
    }

    const { titulo, autor, ano, lido = false } = req.body;

    livros[indice] = { id, titulo: titulo.trim(), autor: autor.trim(), ano, lido };

    res.json(livros[indice]);
});

app.patch("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "O id deve ser um número" });
    }

    const indice = livros.findIndex(l => l.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const erro = validar(req.body, true);

    if (erro) {
        return res.status(400).json({ erro });
    }

    livros[indice] = { ...livros[indice], ...req.body };

    res.json(livros[indice]);
});


app.delete("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "O id deve ser um número" });
    }

    const indice = livros.findIndex(l => l.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    livros.splice(indice, 1);

    res.status(204).send();
});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});