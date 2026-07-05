// CONFIGURAÇÃO DO FIREBASE
// Substitua todo este bloco pelas credenciais reais que o Console do Firebase vai te dar!
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJECT_ID.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJECT_ID.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SUA_APP_ID"
};

// Inicializa o Firebase e o Banco de Dados Firestore
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('fitting-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Definição da Escolhida
    const nomesAceitos = ["valeria", "lera"];
    const sobrenomeCorreto = "varvariuc";

    // 2. Captura dos dados digitados
    const entradaNome = document.getElementById('nome').value;
    const entradaSobrenome = document.getElementById('sobrenome').value;

    // 3. Normalização para Comparação
    const nomeValidado = entradaNome.trim().toLowerCase();
    const sobrenomeValidado = entradaSobrenome.trim().toLowerCase();

    // Determina se os dados estão corretos antes de salvar
    const ehAcessoValido = nomesAceitos.includes(nomeValidado) && sobrenomeValidado === sobrenomeCorreto;

    // Pega a data e o horário exato configurado para o fuso horário da Moldávia (Chisinau)
    const horarioAcesso = new Date().toLocaleString("pt-BR", { timeZone: "Europe/Chisinau" });

    // 4. SALVANDO NO FIREBASE (Backup em Tempo Real)
    db.collection("acessos").add({
        nomeDigitado: entradaNome.trim(),
        sobrenomeDigitado: entradaSobrenome.trim(),
        dataHora: horarioAcesso,
        status: ehAcessoValido ? "Sucesso" : "Tentativa Errada"
    })
    .then(() => {
        console.log("Dados de backup registrados no Firebase com sucesso!");
        // Após salvar com sucesso, faz o redirecionamento
        direcionarPagina(ehAcessoValido);
    })
    .catch((error) => {
        console.error("Erro ao salvar no Firebase: ", error);
        // Segurança: Se o Firebase falhar (falta de internet, etc), o site ainda funciona!
        direcionarPagina(ehAcessoValido);
    });
});

// Função auxiliar para controlar o redirecionamento de tela
function direcionarPagina(sucesso) {
    if (sucesso) {
        window.location.href = "sucesso.html"; 
    } else {
        window.location.href = "erro.html";
    }
}
