function cadastrar() {
  var nome = document.getElementById("nome").value;
  var telefone = document.getElementById("telefone").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  if (nome === "" || telefone === "" || email === "" || senha === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  var dados = {
    nome: nome,
    telefone: telefone,
    email: email,
    senha: senha,
  };

  fetch("http://localhost:8080/usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao cadastrar.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Cadastro realizado com sucesso:", data);
      alert("Cadastro realizado com sucesso!");
      // Limpar os campos após o cadastro
      document.getElementById("nome").value = "";
      document.getElementById("telefone").value = "";
      document.getElementById("email").value = "";
      document.getElementById("senha").value = "";
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error);
      //alert("Erro ao cadastrar. Por favor, tente novamente.");
    });
}
