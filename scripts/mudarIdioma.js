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
        sobreModalDesc1.textContent = isEnglish 
            ? "The project aims to create a digital business map of the city of Cataguases, gathering and providing information about the location, history, and operation of the municipality's companies. The initiative seeks to value the memory and relevance of the local productive sector, promote greater visibility for companies, facilitate community access to organized data, and contribute to strengthening Cataguases' economic and social identity." 
            : "O projeto tem como objetivo elaborar um mapa digital empresarial da cidade de Cataguases, reunindo e disponibilizando informações sobre a localização, histórico e funcionamento das empresas do município. A iniciativa busca valorizar a memória e a relevância do setor produtivo local, promover maior visibilidade às empresas, facilitar o acesso da comunidade a dados organizados e contribuir para o fortalecimento da identidade econômica e social de Cataguases.";
    }
    if (sobreModalDesc2) {
    sobreModalDesc2.innerHTML = isEnglish 
        ? "The digital map was developed by students Iury Xavier and Jumara Gonçalves under the guidance of Professor Josimar Gonçalves Ribeiro in the Instrumental English course.<br>The other students in the class were responsible for collecting, organizing, and feeding detailed information about the city's companies and businesses, ensuring the richness and accuracy of the map's content." 
        : "O mapa digital foi desenvolvido pelos alunos Iury Xavier e Jumara Gonçalves sob a orientação da professora Josimar Gonçalves Ribeiro na disciplina de Inglês Instrumental.<br>Os demais alunos da turma ficaram encarregados da coleta, organização e alimentação das informações detalhadas acerca das empresas e negócios da cidade, garantindo a riqueza e a precisão do conteúdo do mapa.";
}
    if (sobreModalDesc3) {
    sobreModalDesc3.innerHTML = isEnglish 
        ? "1. Company Survey<br>2. Construction of the Digital Business Map<br>3. Organization and Validation of Information<br>4. Availability of the Digital Map<br>5. Final Presentation" 
        : "1. Levantamento das Empresas<br>2. Construção do Mapa Digital Empresarial<br>3. Organização e Validação das Informações<br>4. Disponibilização do Mapa Digital<br>5. Apresentação Final";
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
