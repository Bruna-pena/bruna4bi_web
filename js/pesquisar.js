function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const franquias = [
  ["Maze Runner", "Maze Runner: Prova de Fogo", "Maze Runner: A Cura Mortal"],
  ["Jogos Vorazes", "Jogos Vorazes: Em Chamas", "Jogos Vorazes: A Esperança"],
  ["Pantera Negra", "Pantera Negra: Wakanda Foreve"],
  ["Top Gun", "Top Gun: Maverick"],
  [
    "Guardiões da Galáxia",
    "Guardiões da Galáxia Vol. 2",
    "Guardiões da Galáxia Vol. 3",
  ],
  ["Avatar", "Avatar: O Caminho da Água", "Avatar: Fogo e Cinzas"],
];

const filmes = Object.entries(filmesPorCategoria).flatMap(([pagina, lista]) =>
  lista.map(({ titulo }) => ({ titulo, pagina })),
);

function buscarFilme(termo) {
  const busca = normalizar(termo);

  return (
    filmes.find((filme) => normalizar(filme.titulo) === busca) ??
    filmes.find((filme) => normalizar(filme.titulo).startsWith(busca)) ??
    filmes.find((filme) => normalizar(filme.titulo).includes(busca))
  );
}

document.querySelectorAll('form[role="search"]').forEach((formulario) => {
  const campo = formulario.querySelector('input[type="search"]');
  const mensagem = document.createElement("small");
  mensagem.className = "d-block text-danger mt-2";
  mensagem.setAttribute("role", "status");
  mensagem.setAttribute("aria-live", "polite");
  formulario.insertAdjacentElement("afterend", mensagem);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const termo = campo.value.trim();

    if (termo.length < 2) {
      mensagem.textContent = "Digite pelo menos 2 caracteres.";
      campo.focus();
      return;
    }

    const filme = buscarFilme(termo);

    if (!filme) {
      mensagem.textContent = "Nenhum filme ou série encontrado.";
      return;
    }

    window.location.href = `${filme.pagina}?filme=${encodeURIComponent(filme.titulo)}`;
  });
});

const tituloBuscado = new URLSearchParams(window.location.search).get("filme");

if (tituloBuscado) {
  const tituloEncontrado = [...document.querySelectorAll(".card-title")].find(
    (elemento) =>
      normalizar(elemento.textContent) === normalizar(tituloBuscado),
  );
  const cardEncontrado = tituloEncontrado?.closest(".card");

  if (cardEncontrado) {
    const franquiaEncontrada = franquias.find((franquia) =>
      franquia.some(
        (titulo) => normalizar(titulo) === normalizar(tituloBuscado),
      ),
    );
    const titulosVisiveis = new Set(
      (franquiaEncontrada ?? [tituloBuscado]).map(normalizar),
    );

    document.querySelectorAll(".card-title").forEach((elemento) => {
      elemento
        .closest(".col-md-3")
        ?.classList.toggle(
          "d-none",
          !titulosVisiveis.has(normalizar(elemento.textContent)),
        );
    });
    cardEncontrado.classList.add("border-success", "border-3");
    requestAnimationFrame(() => {
      cardEncontrado.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}
