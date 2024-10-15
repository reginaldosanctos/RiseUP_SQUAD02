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

menuLateral.addEventListener('mouseenter', function () {
    this.style.width = '250px';
    conteudoPrincipal.style.marginLeft = '250px'; // Ajusta a margem do conteúdo
});

menuLateral.addEventListener('mouseleave', function () {
    this.style.width = '80px';
    conteudoPrincipal.style.marginLeft = '80px'; // Restaura a margem do conteúdo
});
