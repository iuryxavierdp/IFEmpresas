import pandas as pd
import folium as fl 
from branca.element import IFrame

#Mudar o diretório aqui:
dir = 'C:/Users/Iury/Desktop/IFEmpresas'

df_empresas = pd.read_excel(f'{dir}/dados/empresa.xlsx', sheet_name=0)
df_empresas_en = pd.read_excel(f'{dir}/dados/empresa_en.xlsx', sheet_name=0)

df_empresas = df_empresas.rename(columns={
    'NOME_EMPRESA': 'nome',
    'ENDEREÇO': 'endereco',
    'LATITUDE': 'latitude',
    'LONGITUDE': 'longitude',
    'SEGMENTO_DE_ATUAÇÃO': 'segmento',
    'HISTÓRIA_BREVE': 'historia',
    'IMAGEM': 'img',
    'NUM_FUNCIONÁRIOS': 'funcionarios',
    'TIPO_DE_EMPRESA': 'tipoempresa',
    'CONTRIBUIÇÃO_ECONOMIA_LOCAL': 'economia',
    'CERTIFICAÇÕES_E_PRÊMIOS': 'premios',
    'ABRANGÊNCIA_PRODUÇÃO': 'abrangencia'
})

df_empresas_en = df_empresas_en.rename(columns={
    'COMPANY_NAME': 'nome_en',
    'ADDRESS': 'endereco_en',
    'LATITUDE': 'latitude_en',
    'LONGITUDE': 'longitude_en',
    'SECTOR_OF_ACTIVITY': 'segmento_en',
    'BRIEF_HISTORY': 'historia_en',
    'IMAGE': 'img_en',
    'NUM_EMPLOYEES': 'funcionarios_en',
    'COMPANY_TYPE': 'tipoempresa_en',
    'LOCAL_ECONOMY_CONTRIBUTION': 'economia_en',
    'CERTIFICATIONS_AND_AWARDS': 'premios_en',
    'PRODUCTION_COVERAGE': 'abrangencia_en' 
})

df_combinado = df_empresas.join(df_empresas_en, how='inner')

with open(f'{dir}/style/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

tiles = 'CartoDB.Positron'
attr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

mapa = fl.Map(
    location=[-21.387807, -42.696780], 
    zoom_start=15.5,
    zoom_control=False,
    tiles= tiles,
    attr= attr
)

with open(f'{dir}/scripts/modal_template.html', 'r', encoding='utf-8') as f:
    template_html = f.read()

modal_html = ""

for index, row in df_combinado.iterrows():
    
    dados_modal = row.to_dict()
    
    if not pd.isna(dados_modal['funcionarios']):
        dados_modal['funcionarios'] = int(dados_modal['funcionarios'])
    if not pd.isna(dados_modal['funcionarios_en']):
        dados_modal['funcionarios_en'] = int(dados_modal['funcionarios_en'])
    
    content_html = template_html.format(**dados_modal)

    modal_id = f"modal-{index}"
    modal_html += content_html.replace('custom-modal-overlay', f'custom-modal-overlay {modal_id}')

    #fa-building-user
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
        
        <svg width="20" height="30" viewBox="0 0 30 40"
             style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3)); margin-bottom: 6.5px;">
            <path fill="#EA4335" stroke="#B23121" stroke-width="2"
                  d="M15 2C8.4 2 3 7.4 3 14c0 9.4 12 23 12 23s12-13.6 12-23c0-6.6-5.4-12-12-12z"/>
            <circle cx="15" cy="14" r="4" fill="#ffffff"/>
        </svg>
        
        <span class="lang-pt"
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
            {row['nome']}
        </span>
        <span class="lang-en"
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
                display: none; /* Esconde o nome em EN por padrão */
            ">
            {row['nome_en']}
        </span>
    </div>
    """

    fl.Marker(
        location=[row['latitude'], row['longitude']],
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
    function mudarIdioma(isEnglish) {
        var ptElements = document.querySelectorAll('.lang-pt');
        var enElements = document.querySelectorAll('.lang-en');
        
        if (isEnglish) {
            // Mostrar Inglês, Esconder Português
            ptElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = ''); 
        } else {
            // Mostrar Português, Esconder Inglês
            ptElements.forEach(el => el.style.display = ''); 
            enElements.forEach(el => el.style.display = 'none');
        }
    }

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

print(len(df_combinado),"empresas cadastradas")
