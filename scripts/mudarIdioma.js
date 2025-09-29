const linkInicio = document.getElementById('link-inicio');
const linkSobre = document.getElementById('link-sobre');
const linkFooter = document.getElementById('link-footer');

const brIframe = document.getElementById('br-map');
const enIframe = document.getElementById('en-map');

function mudarIdioma(checked) {
    if (checked) {
        // EN
        
        if (linkInicio) linkInicio.textContent = 'Home';
        if (linkSobre) linkSobre.textContent = 'About the Project';
        if (linkFooter) linkFooter.textContent = '© Technology in Management Processes 2025. All rights reserved.';

        if (brIframe) {
            brIframe.style.display = 'none';
            brIframe.src = 'mapa.html';
        }
        if (enIframe) {
            enIframe.style.display = 'block';
        }

        
    } else {
        // BR

        if (linkInicio) linkInicio.textContent = 'Início';
        if (linkSobre) linkSobre.textContent = 'Sobre o Projeto';
        if (linkFooter) linkFooter.textContent = '© Tecnologia em Processos Gerenciais 2025. Todos os direitos reservados.';

        if (brIframe) {
            brIframe.style.display = 'block';
            enIframe.src = 'mapa-en.html'; 
        }
        if (enIframe) {
            enIframe.style.display = 'none';
        }
    }
}