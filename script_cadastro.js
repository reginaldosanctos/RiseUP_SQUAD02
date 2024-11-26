document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;
  
    const modulosSelecionados = [];
    document.querySelectorAll('input[name="modulos"]:checked').forEach(function (checkbox) {
      modulosSelecionados.push(checkbox.value);
    });
  
    if (!modulosSelecionados.length) {
      document.getElementById('mensagem').textContent = "Você deve selecionar pelo menos um módulo.";
      return;
    }
  
    const dadosCadastro = {
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      email: email,
      endereco: endereco,
      modulos: modulosSelecionados
    };
  
    console.log("Cadastro realizado com sucesso:", dadosCadastro);
    document.getElementById('mensagem').textContent = "Cadastro realizado com sucesso!";
    document.getElementById('formCadastro').reset();
  });
  
