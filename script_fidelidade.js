let chart; // Variável global para o gráfico
let clienteSelecionado = null; // Para armazenar o cliente selecionado para edição
let clientes = [
    { id: 'cliente-1', nome: 'João Souza', pontos: 150, acao: 'Compra de R$ 100,00' },
    { id: 'cliente-2', nome: 'Ana Oliveira', pontos: 300, acao: 'Indicação de amigo' },
    { id: 'cliente-3', nome: 'Carlos Silva', pontos: 50, acao: 'Primeira compra' },
    { id: 'cliente-4', nome: 'Fernanda Costa', pontos: 300, acao: 'Compra em 3 categorias' },
    { id: 'cliente-5', nome: 'Luciana Pereira', pontos: 50, acao: 'Primeira compra' },
    { id: 'cliente-6', nome: 'Ricardo Almeida', pontos: 500, acao: 'Resgate de recompensa' },
    { id: 'cliente-7', nome: 'Juliana Rocha', pontos: 400, acao: 'Compra em 2 categorias' },
    { id: 'cliente-8', nome: 'Diego Martins', pontos: 150, acao: 'Indicação de amigo' },
    { id: 'cliente-9', nome: 'Patrícia Lima', pontos: 50, acao: 'Primeira compra' },
    { id: 'cliente-10', nome: 'José Alves', pontos: 200, acao: 'Compra de R$ 200,00' }
]; // Lista de clientes (simulação de backend ou estado inicial)

// Função para inicializar o gráfico de pontos
function inicializarGrafico() {
    const ctx = document.getElementById('graficoPontos').getContext('2d');
    const labels = obterClientes().map(cliente => cliente.nome);
    const data = obterClientes().map(cliente => cliente.pontos);

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

// Atualizar dados do gráfico
function atualizarGrafico() {
    const labels = obterClientes().map(cliente => cliente.nome);
    const data = obterClientes().map(cliente => cliente.pontos);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Obter lista de clientes
function obterClientes() {
    return clientes;
}

// Atualizar tabela de clientes
function atualizarTabela() {
    const tabela = document.getElementById('clientes');
    tabela.innerHTML = '';

    clientes.forEach(cliente => {
        const progresso = Math.min((cliente.pontos / 500) * 100, 100);

        const linha = `
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
        tabela.innerHTML += linha;
    });
}

// Adicionar cliente
document.getElementById('form-adicionar-cliente').addEventListener('submit', function (event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário

    const nome = document.getElementById('nome-cliente').value.trim();
    const pontos = parseInt(document.getElementById('pontos-cliente-adicionar').value, 10);
    const acao = document.getElementById('acao-cliente-adicionar').value.trim();

    // Verifica se os campos estão preenchidos corretamente
    if (nome && !isNaN(pontos) && acao) {
        // Cria um novo cliente
        const novoCliente = {
            id: `cliente-${clientes.length + 1}`,  // ID gerado com base no tamanho da lista de clientes
            nome: nome,
            pontos: pontos,
            acao: acao
        };

        // Adiciona o novo cliente à lista
        clientes.push(novoCliente);
        
        // Atualiza a tabela e o gráfico
        atualizarTabela();
        atualizarGrafico();

        // Limpa os campos do formulário após a adição
        document.getElementById('form-adicionar-cliente').reset();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Editar pontos
function editarPontos(clienteId) {
    clienteSelecionado = clienteId;
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
        document.getElementById('input-pontos').value = cliente.pontos;
    }
    abrirModal('modal-editar-pontos');
}

function salvarPontos() {
    const novosPontos = parseInt(document.getElementById('input-pontos').value, 10);

    if (!isNaN(novosPontos) && novosPontos >= 0) {
        const cliente = clientes.find(c => c.id === clienteSelecionado);
        if (cliente) {
            cliente.pontos = novosPontos;
            atualizarTabela();
            atualizarGrafico();
            fecharModal('modal-editar-pontos');
        }
    } else {
        alert('Por favor, insira um número válido.');
    }
}

// Editar ação
function editarAcao(clienteId) {
    clienteSelecionado = clienteId;
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
        document.getElementById('selecao-acao').value = cliente.acao;
    }
    abrirModal('modal-editar-acao');
}

function salvarAcao() {
    const novaAcao = document.getElementById('selecao-acao').value;

    if (novaAcao) {
        const cliente = clientes.find(c => c.id === clienteSelecionado);
        if (cliente) {
            cliente.acao = novaAcao;
            atualizarTabela();
            fecharModal('modal-editar-acao');
        }
    } else {
        alert('Por favor, selecione uma ação válida.');
    }
}

// Confirmar exclusão de cliente
function confirmarExclusao(clienteId) {
    clienteSelecionado = clienteId;
    abrirModal('modal-confirmar-exclusao');
}

// Excluir cliente
function excluirCliente() {
    clientes = clientes.filter(cliente => cliente.id !== clienteSelecionado);
    atualizarTabela();
    atualizarGrafico();
    fecharModal('modal-confirmar-exclusao');
}

// Função para abrir e fechar modais
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Função para fechar o modal de editar pontos
function fecharModalPontos() {
    fecharModal('modal-editar-pontos');
}

// Função para fechar o modal de editar ação
function fecharModalAcao() {
    fecharModal('modal-editar-acao');
}

// Função para fechar o modal de confirmar exclusão
function fecharModalExclusao() {
    fecharModal('modal-confirmar-exclusao');
}

// Função de salvar pontos
function salvarPontos() {
    const novosPontos = parseInt(document.getElementById('input-pontos').value, 10);

    if (!isNaN(novosPontos) && novosPontos >= 0) {
        const cliente = clientes.find(c => c.id === clienteSelecionado);
        if (cliente) {
            cliente.pontos = novosPontos;
            atualizarTabela();
            atualizarGrafico();
            fecharModalPontos();
        }
    } else {
        alert('Por favor, insira um número válido.');
    }
}

// Função de salvar ação
function salvarAcao() {
    const novaAcao = document.getElementById('selecao-acao').value;

    if (novaAcao) {
        const cliente = clientes.find(c => c.id === clienteSelecionado);
        if (cliente) {
            cliente.acao = novaAcao;
            atualizarTabela();
            fecharModalAcao();
        }
    } else {
        alert('Por favor, selecione uma ação válida.');
    }
}
// Inicializar funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabela();
    inicializarGrafico();
});

