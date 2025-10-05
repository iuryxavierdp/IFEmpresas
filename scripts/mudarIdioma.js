// Arquivo: scripts/mudarIdioma.js (Versão Final)

// Variável global para armazenar o estado de idioma atual
let isEnglishActive = false;

function mudarIdioma(isEnglish) {
    isEnglishActive = isEnglish; // Atualiza o estado
    
    // 1. Traduzir o conteúdo da página principal (index.html)
    var linkInicio = document.getElementById('link-inicio');
    var linkSobre = document.getElementById('link-sobre');
    var linkFooter = document.getElementById('link-footer');
    
    if (linkInicio) {
        linkInicio.textContent = isEnglish ? "Home" : "Início";
    }
    if (linkSobre) {
        linkSobre.textContent = isEnglish ? "About the Project" : "Sobre o Projeto";
    }
    if (linkFooter) {
        linkFooter.textContent = isEnglish 
            ? "© Managerial Processes Technology 2025. All rights reserved." 
            : "© Tecnologia em Processos Gerenciais 2025. Todos os direitos reservados.";
    }
    document.documentElement.lang = isEnglish ? 'en' : 'pt-br';
    
    // 2. Chamar a tradução DENTRO do iframe (mapa e modais)
    callMapTranslation(isEnglish);
}

function callMapTranslation(isEnglish) {
    var mapFrame = document.getElementById('br-map');
    
    if (mapFrame) {
        
        // Verifica se a função já existe (o mapa já carregou)
        if (mapFrame.contentWindow && typeof mapFrame.contentWindow.mudarIdioma === 'function') {
             mapFrame.contentWindow.mudarIdioma(isEnglish);
        } else {
             // Se não carregou, adiciona o evento de 'onload' e tenta novamente
             mapFrame.onload = function() {
                if (mapFrame.contentWindow && typeof mapFrame.contentWindow.mudarIdioma === 'function') {
                    mapFrame.contentWindow.mudarIdioma(isEnglish);
                }
             };
        }
    }
}

// Garante que se o mapa carregar depois do switch ser clicado, ele aplica o idioma
document.addEventListener('DOMContentLoaded', function() {
    callMapTranslation(isEnglishActive);
});