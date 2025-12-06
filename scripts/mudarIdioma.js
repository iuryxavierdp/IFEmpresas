let isEnglishActive = false;

function mudarIdioma(isEnglish) {
    isEnglishActive = isEnglish;
    
    var linkInicio = document.getElementById('link-inicio');
    var linkSobre = document.getElementById('link-sobre')
    var linkFooter = document.getElementById('link-footer');
    var sobreModalLink = document.getElementById('link-sobre-title');
    var sobreModalDesc1 = document.getElementById('description1');
    var sobreModalDesc2 = document.getElementById('description2');
    var sobreModalDesc3 = document.getElementById('description3');
    var sobreModalTitle1 = document.getElementById('title1');
    var sobreModalTitle2 = document.getElementById('title2');
    var sobreModalTitle3 = document.getElementById('title3');

    if (sobreModalDesc1) {
        sobreModalDesc1.innerHTML = isEnglish 
            ? "Cataguases has always stood out for its ability to reinvent itself, preserving its historical identity while keeping up with the economic and technological transformations of the contemporary world. Amidst this dynamic scenario, the need arose to understand, register, and value the essential role of the companies that drive the local economy and contribute to the social development of the municipality.<br><br>The Project - Digital Business Map of Cataguases is born from this purpose: to build a modern, accessible, and interactive tool that gathers information about the businesses that make up the productive fabric of the city. More than a simple catalog, this digital map presents itself as an instrument of memory, research, and connection - among companies, community, and institutions.<br><br>By identifying, organizing, and presenting relevant data about the location, history, and operation of companies, the project contributes to strengthening Cataguases' economic identity, allowing citizens, students, public managers, and visitors to have access to a clear and updated overview of the local business scenario. This is an initiative that combines technology, education, and the appreciation of entrepreneurial culture.<br><br>Each stage of this project - from the meticulous survey of companies to the creation of the interactive digital map - reflects the commitment to information accuracy and to the construction of a record that remains useful over time. Furthermore, the continuous and expandable nature of the platform ensures that new companies and changes in the productive sector can be incorporated, keeping the proposal of constant update and innovation alive.<br><br>Thus, this project does not merely map companies; it maps stories, trajectories, and contributions that, together, form the economic strength of Cataguases. May this work inspire new perspectives on the importance of local entrepreneurship and further strengthen the bonds between the city, its citizens, and its economic agents.<br><br>Cataguases, through this digital map, reaffirms its commitment to development, transparency, and the recognition of those who make the city a vibrant hub of production, creativity, and opportunities.<br><br>Developed by students Iury Xavier and Jumara Gonçalves under the guidance of Professor Josimar Gonçalves Ribeiro, as part of the Instrumental English course (2nd Semester of Technology in Management Processes)." 
            : "Cataguases sempre se destacou por sua capacidade de se reinventar, preservando sua identidade histórica enquanto acompanha as transformações econômicas e tecnológicas do mundo contemporâneo. Em meio a esse cenário dinâmico, surgiu a necessidade de compreender, registrar e valorizar o papel essencial das empresas que movimentam a economia local e contribuem para o desenvolvimento social do município.<br><br>O Projeto - Digital Business Map of Cataguases nasce desse propósito: construir uma ferramenta moderna, acessível e interativa que reúna informações sobre os empreendimentos que compõem o tecido produtivo da cidade. Mais do que um simples catálogo, este mapa digital se apresenta como um instrumento de memória, pesquisa e conexão - entre empresas, comunidade e instituições.<br><br>Ao identificar, organizar e apresentar dados relevantes sobre a localização, história e funcionamento das empresas, o projeto contribui para fortalecer a identidade econômica de Cataguases, permitindo que cidadãos, estudantes, gestores públicos e visitantes tenham acesso a um panorama claro e atualizado do cenário empresarial local. Trata-se de uma iniciativa que une tecnologia, educação e valorização da cultura empreendedora.<br><br>Cada etapa deste projeto - do levantamento minucioso das empresas à criação do mapa digital interativo - reflete o compromisso com a precisão das informações e com a construção de um registro que permaneça útil ao longo do tempo. Além disso, o caráter contínuo e expansível da plataforma garante que novas empresas e mudanças no setor produtivo possam ser incorporadas, mantendo viva a proposta de atualização e inovação constante.<br><br>Assim, este projeto não apenas mapeia empresas; ele mapeia histórias, trajetórias e contribuições que, em conjunto, formam a força econômica de Cataguases. Que este trabalho inspire novos olhares sobre a importância do empreendedorismo local e fortaleça ainda mais os vínculos entre a cidade, seus cidadãos e seus agentes econômicos.<br><br>Cataguases, por meio deste mapa digital, reafirma seu compromisso com o desenvolvimento, a transparência e o reconhecimento daqueles que fazem da cidade um polo vibrante de produção, criatividade e oportunidades.<br><br>Desenvolvido pelos alunos Iury Xavier e Jumara Gonçalves sob a orientação da Professora Josimar Gonçalves Ribeiro, como parte da disciplina de Inglês Instrumental (2º Período de Tecnologia em Processos Gerenciais).";
    }
    if (sobreModalTitle1) {
        sobreModalTitle1.textContent = isEnglish ? "DIGITAL BUSINESS MAP OF CATAGUASES" : "MAPA DIGITAL EMPRESARIAL DE CATAGUASES";
    }
    if (sobreModalTitle2) {
        sobreModalTitle2.textContent = isEnglish ? "PROJECT DEVELOPMENT" : "DESENVOLVIMENTO DO PROJETO";
    }
    if (sobreModalTitle3) {
        sobreModalTitle3.textContent = isEnglish ? "PROJECT STAGES" : "ETAPAS DO PROJETO";
    }

    if (sobreModalLink) {
        sobreModalLink.textContent = isEnglish ? "About the Project" : "Sobre o Projeto";
    }
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
