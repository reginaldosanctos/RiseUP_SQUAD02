function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para login
    alert('Login realizado com sucesso!');

    // Redireciona para a tela principal após o alerta
    window.location.href = 'principal.html';

document.querySelector('.menu-lateral').addEventListener('mouseenter', function () {
        this.style.width = '250px';
    });
    
document.querySelector('.menu-lateral').addEventListener('mouseleave', function () {
        this.style.width = '80px';
    });
    
});