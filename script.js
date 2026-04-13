document.getElementById('fitting-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Definição da Escolhida (Agora aceita o apelido!)
    const nomesAceitos = ["valeria", "lera"];
    const sobrenomeCorreto = "varvariuc";

    // 2. Captura dos dados digitados
    const entradaNome = document.getElementById('nome').value;
    const entradaSobrenome = document.getElementById('sobrenome').value;

    // 3. Normalização para Comparação
    const nomeValidado = entradaNome.trim().toLowerCase();
    const sobrenomeValidado = entradaSobrenome.trim().toLowerCase();

    // 4. A Lógica de Decisão
    // O .includes() verifica se o nome digitado está na nossa lista de nomes aceitos
    if (nomesAceitos.includes(nomeValidado) && sobrenomeValidado === sobrenomeCorreto) {
        window.location.href = "sucesso.html"; 
    } else {
        window.location.href = "erro.html";
    }
});
