const prompt = require('prompt-sync')();

// QUESTAO 1

function avaliarRiscoDeCredito(rendaMensal, dividaAtual) {
  rendaMensal = parseFloat(rendaMensal);
  dividaAtual = parseFloat(dividaAtual);

  let taxa = (dividaAtual / rendaMensal) * 100;

  if (taxa < 10) {
    return 'Risco Baixo';
  } else if (taxa < 30) {
    return 'Risco Moderado';
  } else {
    return 'Risco Alto';
  }
}

let renda = prompt('Digite sua renda mensal: ');
let divida = prompt('Digite sua divida atual: ');

let resultado = avaliarRiscoDeCredito(renda, divida);

console.log('Risco de credito: ' + resultado);

// QUESTAO 2

let numeros = [];
let quantidade = parseInt(prompt('Quantos numeros deseja digitar? '));

for (let i = 0; i < quantidade; i++) {
  let numero = parseFloat(prompt('Digite um numero: '));
  numeros.push(numero);
}

console.log('Numeros:', numeros);

console.log('Maior numero:', Math.max(...numeros));
console.log('Menor numero:', Math.min(...numeros));

let dobro = numeros.map((numero) => numero * 2);
console.log('Dobro:', dobro);

let maioresQueCinco = numeros.filter((numero) => numero > 5);
console.log('Maiores que 5:', maioresQueCinco);

// QUESTAO 3

let carro = {
  marca: 'Toyota',
  modelo: 'Corolla',
  ano: 2020,

  exibirInfo: function () {
    console.log(
      'Marca: ' +
        this.marca +
        ' | Modelo: ' +
        this.modelo +
        ' | Ano: ' +
        this.ano,
    );
  },
};

carro.exibirInfo();

carro.cor = 'Preto';
carro.ano = 2025;

console.log(carro);

// QUESTAO 4 - OPCIONAL

class Livro {
  constructor(titulo, autor, ano) {
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
  }

  detalhes() {
    console.log(
      'Livro: ' +
        this.titulo +
        ' | Autor: ' +
        this.autor +
        ' | Ano: ' +
        this.ano,
    );
  }
}

let livro1 = new Livro('Dom Casmurro', 'Machado de Assis', 1899);
let livro2 = new Livro('O Pequeno Principe', 'Antoine de Saint-Exupery', 1943);

livro1.detalhes();
livro2.detalhes();

// QUESTAO 5

let palavra = prompt('Digite uma palavra: ');

console.log('Quantidade de caracteres: ' + palavra.length);

let invertida = palavra.split('').reverse().join('');

if (palavra.toLowerCase() == invertida.toLowerCase()) {
  console.log('A palavra e um palindromo.');
} else {
  console.log('A palavra nao e um palindromo.');
}
