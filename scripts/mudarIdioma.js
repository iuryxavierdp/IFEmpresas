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
            ? "Cataguases has always stood out for its ability to reinvent itself, preserving its historical identity while keeping pace with the economic and technological transformations of the contemporary world. Amid this dynamic scenario, there arose a need to understand, record, and value the essential role of companies that drive the local economy and contribute to the municipality's social development.<br><br>The Cataguases Digital Business Map Project was created with this goal in mind: to build a modern, accessible, and interactive tool that gathers information about the companies that make up the city's productive fabric. More than just a simple catalog, this digital map serves as a tool for memory, research, and connection-between companies, the community, and institutions.<br><br>By identifying, organizing, and presenting relevant data on the location, history, and operation of companies, the project contributes to strengthening Cataguases' economic identity, allowing citizens, students, public managers, and visitors to have access to a clear and up-to-date view of the local business landscape. It is an initiative that combines technology, education, and the promotion of entrepreneurial culture.<br><br>Each stage of this project-from meticulous research on companies to the creation of an interactive digital map-reflects a commitment to accurate information and to building a record that will remain useful over time. In addition, the continuous and expandable nature of the platform ensures that new companies and changes in the productive sector can be incorporated, keeping alive the proposal for constant updating and innovation.<br><br>Thus, this project is not limited to mapping companies; it maps stories, trajectories, and contributions that together form the economic strength of Cataguases. May this work inspire new perspectives on the importance of local entrepreneurship and further strengthen the ties between the city, its citizens, and its economic agents.<br><br>Through this digital map, Cataguases reaffirms its commitment to development, transparency, and recognition of those who make the city a vibrant center of production, creativity, and opportunity.<br><br>Developed by students Iury Xavier and Jumara Gonçalves, under the guidance of professors Josimar Gonçalves Ribeiro and Thays Lacerda Correa as a final project for the Instrumental English course offered to students in the Management Processes Technology undergraduate program." 
            : "Cataguases sempre se destacou pela sua capacidade de se reinventar, preservando sua identidade histórica ao mesmo tempo que acompanha as transformações econômicas e tecnológicas do mundo contemporâneo. Em meio a esse cenário dinâmico, surgiu a necessidade de compreender, registrar e valorizar o papel essencial das empresas que impulsionam a economia local e contribuem para o desenvolvimento social do município.<br><br>Com este objetivo em mente, foi criado o Projeto Mapa Digital de Negócios de Cataguases: construir uma ferramenta moderna, acessível e interativa que reúna informações sobre as empresas que compõem o tecido produtivo da cidade. Mais do que um simples catálogo, este mapa digital serve como um instrumento de memória, pesquisa e conexão - entre as empresas, a comunidade e as instituições.<br><br>Ao identificar, organizar e apresentar dados relevantes sobre a localização, história e atuação das empresas, o projeto contribui para o fortalecimento da identidade econômica de Cataguases, permitindo que cidadãos, estudantes, gestores públicos e visitantes tenham acesso a uma visão clara e atualizada do panorama empresarial local. É uma iniciativa que conjuga tecnologia, educação e fomento à cultura empreendedora.<br><br>Cada etapa deste projeto - desde a pesquisa minuciosa sobre as empresas até a criação do mapa digital interativo - reflete um compromisso com a acurácia da informação e com a construção de um registro que se manterá útil ao longo do tempo. Além disso, a natureza contínua e expansível da plataforma garante que novas empresas e mudanças no setor produtivo possam ser incorporadas, mantendo viva a proposta de atualização e inovação constantes.<br><br>Assim, este projeto não se limita a mapear empresas; ele mapeia histórias, trajetórias e contribuições que, juntas, formam a força econômica de Cataguases. Que este trabalho inspire novas perspectivas sobre a importância do empreendedorismo local e fortaleça ainda mais os laços entre a cidade, seus cidadãos e seus agentes econômicos.<br><br>Por meio deste mapa digital, Cataguases reafirma seu compromisso com o desenvolvimento, a transparência e o reconhecimento daqueles que fazem da cidade um vibrante polo de produção, criatividade e oportunidades.<br><br>Desenvolvido pelos alunos Iury Xavier e Jumara Gonçalves, sob a orientação dos professores Josimar Gonçalves Ribeiro e Thays Lacerda Correa como projeto final para a disciplina de Inglês Instrumental oferecida aos estudantes do curso de graduação em Tecnologia em Processos Gerenciais.";
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
