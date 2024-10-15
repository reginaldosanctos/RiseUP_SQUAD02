function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

// Lógica do formulário de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para login
    alert('Login realizado com sucesso!');

    // Redireciona para a tela principal após o alerta
    window.location.href = 'principal.html';
});

// Adiciona eventos para o comportamento do menu lateral
const menuLateral = document.querySelector('.menu-lateral');
const conteudoPrincipal = document.querySelector('.conteudo-principal');
const userName = document.querySelector('.user-name'); // Seleciona o nome do usuário

// Redimensiona o menu lateral e o conteúdo ao passar o mouse
menuLateral.addEventListener('mouseenter', function () {
    this.style.width = '250px';
    conteudoPrincipal.style.marginLeft = '250px'; // Ajusta a margem do conteúdo
    userName.style.opacity = '1'; // Mostra o nome do usuário
});

menuLateral.addEventListener('mouseleave', function () {
    this.style.width = '80px';
    conteudoPrincipal.style.marginLeft = '80px'; // Restaura a margem do conteúdo
    userName.style.opacity = '0'; // Esconde o nome do usuário
});

// Redimensiona o menu ao clicar no ícone do menu
const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', function () {
    if (menuLateral.style.width === '250px') {
        menuLateral.style.width = '80px';
        conteudoPrincipal.style.marginLeft = '80px'; // Restaura a margem do conteúdo
        userName.style.opacity = '0'; // Esconde o nome do usuário
    } else {
        menuLateral.style.width = '250px';
        conteudoPrincipal.style.marginLeft = '250px'; // Ajusta a margem do conteúdo
        userName.style.opacity = '1'; // Mostra o nome do usuário
    }
});

// Lógica para exibir/ocultar detalhes do ranking
const modulo1Link = document.getElementById('modulo1Link');
const rankingDetails = document.getElementById('rankingDetails');

modulo1Link.addEventListener('click', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    if (rankingDetails.style.display === 'none') {
        rankingDetails.style.display = 'block'; // Exibe os detalhes do ranking
    } else {
        rankingDetails.style.display = 'none'; // Oculta os detalhes do ranking
    }
});

function logout() {
    // Adicione aqui a lógica de logout, se necessário (por exemplo, limpar sessionStorage)
    console.log("Usuário deslogado"); // Log de saída para depuração
    // Redirecionar para a página de login
    window.location.href = "index.html";
}
