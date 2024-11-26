document.getElementById("editarPerfil").addEventListener("click", function() {
    alert("Funcionalidade de edição de perfil ainda será implementada!");
});

const editarBtn = document.getElementById("editarPerfil");
const mensagem = document.getElementById("mensagem");

editarBtn.addEventListener("click", function() {
    if (editarBtn.innerText === "Editar Informações") {
        // Tornar os campos editáveis
        transformarEmInput("nome");
        transformarEmInput("endereco");
        transformarEmInput("telefone");
        transformarEmInput("email");

        editarBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Informações';
    } else {
        // Salvar as informações e reverter os campos para texto
        salvarValor("nome");
        salvarValor("endereco");
        salvarValor("telefone");
        salvarValor("email");

        editarBtn.innerHTML = '<i class="fas fa-edit"></i> Editar Informações';

        // Exibir mensagem de sucesso
        mensagem.style.display = "block";
        setTimeout(() => {
            mensagem.style.display = "none";
        }, 3000);
    }
});

function transformarEmInput(id) {
    const elemento = document.getElementById(id);
    const valor = elemento.innerText;
    elemento.innerHTML = `<input type="text" id="input-${id}" value="${valor}">`;
}

function salvarValor(id) {
    const inputElemento = document.getElementById(`input-${id}`);
    const novoValor = inputElemento.value;
    const elemento = document.getElementById(id);
    elemento.innerText = novoValor;
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para login
    alert('Login realizado com sucesso!');
});
