import pandas as pd
import folium as fl 
from branca.element import IFrame

dir = 'C:/Users/Iury/Desktop/IF/ProjetoMapa'
df_empresas = pd.read_excel(f'{dir}/dados/empresas.xlsx', sheet_name=0)

with open(f'{dir}/style/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

tiles = 'CartoDB.Positron'
attr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

mapa = fl.Map(
    location=[-21.387807, -42.696780], 
    zoom_start=16,
    zoom_control=False,
    tiles= tiles,
    attr= attr
)

with open('modal_template.html', 'r', encoding='utf-8') as f:
    template_html = f.read()

modal_html = ""
for index, row in df_empresas.iterrows():
    content_html = template_html.format(
        nome = row['NOME_EMPRESA'],
        endereco = row['ENDEREÇO'],
        latitude = row['LATITUDE'],
        longitude = row['LONGITUDE'],
        segmento = row['SEGMENTO_DE_ATUAÇÃO'],
        historia = row['HISTÓRIA_BREVE'],
        img = row['IMAGEM'],
        funcionarios = row['NUM_FUNCIONÁRIOS'],
        tipoempresa = row['TIPO_DE_EMPRESA'],
        enconomia = row['CONTRIBUIÇÃO_ECONOMIA_LOCAL'],
        premios = row['CERTIFICAÇÕES_E_PRÊMIOS'],
        abrangencia = ['ABRANGÊNCIA_PRODUÇÃO']
    )

    modal_id = f"modal-{index}"
    modal_html += content_html.replace('custom-modal-overlay', f'custom-modal-overlay {modal_id}')

    icon_html = f"""
    <div data-modal-id="{modal_id}" class="custom-marker" 
        style="
            cursor: pointer; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            transform: translate(-50%, -100%);
            width: max-content; 
        ">
        
        <i class="fa-solid fa-building-user" 
            style=" 
                font-size: 24px; 
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5); 
                margin-bottom: 6.5px;
            ">
        </i>
        
        <span 
            style="
                font-size: 10px; 
                color: #1f1f1f; 
                background: #fff; 
                padding: 1px 4px; 
                border-radius: 3px; 
                margin-top: -5px; 
                box-shadow: 0 1px 3px rgba(0,0,0,0.3); 
                font-weight: bold; 
                white-space: nowrap;
            ">
            {row['NOME_EMPRESA']}
        </span>
    </div>
    """

    fl.Marker(
        location=[row['LATITUDE'], row['LONGITUDE']],
        icon = fl.DivIcon(
            html=icon_html,
            icon_anchor=[0, 0]
        )
    ).add_to(mapa)

css_script = f"""
    <style>
        {css_content}
    </style>
"""

js_script = """
<script>
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
</script>
"""

mapa.get_root().html.add_child(fl.Element(modal_html))
mapa.get_root().html.add_child(fl.Element(css_script))
mapa.get_root().html.add_child(fl.Element(js_script))

mapa.save(f'{dir}//mapa.html')

print("Mapa salvo como 'mapa.html'")
print(index+1,"empresas cadastradas")