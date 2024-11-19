let chart; // Variável global para o gráfico
let clienteSelecionado = null; // Para armazenar o cliente selecionado para edição
let clientes = [
    { id: 'cliente-1', nome: 'Cliente A', pontos: 250, acao: 'Compra de R$ 100,00' },
    { id: 'cliente-2', nome: 'Cliente B', pontos: 180, acao: 'Indicação de amigo' },
    { id: 'cliente-3', nome: 'Cliente C', pontos: 320, acao: 'Primeira compra' },
    { id: 'cliente-4', nome: 'Cliente D', pontos: 450, acao: 'Compra em 3 categorias' },
    { id: 'cliente-5', nome: 'Cliente E', pontos: 120, acao: 'Resgate de recompensa' },
    { id: 'cliente-6', nome: 'Cliente F', pontos: 500, acao: 'Compra em 5 categorias' }
];

// Inicializar o gráfico
function inicializarGrafico() {
    const ctx = document.getElementById('graficoPontos').getContext('2d');
    const labels = clientes.map(cliente => cliente.nome);
    const data = clientes.map(cliente => cliente.pontos);

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontos',
                data: data,
                backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#e91e63', '#9c27b0', '#607d8b']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Atualizar gráfico com novos dados
function atualizarGrafico() {
    chart.data.labels = clientes.map(cliente => cliente.nome);
    chart.data.datasets[0].data = clientes.map(cliente => cliente.pontos);
    chart.update();
}

// Atualizar tabela de clientes
// Mantendo os três botões separados
function atualizarTabela() {
    const tabela = document.getElementById('clientes');
    tabela.innerHTML = '';

    clientes.forEach(cliente => {
        const progresso = Math.min((cliente.pontos / 500) * 100, 100);
        tabela.innerHTML += `
            <tr id="${cliente.id}">
                <td>${cliente.nome}</td>
                <td><span class="pontos">${cliente.pontos}</span> pontos</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${progresso}%;"></div>
                    </div>
                </td>
                <td><span id="acao-${cliente.id}">${cliente.acao}</span></td>
                <td>
                    <button onclick="editarPontos('${cliente.id}')">Editar Pontos</button>
                    <button onclick="editarAcao('${cliente.id}')">Editar Ação</button>
                    <button onclick="confirmarExclusao('${cliente.id}')">Excluir Cliente</button>
                </td>
            </tr>
        `;
    });
}


// Adicionar cliente
document.getElementById('form-adicionar-cliente').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome-cliente').value.trim();
    const pontos = parseInt(document.getElementById('pontos-cliente-adicionar').value, 10);
    const acao = document.getElementById('acao-cliente-adicionar').value.trim();

    if (nome && !isNaN(pontos) && acao) {
        clientes.push({ id: `cliente-${clientes.length + 1}`, nome, pontos, acao });
        atualizarTabela();
        atualizarGrafico();
        event.target.reset();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Editar pontos e ação
function editarPontos(clienteId) {
    clienteSelecionado = clienteId;
    document.getElementById('input-pontos').value = clientes.find(c => c.id === clienteId).pontos;
    abrirModal('modal-editar-pontos');
}

function salvarPontos() {
    const novosPontos = parseInt(document.getElementById('input-pontos').value, 10);
    if (!isNaN(novosPontos) && novosPontos >= 0) {
        clientes.find(c => c.id === clienteSelecionado).pontos = novosPontos;
        atualizarTabela();
        atualizarGrafico();
        fecharModal('modal-editar-pontos');
    } else {
        alert('Por favor, insira um número válido.');
    }
}

function editarAcao(clienteId) {
    clienteSelecionado = clienteId;
    document.getElementById('selecao-acao').value = clientes.find(c => c.id === clienteId).acao;
    abrirModal('modal-editar-acao');
}

function salvarAcao() {
    const novaAcao = document.getElementById('selecao-acao').value.trim();
    if (novaAcao) {
        clientes.find(c => c.id === clienteSelecionado).acao = novaAcao;
        atualizarTabela();
        fecharModal('modal-editar-acao');
    } else {
        alert('Por favor, selecione uma ação válida.');
    }
}

// Exclusão de cliente
function confirmarExclusao(clienteId) {
    clienteSelecionado = clienteId;
    abrirModal('modal-confirmar-exclusao');
}

function excluirCliente() {
    clientes = clientes.filter(cliente => cliente.id !== clienteSelecionado);
    atualizarTabela();
    atualizarGrafico();
    fecharModal('modal-confirmar-exclusao');
}

// Abrir e fechar modais
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Inicializar funcionalidades ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();
    inicializarGrafico();
});
