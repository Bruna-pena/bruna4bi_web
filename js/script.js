const inputNome = document.querySelector("#nome");
const inputIdade = document.querySelector("#idade");
const botao = document.querySelector("#botao");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

  const nome = inputNome.value;
  const idade = Number(inputIdade.value);

 

  if (nome === "" || inputIdade === "") {
    resultado.textContent = "Preencha todos os campos!";
    resultado.classList.add("alert-warning");
    return;
  }

  if (idade >= 18) {
    resultado.textContent = "Olá, " + nome + "! Você é maior de idade.";
    resultado.classList.add("alert-sucess");
  } else {
    //Template string
    resultado.textContent = `Olá ${nome}! Você é menor de idade.`;
    resultado.classList.add("alert-danger");
  }
});

function verificarIdade(idade) {
     resultado.classList.remove(
    "d-none",
    "alert-info"
    "alert-danger"
    "alert-sucess"
    "alert-warning"
  );

    if (idade >= 18) {
        return "Você é maior de idade!";
    }
    resultado.classList.add("alert-danger");
    return "Você é menor de idade!";
}
