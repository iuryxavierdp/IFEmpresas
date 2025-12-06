document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNavigation = document.getElementById('main-navigation');

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('is-open');
            const icon = menuToggle.querySelector('i');
            if (mainNavigation.classList.contains('is-open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
        
        const navLinks = mainNavigation.querySelectorAll('.nav-button');
        navLinks.forEach(element => {
            element.addEventListener('click', () => {
                if (mainNavigation.classList.contains('is-open') && window.innerWidth <= 768) {
                    mainNavigation.classList.remove('is-open');
                    menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    } else {
        console.error("ERRO JS");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const linkSobre = document.getElementById('link-sobre');
    const sobreModal = document.getElementById('sobre-modal');

    function fecharModal() {
        if (sobreModal) {
            sobreModal.style.display = 'none';
        }
    }

    function abrirModal() {
        if (sobreModal) {
            sobreModal.style.display = 'flex';
        }
    }

    if (sobreModal) {
        sobreModal.addEventListener('click', (event) => {
            if (event.target === sobreModal) {
                fecharModal();
            }
        });
    }
});