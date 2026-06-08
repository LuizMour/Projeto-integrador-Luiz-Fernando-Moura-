const iniciativas = [
  {
    titulo: "Instalação de torneiras inteligentes",
    categoria: "agua",
    descricao: "Reduz o desperdício de água em banheiros, cozinhas e áreas produtivas."
  },
  {
    titulo: "Reuso de água da chuva",
    categoria: "agua",
    descricao: "Captação da água da chuva para limpeza, jardinagem e descargas."
  },
  {
    titulo: "Transporte coletivo corporativo",
    categoria: "combustivel",
    descricao: "Diminui o uso de carros individuais e reduz emissões de CO₂."
  },
  {
    titulo: "Substituição por energia limpa",
    categoria: "combustivel",
    descricao: "Incentiva fontes renováveis e diminui a dependência de combustíveis fósseis."
  },
  {
    titulo: "Plantio de mudas nativas",
    categoria: "reflorestamento",
    descricao: "Ajuda a recuperar áreas verdes e proteger a biodiversidade."
  },
  {
    titulo: "Programa adote uma árvore",
    categoria: "reflorestamento",
    descricao: "Estimula colaboradores a acompanhar o crescimento de árvores plantadas."
  }
];

const listaIniciativas = document.querySelector("#listaIniciativas");
const botoesFiltro = document.querySelectorAll(".filtro");
const formAcao = document.querySelector("#formAcao");

const nome = document.querySelector("#nome");
const categoria = document.querySelector("#categoria");
const valor = document.querySelector("#valor");
const descricao = document.querySelector("#descricao");

const erroNome = document.querySelector("#erroNome");
const erroCategoria = document.querySelector("#erroCategoria");
const erroValor = document.querySelector("#erroValor");
const erroDescricao = document.querySelector("#erroDescricao");

const historicoAcoes = document.querySelector("#historicoAcoes");
const limparDados = document.querySelector("#limparDados");

const totalAgua = document.querySelector("#totalAgua");
const totalCombustivel = document.querySelector("#totalCombustivel");
const totalArvores = document.querySelector("#totalArvores");
const totalPontos = document.querySelector("#totalPontos");
const nivelUsuario = document.querySelector("#nivelUsuario");
const barraProgresso = document.querySelector("#barraProgresso");

let acoes = JSON.parse(localStorage.getItem("acoesSustentaveis")) || [];

function nomeCategoria(categoria) {
  const nomes = {
    agua: "Água",
    combustivel: "Combustíveis fósseis",
    reflorestamento: "Reflorestamento"
  };

  return nomes[categoria] || "Categoria";
}

function renderizarIniciativas(filtro = "todos") {
  listaIniciativas.innerHTML = "";

  const iniciativasFiltradas = filtro === "todos"
    ? iniciativas
    : iniciativas.filter((item) => item.categoria === filtro);

  iniciativasFiltradas.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card iniciativa";

    card.innerHTML = `
      <span class="categoria">${nomeCategoria(item.categoria)}</span>
      <h3>${item.titulo}</h3>
      <p>${item.descricao}</p>
    `;

    listaIniciativas.appendChild(card);
  });
}

function configurarFiltros() {
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
      botao.classList.add("ativo");

      const filtro = botao.dataset.filtro;
      renderizarIniciativas(filtro);
    });
  });
}

function limparErros() {
  erroNome.textContent = "";
  erroCategoria.textContent = "";
  erroValor.textContent = "";
  erroDescricao.textContent = "";
}

function validarFormulario() {
  limparErros();

  let valido = true;

  if (nome.value.trim().length < 3) {
    erroNome.textContent = "Digite um nome com pelo menos 3 caracteres.";
    valido = false;
  }

  if (!categoria.value) {
    erroCategoria.textContent = "Selecione uma categoria.";
    valido = false;
  }

  if (!valor.value || Number(valor.value) <= 0) {
    erroValor.textContent = "Digite um valor maior que zero.";
    valido = false;
  }

  if (descricao.value.trim().length < 10) {
    erroDescricao.textContent = "Descreva a ação com pelo menos 10 caracteres.";
    valido = false;
  }

  return valido;
}

