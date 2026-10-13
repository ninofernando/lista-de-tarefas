const input = document.querySelector("section input")
const botao = document.querySelector("section button")
const lista = document.querySelector("section ul")

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function guardar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarItem(tarefa) {
    const novoItem = document.createElement("li");

    const textoSpan = document.createElement("span");
    textoSpan.textContent = tarefa.texto;
    if (tarefa.riscado) {
        textoSpan.classList.add("riscado");
    }
    
    textoSpan.addEventListener("click", () => {
        tarefa.riscado = !tarefa.riscado;
        textoSpan.classList.toggle("riscado");
        guardar();
    });

    const botaoApagar = document.createElement("button");
    botaoApagar.textContent = "apagar";

    botaoApagar.addEventListener("click", () => {
        tarefas = tarefas.filter((t) => t !== tarefa);
        novoItem.remove();
        guardar();
    });

    novoItem.appendChild(textoSpan);
    novoItem.appendChild(botaoApagar);
    lista.appendChild(novoItem);
}

function adicionarItem() {
    const texto = input.value.trim();

    if (texto === "") return;


    const tarefa = { texto, riscado: false };
    tarefas.push(tarefa);
    criarItem(tarefa);
    guardar();

    input.value = "";
    input.focus();
}

botao.addEventListener("click", adicionarItem);
input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") adicionarItem();
});

tarefas.forEach(criarItem);