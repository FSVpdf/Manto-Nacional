document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os cards de produto
  const cards = document.querySelectorAll('.card');
  const cartCount = document.querySelector('.cart-count'); // Contador no botão de carrinho
  let totalItems = 0; // Total de itens no carrinho

  function atualizarCarrinhoStorage(produto, quantidade, tamanho) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const index = carrinho.findIndex(item => item.produto === produto && item.tamanho === tamanho);
    if (index >= 0) {
      carrinho[index].quantidade = quantidade;
    } else {
      carrinho.push({ produto, quantidade, tamanho });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  cards.forEach(card => {
    const increaseBtn = card.querySelector('.increase'); // Botão "+"
    const decreaseBtn = card.querySelector('.decrease'); // Botão "-"
    const priceButton = card.querySelector('.button'); // Botão com o preço
    const quantitySpan = card.querySelector('.quantity'); // Exibição da quantidade
    const productTitle = card.querySelector('.title').textContent; // Nome do produto
    const tamanhoSelect = card.querySelector('.tamanho'); // Novo seletor

    let quantity = 0;

    // Aumenta a quantidade (botão "+")
    increaseBtn.addEventListener('click', () => {
      quantity++;
      quantitySpan.textContent = quantity;

      // Atualiza o total de itens no carrinho
      totalItems++;
      cartCount.textContent = totalItems;
      atualizarCarrinhoStorage(productTitle, quantity, tamanhoSelect.value);
      mostrarAnimacaoConfirmacao(card);
    });

    // Diminui a quantidade (botão "-")
    decreaseBtn.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantitySpan.textContent = quantity;

        // Atualiza o total de itens no carrinho
        totalItems--;
        cartCount.textContent = totalItems;
        atualizarCarrinhoStorage(productTitle, quantity, tamanhoSelect.value);
      }
    });

    // Aumenta a quantidade ao clicar no botão de preço
    priceButton.addEventListener('click', (event) => {
      event.preventDefault(); // Evita o comportamento padrão do link
      quantity++;
      quantitySpan.textContent = quantity;

      // Atualiza o total de itens no carrinho
      totalItems++;
      cartCount.textContent = totalItems;
      atualizarCarrinhoStorage(productTitle, quantity, tamanhoSelect.value);
      mostrarAnimacaoConfirmacao(card);
    });
  });

  // Animação de confirmação
  function mostrarAnimacaoConfirmacao(card) {
    let confirm = document.createElement('div');
    confirm.className = 'confirmacao-carrinho';
    confirm.innerText = 'Adicionado ao carrinho!';
    card.appendChild(confirm);
    setTimeout(() => {
      confirm.remove();
    }, 1200);
  }
});