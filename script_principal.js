const fidelidadeCtx = document.getElementById('fidelidadeChart').getContext('2d');
const mimosCtx = document.getElementById('mimosChart').getContext('2d');
const produtosCtx = document.getElementById('produtosChart').getContext('2d');

// Gráfico de Fidelidade (Barras)
new Chart(fidelidadeCtx, {
  type: 'bar',
  data: {
    labels: ['Fernanda Montenegro', 'Elon Musk', 'Raphaela Santos'],
    datasets: [{
      label: 'Pontos de Fidelidade',
      data: [80, 55, 65],
      backgroundColor: ['#4CAF50', '#FFC107', '#FF5722']
    }]
  },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

// Gráfico de Mimos (Pizza)
new Chart(mimosCtx, {
  type: 'pie',
  data: {
    labels: ['Cupom de Desconto', 'Brinde', 'Entrega Grátis'],
    datasets: [{
      data: [45, 25, 30],
      backgroundColor: ['#2196F3', '#9C27B0', '#FFEB3B']
    }]
  },
  options: { responsive: true }
});

// Gráfico de Produtos Mais Vendidos (Barras Horizontais)
new Chart(produtosCtx, {
  type: 'bar',
  data: {
    labels: ['Verduras', 'Biscoitos', 'Laticínios'],
    datasets: [{
      label: 'Vendas',
      data: [120, 80, 95],
      backgroundColor: ['#00BCD4', '#8BC34A', '#FF9800']
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    scales: { x: { beginAtZero: true } }
  }
});
