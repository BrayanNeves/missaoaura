
const perfis = [
{
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções. Gosta de construir, consertar equipamentos e superar desafios técnicos.",
        imagem: "ilustração1.jpg"
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "É curioso e observador. Gosta de pesquisar, analisar evidências e descobrir como as coisas funcionam.",
        imagem: "ilustração2.jpg"
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "É aventureiro e adaptável. Gosta de conhecer lugares novos, experimentar alternativas e enfrentar descobertas.",
        imagem: "ilustração3.jpg"
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "É organizado e analítico. Gosta de coordenar pessoas, organizar informações e planejar decisões importantes.",
        imagem: "ilustração4.jpg"
    }
];

const formulario = document.getElementById("formulario");
const formularioContainer = document.getElementById("formulario-container");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");
const dadosPerfil = document.getElementById("dados-perfil");
const nascimento = document.getElementById("nascimento");

// Impede a seleção de uma data futura.
const hoje = new Date();
const anoAtual = hoje.getFullYear();
const mesAtual = String(hoje.getMonth() + 1).padStart(2, "0");
const diaAtual = String(hoje.getDate()).padStart(2, "0");

nascimento.max = `${anoAtual}-${mesAtual}-${diaAtual}`;

// Calcula a idade considerando se o aniversário já aconteceu.
function calcularIdade(dataNascimento) {
    const [ano, mes, dia] = dataNascimento.split("-").map(Number);

    let idade = anoAtual - ano;

    const aniversarioAindaNaoOcorreu =
        mes > hoje.getMonth() + 1 ||
        (mes === hoje.getMonth() + 1 && dia > hoje.getDate());

    if (aniversarioAindaNaoOcorreu) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = nascimento.value;

    // Valida o nome.
    if (nome.length === 0) {
        alert("Por favor, informe seu nome.");
        return;
    }

    // Valida a data de nascimento.
    if (!data) {
        alert("Informe sua data de nascimento.");
        return;
    }

    const [ano, mes, dia] = data.split("-").map(Number);
    const dataInformada = new Date(ano, mes - 1, dia);

    if (
        ano < 1 ||
        dataInformada.getFullYear() !== ano ||
        dataInformada.getMonth() !== mes - 1 ||
        dataInformada.getDate() !== dia ||
        data > `${anoAtual}-${mesAtual}-${diaAtual}`
    ) {
        alert("Informe uma data de nascimento válida e não futura.");
        return;
    }

    const idade = calcularIdade(data);

    // Cada resposta soma um ponto para o perfil escolhido.
    const pontuacao = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

    for (let i = 1; i <= 4; i++) {
        const resposta = document.querySelector(
            `input[name="p${i}"]:checked`
        );

        if (!resposta) {
            alert(`Responda à pergunta ${i} antes de continuar.`);
            return;
        }

        pontuacao[resposta.value]++;
    }

    // Descobre a maior pontuação.
    const maiorPontuacao = Math.max(...Object.values(pontuacao));

    // Localiza todos os perfis que alcançaram a maior pontuação.
    const vencedores = perfis.filter(
        perfil => pontuacao[perfil.id] === maiorPontuacao
    );

    // Apresenta uma mensagem diferente em caso de empate.
    if (vencedores.length > 1) {
        mensagem.textContent =
            `Olá, ${nome}! Você tem ${idade} anos e demonstrou ` +
            "características de mais de um perfil. Confira seus resultados:";
    } else {
        mensagem.textContent =
            `Parabéns, ${nome}! Você tem ${idade} anos e seu perfil ` +
            "principal foi identificado. Confira seu resultado:";
    }

    // Busca os dados no array de objetos e mostra os resultados.
    dadosPerfil.innerHTML = "";

    vencedores.forEach(perfil => {
        const cartao = document.createElement("article");
        const titulo = document.createElement("h3");
        const categoria = document.createElement("p");
        const descricao = document.createElement("p");
        const imagem = document.createElement("img");

        titulo.textContent = perfil.nome;
        categoria.textContent = `Categoria: ${perfil.categoria}`;
        categoria.className = "categoria";

        descricao.textContent = perfil.descricao;
        descricao.className = "descricao";

        imagem.src = perfil.imagem;
        imagem.alt = `Ilustração do perfil ${perfil.nome}`;
        imagem.onerror = function() {
            this.alt = "Imagem não encontrada. Verifique o arquivo do perfil.";
            this.style.display = "none";
        };

        cartao.append(titulo, categoria, descricao, imagem);
        dadosPerfil.appendChild(cartao);
    });

    // Troca o formulário pela tela de resultado.
    formularioContainer.hidden = true;
    resultado.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Permite refazer o teste.
document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();
    dadosPerfil.innerHTML = "";
    mensagem.textContent = "";

    resultado.hidden = true;
    formularioContainer.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
function atualizarProgressoAura() {
    const perguntas = document.querySelectorAll(".pergunta");
    const barra = document.getElementById("progresso-barra");
    const porcentagem = document.getElementById("progresso-porcentagem");
    const mensagem = document.getElementById("progresso-mensagem");
    const acessivel = document.getElementById("progresso-acessivel");

    if (!perguntas.length || !barra || !porcentagem) return;

    let respondidas = 0;

    perguntas.forEach(function(pergunta) {
        const resposta = pergunta.querySelector(
            'input[type="radio"]:checked'
        );

        if (resposta) {
            respondidas++;
        }
    });

    const total = perguntas.length;
    const progresso = Math.round((respondidas / total) * 100);

    barra.style.width = progresso + "%";
    porcentagem.textContent = progresso + "%";

    if (acessivel) {
        acessivel.setAttribute("aria-valuenow", progresso);
    }

    if (mensagem) {
        if (progresso === 100) {
            mensagem.textContent = "Análise concluída! Aura pronta para ser descoberta.";
        } else {
            mensagem.textContent =
                respondidas + " de " + total + " perguntas respondidas";
        }
    }
}

document.addEventListener("change", function(event) {
    if (event.target.matches('.pergunta input[type="radio"]')) {
        atualizarProgressoAura();
    }
});

atualizarProgressoAura();

});
