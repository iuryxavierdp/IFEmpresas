function closeModal(button) {
        var modal = button.closest('.custom-modal-overlay');
        modal.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function() {
        var modalOverlays = document.getElementsByClassName('custom-modal-overlay');
        for (var i = 0; i < modalOverlays.length; i++) {
            modalOverlays[i].style.display = 'none';
        }

        var customMarkers = document.getElementsByClassName('custom-marker');
        for (var i = 0; i < customMarkers.length; i++) {
            customMarkers[i].addEventListener('click', function() {
                var modalId = this.getAttribute('data-modal-id');
                var modal = document.querySelector('.' + modalId);
                if (modal) {
                    modal.style.display = 'flex';
                }
            });
        }
        
        for (var i = 0; i < modalOverlays.length; i++) {
            modalOverlays[i].addEventListener('click', function(event) {
                if (event.target === this) {
                    this.style.display = 'none';
                }
            });
        }
    });
