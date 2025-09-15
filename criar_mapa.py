import pandas as pd
import folium as fl
from branca.element import IFrame

df_empresas = pd.read_csv('empresas.txt')

tiles = 'CartoDB.Positron'
attr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

mapa = fl.Map(
    location=[-21.387807, -42.696780], 
    zoom_start=15,
    tiles= tiles,
    attr= attr
    )

modal_html = ""
for index, row in df_empresas.iterrows():
    # 1. Crie o conteúdo do modal
    content_html = f"""
    <div style="text-align: center;">
        <h2 style="margin: 0;">{row['Nome']}</h2>
        <img src="{row['Img']}" alt="{row['Nome']}" style="max-width:400px; max-height:300px;">
        <p style="font-size: 12px; margin: 0; padding-top: 5px;">
            Lat: {row['Latitude']} | Lon: {row['Longitude']}
        </p>
    </div>
    """

    # 2. Crie a estrutura do modal
    modal_id = f"modal-{index}"
    modal_html += f"""
    <div id="{modal_id}" class="folium-modal" style="display:none; position:fixed; z-index:10000; left:0; top:0; width:100%; height:100%; overflow:auto; background-color:rgba(0,0,0,0.7); justify-content:center; align-items:center;">
        <div class="folium-modal-content" style="background-color:#fff; margin:auto; padding:20px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.3); position:relative; max-width:500px;">
            <span class="folium-modal-close" style="color:#aaa; float:right; font-size:28px; font-weight:bold; cursor:pointer;">&times;</span>
            {content_html}
        </div>
    </div>
    """

    # 3. Crie o ícone do marcador com um ID de dados
    icon_html = f"""
    <div data-modal-id="{modal_id}" class="custom-marker" style="cursor: pointer;">
        <span class="glyphicon glyphicon-map-marker" style="color:red; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); transform: translate(-50%, -50%);"></span>
    </div>
    """
    
    fl.Marker(
        location=[row['Latitude'], row['Longitude']],
        icon = fl.DivIcon(
            html=icon_html,
            
            icon_anchor=[0, 0]
        )
    ).add_to(mapa)

# 4. Adicione o JavaScript para controlar os modais e os cliques nos marcadores
js_script = """
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var modals = document.getElementsByClassName('folium-modal');
        var spans = document.getElementsByClassName('folium-modal-close');
        
        // Fechar o modal ao clicar no 'x'
        for (var i = 0; i < spans.length; i++) {
            spans[i].onclick = function() {
                var modal = this.closest('.folium-modal');
                modal.style.display = 'none';
            }
        }
        
        // Fechar o modal ao clicar fora dele
        window.onclick = function(event) {
            for (var i = 0; i < modals.length; i++) {
                if (event.target == modals[i]) {
                    modals[i].style.display = 'none';
                }
            }
        }

        // Ligar o evento de clique nos marcadores para abrir o modal
        var customMarkers = document.getElementsByClassName('custom-marker');
        for (var i = 0; i < customMarkers.length; i++) {
            customMarkers[i].addEventListener('click', function() {
                var modalId = this.getAttribute('data-modal-id');
                document.getElementById(modalId).style.display = 'flex';
            });
        }
    });
</script>
"""

# Adicione o HTML dos modais e o JavaScript ao mapa
mapa.get_root().html.add_child(fl.Element(modal_html))
mapa.get_root().html.add_child(fl.Element(js_script))

mapa.save("mapa.html")