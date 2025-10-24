

let cardapio = [
  { id: 1, nome: 'Baião de Dois', preco: 48.00, quantidade: 15 },
  { id: 2, nome: 'Carne de Sol', preco: 35.00, quantidade: 10 },
  { id: 3, nome: 'Acarajé', preco: 25.00, quantidade: 3 },
  { id: 4, nome: 'Vatapá Cremoso', preco: 35.00, quantidade: 7 },
  { id: 5, nome: 'Cuscuz Nordestino', preco: 50.00, quantidade: 5 },
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
    const quantidadeContainer = document.createElement('div')
    const iconeAumentar = document.createElement('img')
    iconeAumentar.src = 'img/plus-svgrepo-com.svg'
    const iconeDiminuit = document.createElement('img')
    iconeDiminuit.src = 'img/minus-svgrepo-com.svg'
    quantidadeContainer.className = 'quantidade-container';


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
    novoItem.appendChild(quantidadeContainer)
    quantidadeContainer.appendChild(botaoDiminuir)
    quantidadeContainer.appendChild(infoItem)
    quantidadeContainer.appendChild(botaoAumentar)
    carrinhoLista.appendChild(novoItem)
    botaoAumentar.appendChild(iconeAumentar)
    botaoDiminuir.appendChild(iconeDiminuit)
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

document.addEventListener('DOMContentLoaded', function() {
  const carrinhoVisivel = document.getElementById('aparecer-carrinho')
  const btnVoltarAoTopo1 = document.getElementById('btnVoltarAoTopo')

  //define a altura do gatinho em 500px
  const gatinhoAltura = 500
  const Altura = 300

function gerenciarScroll() {
    // 1. Chama a lógica do botão Voltar ao Topo (controlarVisibilidade)
    controlarVisibilidade(); 
    
    // 2. Chama a lógica do Carrinho (Visibilidade)
    Visibilidade();
}

window.onscroll = gerenciarScroll;

    function Visibilidade(){
    if(document.body.scrollTop > Altura || document.documentElement.scrollTop > Altura){
      carrinhoVisivel.classList.add('aparecer')
    }else{
      carrinhoVisivel.classList.remove('aparecer')
    } 
  }
  carrinhoVisivel.addEventListener('click', () =>{
    carrinhoContainer.classList.toggle('ativo')
  })

  function controlarVisibilidade(){
    if(document.body.scrollTop > gatinhoAltura || document.documentElement.scrollTop > gatinhoAltura){
      btnVoltarAoTopo1.classList.add('visivel')
    }else{
      btnVoltarAoTopo1.classList.remove('visivel')
    }
  }

  btnVoltarAoTopo1.addEventListener("click", function(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
})

const iconeFinalizar = document.getElementById('finalizar-compra-btn')
const iconeCarrinho = document.getElementById('carrinho-ico')

iconeCarrinho.addEventListener('click', () =>{
  carrinhoContainer.classList.toggle('ativo')
})

iconeFinalizar.addEventListener('click', () =>{
  carrinhoContainer.classList.remove('ativo')
})


