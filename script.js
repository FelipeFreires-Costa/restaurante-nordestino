

let cardapio = [
  { id: 1, nome: 'Pizza', preco: 48.00, quantidade: 15 },
  { id: 2, nome: 'Hamburguer', preco: 35.00, quantidade: 10 },
  { id: 3, nome: 'Lasanha', preco: 25.00, quantidade: 3 },
  { id: 4, nome: 'Coxinha de frango', preco: 5.00, quantidade: 7 },
  { id: 5, nome: 'Picanha', preco: 50.00, quantidade: 5 },
  { id: 6, nome: 'Camarão', preco: 25.00, quantidade: 23 }
]

let carrinho = []

//seleçao de elementos DOM
const carrinhoLista = document.getElementById('carrinho-lista')
const botaoAdicionar = document.querySelectorAll('.adicionar-btn')
const carrinhoTotal = document.getElementById('carrinho-total')
const carrinhoContainer = document.getElementById('carrinho-container')

function salvarCarrinho() {
  //converte o array carrinho para string JSON e salva
  localStorage.setItem('carrinhoDeCompra', JSON.stringify(carrinho))
}

//funçao para carregar o carrinho no localStorage

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem('carrinhoDeCompra')

  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo)
  }
  renderizarCarrinho()
}

//renderizar as informaçoes na tela
function renderizarCarrinho() {
  //limpar antes de renderizar para evitar duplicatas
  carrinhoLista.innerHTML = ''
  let totalGeral = 0

  //percorre o array carrinho
  carrinho.forEach(item => {//para cada item do carrinho...
    //criar um novo item 'li' e para cada item crie um botao
    const novoItem = document.createElement('li')
    const infoItem = document.createElement('p')
    const botaoAumentar = document.createElement('button')
    const botaoDiminuir = document.createElement('button')
    botaoAumentar.textContent = '+'
    botaoDiminuir.textContent = '-'

    botaoDiminuir.addEventListener('click', () => {
      removerUm(item.id)
    })

    botaoAumentar.addEventListener('click', () =>{
      adicionarUm(item.id)
    })

    //calcular o subtotal do produto preco x quantidade
    const subtotal = item.preco * item.quantidade
    novoItem.textContent = `${item.nome} R$: ${subtotal.toFixed(2)}`
    infoItem.textContent = `${item.quantidade}`

    novoItem.appendChild(infoItem)
    novoItem.appendChild(botaoDiminuir)
    novoItem.appendChild(botaoAumentar)
    carrinhoLista.appendChild(novoItem)

    totalGeral += subtotal
  })

  if (carrinhoTotal) {
    carrinhoTotal.textContent = `total: R$ ${totalGeral.toFixed(2)}`
  }
}


function removerUm(idDoProduto) {
  const removerItem = carrinho.find(item => item.id === idDoProduto)

  if (removerItem) {
    if (removerItem.quantidade > 1) {
      removerItem.quantidade -= 1
    } else {
      carrinho = carrinho.filter(item => item.id !== idDoProduto)
    }
  }
  salvarCarrinho()
  renderizarCarrinho()
}

function adicionarUm(idDoProduto) {
  const adicionarItem = carrinho.find(item => item.id === idDoProduto)

  if (adicionarItem) {
    if (adicionarItem.quantidade >= 1) {
      adicionarItem.quantidade += 1
    } else {
      return
    }
  }
  salvarCarrinho()
  renderizarCarrinho()
}

//funçao principal
function adicionarAoCarrinho(idDoProduto) {
  const cardapioCatalogo = cardapio.find(comida => comida.id === idDoProduto)
  if (!cardapioCatalogo) return

  const itemNoCarrinho = carrinho.find(item => item.id === idDoProduto)

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade += 1
  } else {
    const novoItem = {...cardapioCatalogo, quantidade: 1 }
    carrinho.push(novoItem)
  }
  salvarCarrinho()
  renderizarCarrinho()
}

carregarCarrinho()

botaoAdicionar.forEach(botao => {
  botao.addEventListener('click', (event) => {
    const idDoProduto = parseInt(event.target.dataset.id)

    adicionarAoCarrinho(idDoProduto)
  })
})