function calcularPontos(categoriaAcao, valorAcao) {
  const valorNumerico = Number(valorAcao);

  if (categoriaAcao === "agua") {
    return valorNumerico * 1;
  }

  if (categoriaAcao === "combustivel") {
    return valorNumerico * 3;
  }

  if (categoriaAcao === "reflorestamento") {
    return valorNumerico * 10;
  }

  return 0;
}

function salvarAcao(evento) {
  evento.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  const novaAcao = {
    id: Date.now(),
    nome: nome.value.trim(),
    categoria: categoria.value,
    valor: Number(valor.value),
    descricao: descricao.value.trim(),
    pontos: calcularPontos(categoria.value, valor.value),
    data: new Date().toLocaleDateString("pt-BR")
  };

  acoes.push(novaAcao);
  localStorage.setItem("acoesSustentaveis", JSON.stringify(acoes));

  formAcao.reset();
  atualizarDashboard();
  renderizarHistorico();

  alert("Ação salva com sucesso! Pontos adicionados ao painel.");
}

function atualizarDashboard() {
  const agua = acoes
    .filter((acao) => acao.categoria === "agua")
    .reduce((soma, acao) => soma + acao.valor, 0);

  const combustivel = acoes
    .filter((acao) => acao.categoria === "combustivel")
    .reduce((soma, acao) => soma + acao.valor, 0);

  const arvores = acoes
    .filter((acao) => acao.categoria === "reflorestamento")
    .reduce((soma, acao) => soma + acao.valor, 0);

  const pontos = acoes.reduce((soma, acao) => soma + acao.pontos, 0);

  totalAgua.textContent = agua;
  totalCombustivel.textContent = combustivel;
  totalArvores.textContent = arvores;
  totalPontos.textContent = pontos;

  atualizarNivel(pontos);
}

function atualizarNivel(pontos) {
  let nivel = "Iniciante Verde";
  let progresso = Math.min((pontos / 1000) * 100, 100);

  if (pontos >= 1000) {
    nivel = "Guardião da Agenda 2030";
  } else if (pontos >= 500) {
    nivel = "Líder Sustentável";
  } else if (pontos >= 200) {
    nivel = "Agente Ambiental";
  }

  nivelUsuario.textContent = `Nível: ${nivel}`;
  barraProgresso.style.width = `${progresso}%`;
}

function renderizarHistorico() {
  historicoAcoes.innerHTML = "";

  if (acoes.length === 0) {
    historicoAcoes.innerHTML = `
      <div class="vazio">
        <p>Nenhuma ação registrada ainda. Cadastre a primeira ação sustentável!</p>
      </div>
    `;
    return;
  }

  const acoesOrdenadas = [...acoes].reverse();

  acoesOrdenadas.forEach((acao) => {
    const item = document.createElement("article");
    item.className = "item-historico";

    item.innerHTML = `
      <h3>${acao.nome} registrou uma ação de ${nomeCategoria(acao.categoria)}</h3>
      <p>${acao.descricao}</p>
      <p><strong>Resultado:</strong> ${acao.valor} | <strong>Pontos:</strong> ${acao.pontos}</p>
      <small>Registrado em ${acao.data}</small>
    `;

    historicoAcoes.appendChild(item);
  });
}

function limparDadosSalvos() {
  const confirmar = confirm("Tem certeza que deseja apagar todos os dados salvos?");

  if (!confirmar) {
    return;
  }

  acoes = [];
  localStorage.removeItem("acoesSustentaveis");
  atualizarDashboard();
  renderizarHistorico();
}

formAcao.addEventListener("submit", salvarAcao);
limparDados.addEventListener("click", limparDadosSalvos);

renderizarIniciativas();
configurarFiltros();
atualizarDashboard();
renderizarHistorico();