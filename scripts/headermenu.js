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

// --- Novo Código para Abrir o Modal 'Sobre o Projeto' ---
document.addEventListener('DOMContentLoaded', () => {
    const linkSobre = document.getElementById('link-sobre');
    const sobreModal = document.getElementById('sobre-modal');

    // Função para fechar o modal (reutiliza a lógica do mapa)
    function fecharModal() {
        if (sobreModal) {
            sobreModal.style.display = 'none';
        }
    }
    
    // Função para abrir o modal
    function abrirModal() {
        if (sobreModal) {
            sobreModal.style.display = 'flex';
        }
    }

    // 2. Clique no 'X' ou fora do modal para fechar (Requer que o botão 'X' no HTML chame closeModal(this) ou fecharModal())
    // O seu HTML do 'sobre.html' já tem: <button class="custom-modal-close" onclick="closeModal(this)">&times;</button>
    // Precisamos garantir que o clique no overlay feche.

    if (sobreModal) {
        // Fecha ao clicar no overlay
        sobreModal.addEventListener('click', (event) => {
            if (event.target === sobreModal) {
                fecharModal();
            }
        });
        
        // Se a função closeModal estiver no escopo global (e está no modal.js), 
        // o botão 'X' já deve funcionar.
    }
});