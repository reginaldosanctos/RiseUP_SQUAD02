document.addEventListener("DOMContentLoaded", carregarProdutos);

let produtoSelecionado = null;

function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || getProdutosPadrao();
    const listaProdutos = document.getElementById("produtos-lista");
    listaProdutos.innerHTML = "";

    produtos.forEach(produto => criarProdutoCard(produto));
}

function getProdutosPadrao() {
    return [
        { nome: "Arroz", categoria: "mercado", vendas: "1200", imagem: "https://via.placeholder.com/150?text=Arroz" },
        { nome: "Feijão", categoria: "mercado", vendas: "950", imagem: "https://via.placeholder.com/150?text=Feijão" },
        { nome: "Detergente", categoria: "limpeza", vendas: "300", imagem: "https://via.placeholder.com/150?text=Detergente" },
        { nome: "Sabão em Pó", categoria: "limpeza", vendas: "200", imagem: "https://via.placeholder.com/150?text=Sabão+em+Pó" },
        { nome: "Carne", categoria: "acougue", vendas: "500", imagem: "https://via.placeholder.com/150?text=Carne" },
        { nome: "Pão", categoria: "padaria", vendas: "1200", imagem: "https://via.placeholder.com/150?text=Pão" }
    ];
}

function criarProdutoCard(produto) {
    const listaProdutos = document.getElementById("produtos-lista");
    const produtoCard = document.createElement("div");
    produtoCard.className = `produto-card ${produto.categoria}`;
    produtoCard.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
        <h2 class="produto-nome">${produto.nome}</h2>
        <p class="produto-categoria">${produto.categoria}</p>
        <p class="produto-vendas">Quant. Vendida: ${produto.vendas} unidades</p>
        <button class="editar-btn" onclick="editarProduto(this)">Editar</button>
    `;
    listaProdutos.appendChild(produtoCard);
}

function editarProduto(button) {
    const produtoCard = button.parentElement;
    produtoSelecionado = produtoCard;

    document.getElementById("nome-produto").value = produtoCard.querySelector(".produto-nome").textContent;
    document.getElementById("categoria-produto").value = produtoCard.classList[1];
    document.getElementById("vendas-produto").value = produtoCard.querySelector(".produto-vendas").textContent.replace("Quant. Vendida: ", "").replace(" unidades", "");
    document.getElementById("imagem-produto").value = produtoCard.querySelector(".produto-img").src;

    document.getElementById("modal-edicao").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-edicao").style.display = "none";
}

function salvarEdicao() {
    const nome = document.getElementById("nome-produto").value;
    const categoria = document.getElementById("categoria-produto").value;
    const vendas = document.getElementById("vendas-produto").value;
    const imagem = document.getElementById("imagem-produto").value;

    produtoSelecionado.querySelector(".produto-nome").textContent = nome;
    produtoSelecionado.className = `produto-card ${categoria}`;
    produtoSelecionado.querySelector(".produto-vendas").textContent = `Quant. Vendida: ${vendas} unidades`;
    produtoSelecionado.querySelector(".produto-img").src = imagem;

    salvarProdutosLocal();
    fecharModal();

    const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");
    mensagemConfirmacao.style.display = "block";
    setTimeout(() => {
        mensagemConfirmacao.style.display = "none";
    }, 3000);
}

function excluirProduto() {
    produtoSelecionado.remove();
    salvarProdutosLocal();
    fecharModal();
}

function adicionarProduto() {
    const novoProduto = {
        nome: "Novo Produto",
        categoria: "mercado",
        vendas: "0",
        imagem: "https://via.placeholder.com/150?text=Novo+Produto"
    };
    criarProdutoCard(novoProduto);
    salvarProdutosLocal();
    editarProduto(document.querySelector(".produto-card:last-child .editar-btn"));
}

function salvarProdutosLocal() {
    const produtos = Array.from(document.querySelectorAll(".produto-card")).map(card => ({
        nome: card.querySelector(".produto-nome").textContent,
        categoria: card.classList[1],
        vendas: card.querySelector(".produto-vendas").textContent.replace("Quant. Vendida: ", "").replace(" unidades", ""),
        imagem: card.querySelector(".produto-img").src
    }));
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function filtrarCategoria() {
    const categoriaSelecionada = document.getElementById("categoria").value;
    const produtos = document.querySelectorAll(".produto-card");

    produtos.forEach(produto => {
        produto.style.display = categoriaSelecionada === "todos" || produto.classList.contains(categoriaSelecionada) ? '' : 'none';
    });
}
