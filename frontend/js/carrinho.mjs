import { obterProdutos } from '../../backend/src/controller/produtoController.mjs';
import { adicionarItemAoCarrinho, removerItemDoCarrinho, obterCarrinho } from '../../backend/src/controller/carrinhoController.mjs';

const produtosElement = document.getElementById('produtos');
const carrinhoElement = document.getElementById('carrinho');

const atualizarProdutos = async () => {
    try {
        const produtos = await obterProdutos();
        produtosElement.innerHTML = '';

        produtos.forEach(produto => {
            const produtoItem = document.createElement('div');
            produtoItem.innerHTML = `${produto.nome} - $${produto.preco}`;
            const adicionarBtn = document.createElement('button');
            adicionarBtn.textContent = 'Adicionar ao Carrinho';
            adicionarBtn.addEventListener('click', () => {
                adicionarItemAoCarrinho(produto);
                atualizarCarrinho();
            });
            produtoItem.appendChild(adicionarBtn);
            produtosElement.appendChild(produtoItem);
        });
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
    }
};

const atualizarCarrinho = () => {
    const itensCarrinho = obterCarrinho();
    carrinhoElement.innerHTML = '';

    itensCarrinho.forEach(item => {
        const carrinhoItem = document.createElement('div');
        carrinhoItem.innerHTML = `${item.nome} - $${item.preco}`;
        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover do Carrinho';
        removerBtn.addEventListener('click', () => {
            removerItemDoCarrinho(item.id);
            atualizarCarrinho();
        });
        carrinhoItem.appendChild(removerBtn);
        carrinhoElement.appendChild(carrinhoItem);
    });
};

atualizarProdutos();
atualizarCarrinho();