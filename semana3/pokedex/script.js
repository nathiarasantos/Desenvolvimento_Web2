const URL_API = "https://pokeapi.co/api/v2/pokemon/";

const campoNome = document.getElementById("nomePokemon");
const botaoBuscar = document.getElementById("btnBuscar");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

// Busca os dados do Pokémon na API
async function buscarPokemon(nome) {
    const resposta = await fetch(URL_API + nome.toLowerCase().trim());

    if (!resposta.ok) {
        throw new Error("Pokémon não encontrado!");
    }

    const pokemon = await resposta.json();

    return pokemon;
}

// Cria o cartão com as informações do Pokémon
function criarCartao(pokemon) {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao-pokemon");

    const nome = document.createElement("h2");
    nome.textContent = pokemon.name.toUpperCase();

    const numero = document.createElement("p");
    numero.textContent = "Número: #" + pokemon.id;

    const imagem = document.createElement("img");
    imagem.src = pokemon.sprites.front_default;
    imagem.alt = "Imagem de " + pokemon.name;

    const tipos = document.createElement("p");
    tipos.textContent = "Tipo: " + pokemon.types
        .map(item => item.type.name)
        .join(", ");

    const altura = document.createElement("p");
    altura.textContent = "Altura: " + pokemon.height / 10 + " m";

    const peso = document.createElement("p");
    peso.textContent = "Peso: " + pokemon.weight / 10 + " kg";

    cartao.appendChild(nome);
    cartao.appendChild(imagem);
    cartao.appendChild(numero);
    cartao.appendChild(tipos);
    cartao.appendChild(altura);
    cartao.appendChild(peso);

    return cartao;
}

// Carrega e exibe o Pokémon na página
async function carregarPokemon(nome) {
    mensagem.textContent = "Carregando...";
    resultado.textContent = "";

    try {
        const pokemon = await buscarPokemon(nome);

        const cartao = criarCartao(pokemon);

        resultado.appendChild(cartao);

        mensagem.textContent = "";

    } catch (erro) {
        mensagem.textContent = erro.message;
        resultado.textContent = "";
    }
}

// Evento do botão de pesquisa
botaoBuscar.addEventListener("click", function() {
    const nome = campoNome.value.trim();

    if (nome === "") {
        mensagem.textContent = "Digite o nome de um Pokémon!";
        resultado.textContent = "";
        return;
    }

    carregarPokemon(nome);
});

// Permite pesquisar apertando Enter
campoNome.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        botaoBuscar.click();
    }
});

// Carrega um Pokémon automaticamente ao abrir a página
carregarPokemon("pikachu");