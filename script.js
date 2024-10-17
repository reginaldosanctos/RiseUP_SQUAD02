// Máscaras de entrada usando jQuery Mask
$(document).ready(function() {
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');
});

document.getElementById("form-cliente").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir o comportamento padrão de envio do formulário
    
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const erro = document.getElementById('mensagem-erro');

    // Validar CPF
    if (!validarCPF(cpf)) {
        erro.textContent = 'CPF inválido.';
        return;
    }

    // Validar telefone
    if (telefone.length < 14) {
        erro.textContent = 'Telefone inválido.';
        return;
    }

    // Validar e-mail
    if (!validarEmail(email)) {
        erro.textContent = 'E-mail inválido.';
        return;
    }

    // Se tudo estiver correto, mostrar mensagem de sucesso
    erro.textContent = ''; // Limpar a mensagem de erro anterior
    Swal.fire({
        title: 'Cadastro realizado com sucesso!',
        text: 'O cliente foi cadastrado.',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
            confirmButton: 'btn',
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        timer: 5000,
        timerProgressBar: true
    });
});

// Função para validar o CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length != 11) return false;
    // Adicionar uma validação completa de CPF aqui (opcional)
    return true;
}

// Função para validar o e-mail
function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
