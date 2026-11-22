const API = "/livros";

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");

async function carregarLivros() {
    try {
        const resposta = await fetch(API);
        const livros = await resposta.json();

        lista.innerHTML = "";

livros.forEach(livro => {
    const div = document.createElement("div");
    div.className = "livro";

    const titulo = document.createElement("h3");
    titulo.textContent = livro.titulo;

    const autor = document.createElement("p");
    autor.textContent = `Autor: ${livro.autor}`;

    const ano = document.createElement("p");
    ano.textContent = `Ano: ${livro.ano}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${livro.lido ? "Lido" : "Não lido"}`;

    const botaoLeitura = document.createElement("button");
    botaoLeitura.textContent = livro.lido
        ? "Marcar como não lido"
        : "Marcar como lido";

    botaoLeitura.addEventListener("click", () => {
        alternarLeitura(livro.id, livro.lido);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", () => {
        excluirLivro(livro.id);
    });

    div.appendChild(titulo);
    div.appendChild(autor);
    div.appendChild(ano);
    div.appendChild(status);
    div.appendChild(botaoLeitura);
    div.appendChild(botaoExcluir);

    lista.appendChild(div);
});

    } catch (erro) {
        mensagem.textContent = "Erro ao carregar os livros.";
    }
}

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoLivro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        ano: Number(document.getElementById("ano").value),
        lido: document.getElementById("lido").checked
    };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoLivro)
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = dados.erro;
            return;
        }

        mensagem.textContent = "Livro cadastrado com sucesso!";
        form.reset();
        carregarLivros();

    } catch (erro) {
        mensagem.textContent = "Erro ao cadastrar o livro.";
    }
});

async function alternarLeitura(id, lido) {
    try {
        await fetch(`${API}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lido: !lido })
        });

        carregarLivros();

    } catch (erro) {
        mensagem.textContent = "Erro ao atualizar o livro.";
    }
}

async function excluirLivro(id) {
    const confirmar = confirm("Deseja realmente excluir este livro?");

    if (!confirmar) return;

    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        carregarLivros();

    } catch (erro) {
        mensagem.textContent = "Erro ao excluir o livro.";
    }
}

carregarLivros();