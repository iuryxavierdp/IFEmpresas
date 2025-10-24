// Arquivo: scripts/headermenu.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNavigation = document.getElementById('main-navigation');

    // Verifica se os elementos cruciais (o botão e o menu) existem no HTML
    if (menuToggle && mainNavigation) {
        
        // Adiciona o evento de clique ao botão
        menuToggle.addEventListener('click', function() {
            // 1. Adiciona/remove a classe CSS que mostra/esconde o menu
            mainNavigation.classList.toggle('is-open');

            // 2. Troca o ícone (hambúrguer <-> X)
            const icon = menuToggle.querySelector('i');
            if (mainNavigation.classList.contains('is-open')) {
                // Se estiver aberto, mostra o "X" (fa-xmark)
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                // Se estiver fechado, mostra o hambúrguer (fa-bars)
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
        
        // 3. Opcional: Fecha o menu quando um link é clicado (útil para navegação)
        const navLinks = mainNavigation.querySelectorAll('.nav-button'); // Inclui links e o switch
        navLinks.forEach(element => {
            element.addEventListener('click', () => {
                // Verifica se a tela é pequena o suficiente para ter o menu aberto
                if (mainNavigation.classList.contains('is-open') && window.innerWidth <= 768) {
                    mainNavigation.classList.remove('is-open');
                    menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    } else {
        // Se este console.log aparecer, o HTML ainda está incorreto (IDs faltando)
        console.error("ERRO JS: Elementos '#menu-toggle' ou '#main-navigation' não encontrados no DOM.");
    }
});

// --- Código para Trocar o Iframe na Navegação ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega os elementos do DOM
    const linkSobre = document.getElementById('link-sobre');
    const linkInicio = document.getElementById('link-inicio');
    const mapFrame = document.getElementById('br-map');

    // 2. Define o arquivo HTML de destino
    const urlMapa = 'mapa.html'; // URL padrão do mapa
    const urlSobre = 'sobre.html'; // URL do novo iframe 'Sobre o Projeto'

    // 3. Função para mudar o src do iframe
    function trocarIframe(url) {
        // Altera o src (a origem) do iframe principal
        mapFrame.src = url;
    }

    // 4. Adiciona o evento de clique ao link 'Sobre o Projeto'
    linkSobre.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar para '#'
        trocarIframe(urlSobre);
    });

    // 5. Adiciona o evento de clique ao link 'Início' (para voltar ao mapa)
    linkInicio.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o link de navegar para '#'
        trocarIframe(urlMapa);
    });
});