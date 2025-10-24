let isEnglishActive = false;

function mudarIdioma(isEnglish) {
    isEnglishActive = isEnglish;
    
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
            ? "© Technology in Management Processes 2025. All rights reserved." 
            : "© Tecnologia em Processos Gerenciais 2025. Todos os direitos reservados.";
    }
    document.documentElement.lang = isEnglish ? 'en' : 'pt-br';
    
    callMapTranslation(isEnglish);
}

function callMapTranslation(isEnglish) {
    var mapFrame = document.getElementById('br-map');
    
    if (mapFrame) {
        
        if (mapFrame.contentWindow && typeof mapFrame.contentWindow.mudarIdioma === 'function') {
             mapFrame.contentWindow.mudarIdioma(isEnglish);
        } else {
             mapFrame.onload = function() {
                if (mapFrame.contentWindow && typeof mapFrame.contentWindow.mudarIdioma === 'function') {
                    mapFrame.contentWindow.mudarIdioma(isEnglish);
                }
             };
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    callMapTranslation(isEnglishActive);
});
