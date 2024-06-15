function cadastrar() {
  var nome = document.getElementById("nome").value;
 
  var email = document.getElementById("email").value;
  

  if (nome === "" ||  email === "" ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  var dados = {
    nome: nome,
    
    email: email,
    
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
      
      document.getElementById("email").value = "";
      
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error);
      //alert("Erro ao cadastrar. Por favor, tente novamente.");
    });
}

// Função para buscar e exibir os dados do banco de dados na lista
function exibirDados() {
  fetch("http://localhost:8080/usuario") // Assumindo que "/usuarios" retorna todos os usuários
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      return response.json();
    })
    .then((data) => {
      // Limpar a lista antes de preencher com os novos dados
      var dataList = document.getElementById("dadosList");
      dataList.innerHTML = "";

      // Preencher a lista com os novos dados
      data.forEach((usuario) => {
        var listItem = document.createElement("li");
        listItem.textContent = `Nome: ${usuario.nome}, Telefone: ${usuario.telefone}, Email: ${usuario.email}`;

        // Botão de Exclusão
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", function () {
          excluirUsuario(usuario.id);
        });

        // Botão de Atualização
        var updateButton = document.createElement("button");
        updateButton.textContent = "Atualizar";
        updateButton.addEventListener("click", function () {
          atualizarUsuario(usuario.id);
        });

        listItem.appendChild(deleteButton);
        listItem.appendChild(updateButton);

        dataList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}

// Função para buscar e exibir os dados do banco de dados na tabela
function exibirDados() {
  fetch("http://localhost:8080/usuario") // Assumindo que "/usuarios" retorna todos os usuários
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      return response.json();
    })
    .then((data) => {
      // Limpar a tabela antes de preencher com os novos dados
      document.getElementById("dadosBody").innerHTML = "";

      // Preencher a tabela com os novos dados
      data.forEach((usuario) => {
        var row = document.createElement("tr");
        row.innerHTML = `<td>${usuario.nome}</td><td>${usuario.email}</td>`;
        document.getElementById("dadosBody").appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}

// Chamar a função para exibir os dados ao carregar a página
window.onload = exibirDados;

// Função para excluir um usuário
function excluirUsuario(userId) {
  fetch(`http://localhost:8080/usuario/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir usuário.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuário excluído:", data);
      exibirDados(); // Atualizar a lista após a exclusão
    })
    .catch((error) => {
      console.error("Erro ao excluir usuário:", error);
    });
}

// Função para atualizar um usuário
function atualizarUsuario(userId) {
  // Obter os novos dados do usuário do formulário
  var novoNome = prompt("Novo nome:");
  
  var novoEmail = prompt("Novo email:");

  // Criar objeto com os novos dados
  var dadosAtualizados = {
    id: userId,
    nome: novoNome,
   
    email: novoEmail,
  };

  fetch(`http://localhost:8080/usuario/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosAtualizados),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuário atualizado:", data);
      exibirDados(); // Atualizar a lista após a atualização
    })
    .catch((error) => {
      console.error("Erro ao atualizar usuário:", error);
    });
}
